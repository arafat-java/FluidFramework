/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Options for configuring debounce behavior
 * @internal
 */
export interface DebounceOptions {
	/**
	 * Whether to execute the function on the leading edge (first call)
	 * @defaultValue false
	 */
	leading?: boolean;

	/**
	 * Whether to execute the function on the trailing edge (after delay)
	 * @defaultValue true
	 */
	trailing?: boolean;

	/**
	 * Maximum delay in milliseconds
	 * @defaultValue undefined (no maximum)
	 */
	maxWait?: number;
}

/**
 * A debounced function with additional control methods
 * @internal
 */
export interface DebouncedFunction<T extends (...args: any[]) => any> {
	(...args: Parameters<T>): void;

	/**
	 * Cancels the pending execution
	 */
	cancel(): void;

	/**
	 * Immediately executes the function if there's a pending execution
	 */
	flush(): void;

	/**
	 * Whether there's a pending execution
	 */
	readonly pending: boolean;
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after `delayMs` milliseconds have elapsed since the last time it was invoked.
 *
 * @param func - The function to debounce
 * @param delayMs - The number of milliseconds to delay
 * @param options - Additional configuration options
 * @returns A debounced version of the function with control methods
 * @internal
 */
export const debounce = <T extends (...args: any[]) => any>(
	func: T,
	delayMs: number,
	options: DebounceOptions = {}
): DebouncedFunction<T> => {
	const { leading = false, trailing = true, maxWait } = options;

	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	let lastCallTime: number | undefined;
	let lastArgs: Parameters<T> | undefined;

	const debouncedFn = (...args: Parameters<T>) => {
		const now = Date.now();
		lastArgs = args;

		if (leading && !timeoutId) {
			func(...args);
		}

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		lastCallTime = now;

		timeoutId = setTimeout(() => {
			if (trailing && lastArgs) {
				func(...lastArgs);
			}
			timeoutId = undefined;
			lastArgs = undefined;
		}, delayMs);

		// Handle maxWait if specified
		if (maxWait !== undefined) {
			const timeSinceLastCall = now - (lastCallTime || 0);
			if (timeSinceLastCall >= maxWait) {
				if (timeoutId) {
					clearTimeout(timeoutId);
					timeoutId = undefined;
				}
				if (trailing && lastArgs) {
					func(...lastArgs);
					lastArgs = undefined;
				}
			}
		}
	};

	// Add control methods
	debouncedFn.cancel = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}
		lastArgs = undefined;
	};

	debouncedFn.flush = () => {
		if (timeoutId && lastArgs) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
			func(...lastArgs);
			lastArgs = undefined;
		}
	};

	// Add pending property
	Object.defineProperty(debouncedFn, 'pending', {
		get: () => timeoutId !== undefined,
		configurable: false,
		enumerable: false
	});

	return debouncedFn as DebouncedFunction<T>;
};

/**
 * Creates a simple debounced function (backward compatibility)
 * @deprecated Use the enhanced debounce function with options instead
 * @internal
 */
export const debounceSimple = <T extends (...args: any[]) => any>(
	func: T,
	delayMs: number
): ((...args: Parameters<T>) => void) => {
	return debounce(func, delayMs);
};

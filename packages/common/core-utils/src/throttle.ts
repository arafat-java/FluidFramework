/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Options for configuring throttle behavior
 * @internal
 */
export interface ThrottleOptions {
	/**
	 * Whether to execute the function on the leading edge (first call)
	 * @defaultValue true
	 */
	leading?: boolean;

	/**
	 * Whether to execute the function on the trailing edge (after delay)
	 * @defaultValue true
	 */
	trailing?: boolean;
}

/**
 * A throttled function with additional control methods
 * @internal
 */
export interface ThrottledFunction<T extends (...args: any[]) => any> {
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
 * Creates a throttled function that limits the rate at which the provided function
 * can be called. The function will be called at most once per `delayMs` milliseconds.
 *
 * @param func - The function to throttle
 * @param delayMs - The number of milliseconds to throttle by
 * @param options - Additional configuration options
 * @returns A throttled version of the function with control methods
 * @internal
 */
export const throttle = <T extends (...args: any[]) => any>(
	func: T,
	delayMs: number,
	options: ThrottleOptions = {}
): ThrottledFunction<T> => {
	const { leading = true, trailing = true } = options;

	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	let lastExecTime = 0;
	let lastArgs: Parameters<T> | undefined;

	const throttledFn = (...args: Parameters<T>) => {
		const now = Date.now();
		lastArgs = args;

		if (leading && now - lastExecTime >= delayMs) {
			// Execute immediately if enough time has passed
			func(...args);
			lastExecTime = now;
		} else if (trailing && !timeoutId) {
			// Schedule execution for later
			const remainingTime = delayMs - (now - lastExecTime);
			timeoutId = setTimeout(() => {
				if (lastArgs) {
					func(...lastArgs);
					lastExecTime = Date.now();
				}
				timeoutId = undefined;
				lastArgs = undefined;
			}, Math.max(0, remainingTime));
		}
	};

	// Add control methods
	throttledFn.cancel = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}
		lastArgs = undefined;
	};

	throttledFn.flush = () => {
		if (timeoutId && lastArgs) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
			func(...lastArgs);
			lastExecTime = Date.now();
			lastArgs = undefined;
		}
	};

	// Add pending property
	Object.defineProperty(throttledFn, 'pending', {
		get: () => timeoutId !== undefined,
		configurable: false,
		enumerable: false
	});

	return throttledFn as ThrottledFunction<T>;
};

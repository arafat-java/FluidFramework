/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Creates a debounced function that delays invoking the provided function
 * until after `delayMs` milliseconds have elapsed since the last time it was invoked.
 *
 * @param func - The function to debounce
 * @param delayMs - The number of milliseconds to delay
 * @returns A debounced version of the function
 * @internal
 */
export const debounce = <T extends (...args: any[]) => any>(
	func: T,
	delayMs: number
): ((...args: Parameters<T>) => void) => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return (...args: Parameters<T>) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			func(...args);
		}, delayMs);
	};
};

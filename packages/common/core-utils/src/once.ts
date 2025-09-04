/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Creates a function that can only be called once. Subsequent calls will return
 * the result of the first call.
 *
 * @param func - The function to make callable only once
 * @returns A function that can only be called once
 * @internal
 */
export const once = <T extends (...args: any[]) => any>(func: T): T => {
	let called = false;
	let result: ReturnType<T>;

	return ((...args: Parameters<T>) => {
		if (!called) {
			called = true;
			result = func(...args);
		}
		return result;
	}) as T;
};

/**
 * Creates a function that can only be called once and caches the result.
 * Useful for expensive operations that should only happen once.
 *
 * @param func - The function to make callable only once
 * @returns A function that can only be called once and caches the result
 * @internal
 */
export const onceAsync = <T extends (...args: any[]) => Promise<any>>(
	func: T
): T => {
	let called = false;
	let resultPromise: Promise<ReturnType<T>>;

	return ((...args: Parameters<T>) => {
		if (!called) {
			called = true;
			resultPromise = func(...args);
		}
		return resultPromise;
	}) as T;
};

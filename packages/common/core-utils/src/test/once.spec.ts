/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";
import { once, onceAsync } from "../once.js";

describe("once", () => {
	it("should call the function only once", () => {
		let callCount = 0;
		const onceFn = once(() => {
			callCount++;
			return "result";
		});

		const result1 = onceFn();
		const result2 = onceFn();
		const result3 = onceFn();

		assert.strictEqual(callCount, 1);
		assert.strictEqual(result1, "result");
		assert.strictEqual(result2, "result");
		assert.strictEqual(result3, "result");
	});

	it("should pass arguments correctly on first call", () => {
		let receivedArgs: any[] = [];
		const onceFn = once((...args: any[]) => {
			receivedArgs = args;
			return "result";
		});

		onceFn("test", 123, { key: "value" });
		onceFn("ignored", "args");

		assert.deepStrictEqual(receivedArgs, ["test", 123, { key: "value" }]);
	});

	it("should handle functions that return different types", () => {
		const numberFn = once(() => 42);
		const stringFn = once(() => "hello");
		const objectFn = once(() => ({ key: "value" }));
		const arrayFn = once(() => [1, 2, 3]);

		assert.strictEqual(numberFn(), 42);
		assert.strictEqual(numberFn(), 42);
		assert.strictEqual(stringFn(), "hello");
		assert.strictEqual(stringFn(), "hello");
		assert.deepStrictEqual(objectFn(), { key: "value" });
		assert.deepStrictEqual(objectFn(), { key: "value" });
		assert.deepStrictEqual(arrayFn(), [1, 2, 3]);
		assert.deepStrictEqual(arrayFn(), [1, 2, 3]);
	});

	it("should handle functions with no return value", () => {
		let callCount = 0;
		const onceFn = once(() => {
			callCount++;
		});

		const result1 = onceFn();
		const result2 = onceFn();

		assert.strictEqual(callCount, 1);
		assert.strictEqual(result1, undefined);
		assert.strictEqual(result2, undefined);
	});

	it("should work with arrow functions", () => {
		const onceFn = once((x: number, y: number) => x + y);

		assert.strictEqual(onceFn(2, 3), 5);
		assert.strictEqual(onceFn(10, 20), 5); // Should return cached result
	});

	it("should work with method functions", () => {
		const obj = {
			value: 0,
			increment: once(function(this: any) {
				this.value++;
				return this.value;
			})
		};

		assert.strictEqual(obj.increment(), 1);
		assert.strictEqual(obj.increment(), 1); // Should return cached result
		assert.strictEqual(obj.value, 1); // Should only increment once
	});
});

describe("onceAsync", () => {
	it("should call async function only once and cache promise", async () => {
		let callCount = 0;
		const onceAsyncFn = onceAsync(async () => {
			callCount++;
			await new Promise(resolve => setTimeout(resolve, 10));
			return "async result";
		});

		const promise1 = onceAsyncFn();
		const promise2 = onceAsyncFn();
		const promise3 = onceAsyncFn();

		// All should return the same promise
		assert.strictEqual(promise1, promise2);
		assert.strictEqual(promise2, promise3);

		const result1 = await promise1;
		const result2 = await promise2;
		const result3 = await promise3;

		assert.strictEqual(callCount, 1);
		assert.strictEqual(result1, "async result");
		assert.strictEqual(result2, "async result");
		assert.strictEqual(result3, "async result");
	});

	it("should handle async functions with arguments", async () => {
		let receivedArgs: any[] = [];
		const onceAsyncFn = onceAsync(async (...args: any[]) => {
			receivedArgs = args;
			await new Promise(resolve => setTimeout(resolve, 10));
			return "result";
		});

		const result1 = await onceAsyncFn("test", 123);
		const result2 = await onceAsyncFn("ignored", "args");

		assert.deepStrictEqual(receivedArgs, ["test", 123]);
		assert.strictEqual(result1, "result");
		assert.strictEqual(result2, "result");
	});

	it("should handle async functions that throw errors", async () => {
		let callCount = 0;
		const onceAsyncFn = onceAsync(async () => {
			callCount++;
			await new Promise(resolve => setTimeout(resolve, 10));
			throw new Error("Test error");
		});

		const promise1 = onceAsyncFn();
		const promise2 = onceAsyncFn();

		// Both should return the same promise
		assert.strictEqual(promise1, promise2);

		// Both should reject with the same error
		await assert.rejects(promise1, /Test error/);
		await assert.rejects(promise2, /Test error/);

		assert.strictEqual(callCount, 1);
	});

	it("should work with different async return types", async () => {
		const numberFn = onceAsync(async () => {
			await new Promise(resolve => setTimeout(resolve, 5));
			return 42;
		});

		const stringFn = onceAsync(async () => {
			await new Promise(resolve => setTimeout(resolve, 5));
			return "hello";
		});

		const objectFn = onceAsync(async () => {
			await new Promise(resolve => setTimeout(resolve, 5));
			return { key: "value" };
		});

		assert.strictEqual(await numberFn(), 42);
		assert.strictEqual(await numberFn(), 42);
		assert.strictEqual(await stringFn(), "hello");
		assert.strictEqual(await stringFn(), "hello");
		assert.deepStrictEqual(await objectFn(), { key: "value" });
		assert.deepStrictEqual(await objectFn(), { key: "value" });
	});

	it("should handle async functions with no return value", async () => {
		let callCount = 0;
		const onceAsyncFn = onceAsync(async () => {
			callCount++;
			await new Promise(resolve => setTimeout(resolve, 10));
		});

		const result1 = await onceAsyncFn();
		const result2 = await onceAsyncFn();

		assert.strictEqual(callCount, 1);
		assert.strictEqual(result1, undefined);
		assert.strictEqual(result2, undefined);
	});
});

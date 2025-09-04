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
it("should defer execution until first invocation (lazy evaluation)", () => {
  let executed = false;
  const wrapped = once(() => { executed = true; return 7; });
  assert.strictEqual(executed, false); // wrapping should not execute
  const r1 = wrapped();
  assert.strictEqual(executed, true);
  const r2 = wrapped();
  assert.strictEqual(r1, 7);
  assert.strictEqual(r2, 7);
});
it("should ignore later call arguments and contexts after the first result is cached", () => {
  const fn = function(this: any, a: number, b: number) { return { sum: a + b, ctx: this && this.name }; };
  const o1 = { name: "first" }; const o2 = { name: "second" };
  const wrapped = once(fn.bind(o1));
  const first = wrapped(2, 5);
  const second = wrapped.call(o2 as any, 100, 200);
  assert.deepStrictEqual(first, { sum: 7, ctx: "first" });
  assert.deepStrictEqual(second, { sum: 7, ctx: "first" });
});
it("should call only once even if the function throws, and rethrow the same error thereafter", () => {
  let callCount = 0;
  const err = new Error("boom");
  const wrapped = once(() => { callCount++; throw err; });
  for (let i = 0; i < 2; i++) {
    try { wrapped(); assert.fail("Expected error to be thrown"); } catch (e) { assert.strictEqual(e, err); }
  }
  assert.strictEqual(callCount, 1);
});
it("should cache undefined results distinctly (not re-execute to try for a value)", () => {
  let calls = 0;
  const wrapped = once(() => { calls++; return undefined; });
  const a = wrapped(); const b = wrapped();
  assert.strictEqual(a, undefined);
  assert.strictEqual(b, undefined);
  assert.strictEqual(calls, 1);
});
it("should preserve this binding for onceAsync-wrapped methods", async () => {
  const obj = { value: 0, inc: onceAsync(async function(this: any, by: number) { await new Promise(r => setTimeout(r, 5)); this.value += by; return this.value; }) };
  const p1 = obj.inc(3);
  const p2 = obj.inc(10); // same promise as p1
  assert.strictEqual(p1, p2);
  const r1 = await p1; const r2 = await p2;
  assert.strictEqual(r1, 3);
  assert.strictEqual(r2, 3);
  assert.strictEqual(obj.value, 3);
});
it("should not re-execute async function after a rejection; subsequent calls see same rejection", async () => {
  let calls = 0;
  const err = new Error("async-fail");
  const wrapped = onceAsync(async () => { calls++; await new Promise(r => setTimeout(r, 5)); throw err; });
  const p1 = wrapped(); const p2 = wrapped();
  assert.strictEqual(p1, p2);
  await assert.rejects(p1, /async-fail/);
  await assert.rejects(p2, /async-fail/);
  assert.strictEqual(calls, 1);
});
it("should cache resolved undefined values in onceAsync", async () => {
  let calls = 0;
  const wrapped = onceAsync(async () => { calls++; await new Promise(r => setTimeout(r, 3)); return undefined; });
  const a = await wrapped(); const b = await wrapped();
  assert.strictEqual(a, undefined);
  assert.strictEqual(b, undefined);
  assert.strictEqual(calls, 1);
});
it("should support call/apply and still execute only once", () => {
  let count = 0;
  function add(this: any, a: number, b: number) { count++; return a + b + (this && this.delta || 0); }
  const wrapped = once(add);
  const ctx1 = { delta: 1 }, ctx2 = { delta: 100 };
  const r1 = wrapped.call(ctx1 as any, 2, 3);
  const r2 = wrapped.apply(ctx2 as any, [10, 20]);
  assert.strictEqual(r1, 6);
  assert.strictEqual(r2, 6);
  assert.strictEqual(count, 1);
});

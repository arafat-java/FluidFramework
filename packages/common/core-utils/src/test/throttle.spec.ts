/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";
import { throttle } from "../throttle.js";

describe("throttle", () => {
	it("should throttle function calls to once per delay period", (done) => {
		let callCount = 0;
		const throttledFn = throttle(() => {
			callCount++;
		}, 100);

		// Call multiple times quickly
		throttledFn();
		throttledFn();
		throttledFn();

		// Should execute immediately on first call
		assert.strictEqual(callCount, 1);

		// Wait for the delay and check that it was called again
		setTimeout(() => {
			assert.strictEqual(callCount, 2);
			done();
		}, 150);
	});

	it("should pass arguments correctly", (done) => {
		let receivedArgs: any[] = [];
		const throttledFn = throttle((...args: any[]) => {
			receivedArgs = args;
		}, 100);

		throttledFn("test", 123, { key: "value" });

		setTimeout(() => {
			assert.deepStrictEqual(receivedArgs, ["test", 123, { key: "value" }]);
			done();
		}, 50);
	});

	it("should respect leading edge execution", (done) => {
		let callCount = 0;
		const throttledFn = throttle(() => {
			callCount++;
		}, 100, { leading: true, trailing: false });

		// Should execute immediately on first call
		throttledFn();
		assert.strictEqual(callCount, 1);

		// Subsequent calls should not execute
		throttledFn();
		throttledFn();

		setTimeout(() => {
			assert.strictEqual(callCount, 1);
			done();
		}, 150);
	});

	it("should respect trailing edge execution", (done) => {
		let callCount = 0;
		const throttledFn = throttle(() => {
			callCount++;
		}, 100, { leading: false, trailing: true });

		// Should not execute immediately on first call
		throttledFn();
		assert.strictEqual(callCount, 0);

		// Should execute after delay
		setTimeout(() => {
			assert.strictEqual(callCount, 1);
			done();
		}, 150);
	});

	it("should handle rapid successive calls correctly", (done) => {
		let callCount = 0;
		const throttledFn = throttle(() => {
			callCount++;
		}, 100);

		// First call - should execute immediately
		throttledFn();
		assert.strictEqual(callCount, 1);

		// Call again after 50ms (within throttle period)
		setTimeout(() => {
			throttledFn();
		}, 50);

		// Call again after 100ms (should execute)
		setTimeout(() => {
			throttledFn();
		}, 100);

		// Wait and check final count
		setTimeout(() => {
			assert.strictEqual(callCount, 2);
			done();
		}, 200);
	});

	it("should support cancel method", (done) => {
		let callCount = 0;
		const throttledFn = throttle(() => {
			callCount++;
		}, 100, { leading: false, trailing: true });

		throttledFn();
		throttledFn.cancel();

		setTimeout(() => {
			assert.strictEqual(callCount, 0);
			done();
		}, 150);
	});

	it("should support flush method", (done) => {
		let callCount = 0;
		const throttledFn = throttle(() => {
			callCount++;
		}, 100, { leading: false, trailing: true });

		throttledFn();

		// Flush immediately
		throttledFn.flush();
		assert.strictEqual(callCount, 1);

		setTimeout(() => {
			assert.strictEqual(callCount, 1); // Should not call again
			done();
		}, 150);
	});

	it("should track pending state correctly", () => {
		const throttledFn = throttle(() => {}, 100, { leading: false, trailing: true });

		assert.strictEqual(throttledFn.pending, false);

		throttledFn();
		assert.strictEqual(throttledFn.pending, true);

		throttledFn.cancel();
		assert.strictEqual(throttledFn.pending, false);
	});

	it("should handle zero delay correctly", (done) => {
		let callCount = 0;
		const throttledFn = throttle(() => {
			callCount++;
		}, 0);

		throttledFn();
		throttledFn();
		throttledFn();

		// With zero delay, should execute all calls
		setTimeout(() => {
			assert.strictEqual(callCount, 3);
			done();
		}, 10);
	});

	it("should handle very short delays", (done) => {
		let callCount = 0;
		const throttledFn = throttle(() => {
			callCount++;
		}, 10);

		throttledFn();
		throttledFn();
		throttledFn();

		// Should execute first call immediately
		assert.strictEqual(callCount, 1);

		// Wait for delay and check
		setTimeout(() => {
			assert.strictEqual(callCount, 2);
			done();
		}, 50);
	});
});

/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";
import { debounce, debounceSimple } from "../debounce.js";

describe("debounce", () => {
	it("should call the function only once after delay", (done) => {
		let callCount = 0;
		const debouncedFn = debounce(() => {
			callCount++;
		}, 50);

		// Call multiple times quickly
		debouncedFn();
		debouncedFn();
		debouncedFn();

		// Function should not be called immediately
		assert.strictEqual(callCount, 0);

		// Wait for the delay and check that it was called only once
		setTimeout(() => {
			assert.strictEqual(callCount, 1);
			done();
		}, 100);
	});

	it("should pass arguments correctly", (done) => {
		let receivedArgs: any[] = [];
		const debouncedFn = debounce((...args: any[]) => {
			receivedArgs = args;
		}, 50);

		debouncedFn("test", 123, { key: "value" });

		setTimeout(() => {
			assert.deepStrictEqual(receivedArgs, ["test", 123, { key: "value" }]);
			done();
		}, 100);
	});

	it("should reset timer on subsequent calls", (done) => {
		let callCount = 0;
		const debouncedFn = debounce(() => {
			callCount++;
		}, 100);

		// First call
		debouncedFn();

		// Wait 60ms and call again (should reset timer)
		setTimeout(() => {
			debouncedFn();
		}, 60);

		// Wait 50ms more (total 110ms) - should not have called yet
		setTimeout(() => {
			assert.strictEqual(callCount, 0);
		}, 110);

		// Wait 100ms more (total 210ms) - should have called once
		setTimeout(() => {
			assert.strictEqual(callCount, 1);
			done();
		}, 210);
	});

	it("should handle zero delay", (done) => {
		let callCount = 0;
		const debouncedFn = debounce(() => {
			callCount++;
		}, 0);

		debouncedFn();

		// With zero delay, should call immediately on next tick
		setTimeout(() => {
			assert.strictEqual(callCount, 1);
			done();
		}, 10);
	});

	it("should support leading edge execution", (done) => {
		let callCount = 0;
		const debouncedFn = debounce(() => {
			callCount++;
		}, 100, { leading: true, trailing: false });

		// Should execute immediately on first call
		debouncedFn();
		assert.strictEqual(callCount, 1);

		// Subsequent calls should not execute
		debouncedFn();
		debouncedFn();

		setTimeout(() => {
			assert.strictEqual(callCount, 1);
			done();
		}, 150);
	});

	it("should support maxWait option", (done) => {
		let callCount = 0;
		const debouncedFn = debounce(() => {
			callCount++;
		}, 100, { maxWait: 50 });

		// First call
		debouncedFn();

		// Call again after 30ms (within maxWait)
		setTimeout(() => {
			debouncedFn();
		}, 30);

		// Call again after 60ms (exceeds maxWait, should execute)
		setTimeout(() => {
			debouncedFn();
		}, 60);

		// Wait and check results
		setTimeout(() => {
			assert.strictEqual(callCount, 2); // One from maxWait, one from normal delay
			done();
		}, 200);
	});

	it("should support cancel method", (done) => {
		let callCount = 0;
		const debouncedFn = debounce(() => {
			callCount++;
		}, 100);

		debouncedFn();
		debouncedFn.cancel();

		setTimeout(() => {
			assert.strictEqual(callCount, 0);
			done();
		}, 150);
	});

	it("should support flush method", (done) => {
		let callCount = 0;
		const debouncedFn = debounce(() => {
			callCount++;
		}, 100);

		debouncedFn();

		// Flush immediately
		debouncedFn.flush();
		assert.strictEqual(callCount, 1);

		setTimeout(() => {
			assert.strictEqual(callCount, 1); // Should not call again
			done();
		}, 150);
	});

	it("should track pending state correctly", () => {
		const debouncedFn = debounce(() => {}, 100);

		assert.strictEqual(debouncedFn.pending, false);

		debouncedFn();
		assert.strictEqual(debouncedFn.pending, true);

		debouncedFn.cancel();
		assert.strictEqual(debouncedFn.pending, false);
	});

	it("should handle both leading and trailing execution", (done) => {
		let callCount = 0;
		const debouncedFn = debounce(() => {
			callCount++;
		}, 100, { leading: true, trailing: true });

		// Should execute immediately on first call
		debouncedFn();
		assert.strictEqual(callCount, 1);

		// Should also execute after delay
		setTimeout(() => {
			assert.strictEqual(callCount, 2);
			done();
		}, 150);
	});
});

describe("debounceSimple (deprecated)", () => {
	it("should work as a simple debounce function", (done) => {
		let callCount = 0;
		const debouncedFn = debounceSimple(() => {
			callCount++;
		}, 50);

		debouncedFn();
		debouncedFn();
		debouncedFn();

		setTimeout(() => {
			assert.strictEqual(callCount, 1);
			done();
		}, 100);
	});
});

// Additional tests appended by PR tooling — broaden coverage for edge cases and behavior guarantees.
describe("debounce - additional coverage", () => {
	it("should use the latest arguments when multiple calls occur before the delay (trailing call)", (done) => {
		let received: any;
		const debouncedFn = debounce((v: any) => {
			received = v;
		}, 60);

		debouncedFn("first");
		setTimeout(() => debouncedFn("second"), 10);
		setTimeout(() => debouncedFn("third"), 20);

		setTimeout(() => {
			assert.strictEqual(received, "third");
			done();
		}, 120);
	});

	it("should preserve the 'this' context when called as a method", (done) => {
		let observed: any;
		const obj = {
			value: 42,
			method: debounce(function (this: any) {
				observed = this.value;
			}, 40),
		};

		obj.method();

		setTimeout(() => {
			assert.strictEqual(observed, 42);
			done();
		}, 90);
	});

	it("flush() should execute with the most recent arguments", (done) => {
		let received: any;
		const debouncedFn = debounce((v: any) => {
			received = v;
		}, 100);

		debouncedFn("a");
		setTimeout(() => {
			debouncedFn("b");
			// Flushing shortly after updating args should run with "b"
			debouncedFn.flush();
			assert.strictEqual(received, "b");
		}, 40);

		// Ensure no additional trailing execution happens after flush
		setTimeout(() => {
			assert.strictEqual(received, "b");
			done();
		}, 180);
	});

	it("cancel() after a leading call should prevent a trailing call when trailing is enabled", (done) => {
		let callCount = 0;
		const debouncedFn = debounce(() => {
			callCount++;
		}, 80, { leading: true, trailing: true });

		// Immediate leading edge
		debouncedFn();
		assert.strictEqual(callCount, 1);

		// Schedule a trailing call, then cancel before delay elapses
		setTimeout(() => {
			debouncedFn();
			debouncedFn.cancel();
		}, 10);

		setTimeout(() => {
			assert.strictEqual(callCount, 1, "trailing call should be cancelled");
			done();
		}, 150);
	});

	it("pending should remain false when using leading-only execution (no trailing)", (done) => {
		const debouncedFn = debounce(() => {}, 70, { leading: true, trailing: false });

		assert.strictEqual(debouncedFn.pending, false, "initial pending should be false");
		debouncedFn(); // executes immediately
		assert.strictEqual(debouncedFn.pending, false, "should not be pending after immediate leading execution");

		// Subsequent rapid calls within the window should not queue a trailing call
		debouncedFn();
		debouncedFn();

		setTimeout(() => {
			assert.strictEqual(debouncedFn.pending, false, "still not pending after the window");
			done();
		}, 120);
	});
});

describe("debounceSimple (deprecated) - additional coverage", () => {
	it("should pass through the latest arguments after rapid successive calls", (done) => {
		let received: any[] | undefined;
		const debouncedFn = debounceSimple((...args: any[]) => {
			received = args;
		}, 50);

		debouncedFn("x", 1);
		setTimeout(() => debouncedFn("y", 2), 10);
		setTimeout(() => debouncedFn("z", 3), 20);

		setTimeout(() => {
			assert.deepStrictEqual(received, ["z", 3]);
			done();
		}, 110);
	});

	it("should handle zero delay by deferring to the next tick and coalescing calls", (done) => {
		let count = 0;
		let last: any;
		const debouncedFn = debounceSimple((v: any) => {
			count++;
			last = v;
		}, 0);

		debouncedFn("a");
		debouncedFn("b");

		setTimeout(() => {
			assert.strictEqual(count, 1);
			assert.strictEqual(last, "b");
			done();
		}, 10);
	});
});

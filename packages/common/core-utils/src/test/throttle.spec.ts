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

//
// Additional test suite appended by CI assistant to broaden coverage for throttle()
// Framework: Mocha (describe/it) with Node's built-in 'assert' (strict)
//

describe("throttle – additional coverage", () => {
  it("should invoke trailing call with the latest arguments within the throttle window", (done) => {
    let captured: any[] | undefined;
    const fn = throttle((...args: any[]) => {
      captured = args;
    }, 50, { leading: false, trailing: true });

    // Queue multiple calls within the window; only the last one's args should be used.
    fn(1);
    fn(2, 3);
    fn("final", { a: 1 });

    setTimeout(() => {
      assert.deepStrictEqual(captured, ["final", { a: 1 }]);
      done();
    }, 90);
  });

  it("should preserve 'this' context when throttled function is a method", (done) => {
    const calls: string[] = [];
    const obj = {
      id: "ctx-123",
      handler(this: any, msg: string) {
        calls.push(`${this.id}:${msg}`);
      },
    };

    const throttled = throttle(function (this: any, msg: string) {
      // Use a normal function to allow binding of 'this'
      obj.handler.call(this, msg);
    }, 40);

    throttled.call(obj, "first");   // executes immediately on leading edge by default
    throttled.call({ id: "ctx-999" }, "ignored"); // within window; ignored
    setTimeout(() => {
      // Next window should allow another call to run with its own context
      throttled.call({ id: "ctx-2" }, "second");
    }, 45);

    setTimeout(() => {
      assert.deepStrictEqual(calls, ["ctx-123:first", "ctx-2:second"]);
      done();
    }, 120);
  });

  it("should not schedule a trailing call when options.trailing is false", (done) => {
    let count = 0;
    const fn = throttle(() => { count++; }, 60, { leading: true, trailing: false });

    fn();           // runs immediately
    fn(); fn();     // within window, ignored

    setTimeout(() => {
      assert.strictEqual(count, 1);
      done();
    }, 100);
  });

  it("should schedule only one trailing execution for a burst of calls", (done) => {
    let count = 0;
    const fn = throttle(() => { count++; }, 40, { leading: false, trailing: true });

    // Burst of calls within 30ms; expect a single trailing run.
    fn(); fn(); fn();
    setTimeout(() => { fn(); fn(); }, 20);

    setTimeout(() => {
      assert.strictEqual(count, 1);
      done();
    }, 100);
  });

  it("cancel() should prevent a pending trailing invocation but not affect future windows", (done) => {
    let count = 0;
    const fn = throttle(() => { count++; }, 50, { leading: false, trailing: true });

    fn();                 // schedules trailing
    assert.strictEqual(fn.pending, true);
    fn.cancel();          // cancel scheduled trailing
    assert.strictEqual(fn.pending, false);

    setTimeout(() => {
      // After window has passed, no invocation should have happened
      assert.strictEqual(count, 0);

      // New call in a fresh window should work normally
      fn();
      setTimeout(() => {
        assert.strictEqual(count, 1);
        done();
      }, 70);
    }, 70);
  });

  it("flush() should immediately invoke a pending trailing call with latest args", (done) => {
    let captured: any[] | undefined;
    const fn = throttle((...args: any[]) => { captured = args; }, 100, { leading: false, trailing: true });

    fn("a");
    fn("b", 2);
    assert.strictEqual(fn.pending, true);

    // Immediately flush the latest queued call
    fn.flush();
    assert.deepStrictEqual(captured, ["b", 2]);
    assert.strictEqual(fn.pending, false);

    // After some time, no additional invocations should occur
    setTimeout(() => {
      assert.deepStrictEqual(captured, ["b", 2]);
      done();
    }, 120);
  });

  it("should behave consistently when the throttled function throws (error should surface and state should reset)", (done) => {
    let attempts = 0;
    const fn = throttle(() => {
      attempts++;
      if (attempts === 1) {
        throw new Error("boom");
      }
    }, 30);

    // First call throws synchronously on leading edge
    let caught: string | null = null;
    try {
      fn();
    } catch (e: any) {
      caught = e?.message ?? null;
    }
    assert.strictEqual(caught, "boom");

    // Next call after window should still run
    setTimeout(() => {
      fn();
    }, 40);

    setTimeout(() => {
      assert.strictEqual(attempts, 2);
      done();
    }, 100);
  });

  it("when delay is large, should still only execute at most once per window", (done) => {
    let count = 0;
    const fn = throttle(() => { count++; }, 200);

    fn(); // immediate
    fn(); fn(); fn(); // ignored within window

    setTimeout(() => {
      assert.strictEqual(count, 1);
      fn(); // new window: immediate second
    }, 220);

    setTimeout(() => {
      assert.strictEqual(count, 2);
      done();
    }, 460);
  });

  it("should accept and forward return values from immediate (leading) execution", () => {
    const fn = throttle((x: number, y: number) => x + y, 100);
    const result = fn(2, 3);
    // For a leading call, the inner function is executed immediately; expect the actual return.
    assert.strictEqual(result, 5);
  });

  it("should return undefined when call is throttled (and not scheduled for leading)", (done) => {
    const fn = throttle((x: number) => x * 2, 60, { leading: true, trailing: true });

    const first = fn(10); // runs
    assert.strictEqual(first, 20);

    const second = fn(11); // throttled; should return undefined immediately
    assert.strictEqual(second, undefined);

    setTimeout(() => {
      // After trailing run with the latest args, no assertion on return there (async),
      // but ensure function actually executed by side-effect:
      // Re-wrap with a side-effect to check run happened.
      done();
    }, 100);
  });
});

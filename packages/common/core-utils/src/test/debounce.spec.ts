/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";
import { debounce } from "../debounce.js";

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
});

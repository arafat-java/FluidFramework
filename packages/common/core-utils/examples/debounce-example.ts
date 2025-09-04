/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { debounce, throttle, once, onceAsync } from "../src/index.js";

// Example 1: Enhanced debounce with options
function createAdvancedSearchHandler() {
	const debouncedSearch = debounce((query: string) => {
		console.log(`Performing search for: "${query}"`);
		// In a real application, this would make an API call
		// performSearch(query);
	}, 300, { leading: true, trailing: true, maxWait: 1000 });

	return debouncedSearch;
}

// Example 2: Throttled scroll handler
function createScrollHandler() {
	const throttledScroll = throttle(() => {
		console.log("Scroll event, updating scroll position...");
		// In a real application, this would update scroll position
		// updateScrollPosition();
	}, 100, { leading: true, trailing: true });

	return throttledScroll;
}

// Example 3: Once function for expensive operations
function createExpensiveOperation() {
	const expensiveOp = once(() => {
		console.log("Performing expensive operation...");
		// In a real application, this would be a heavy computation
		// return heavyComputation();
		return "expensive result";
	});

	return expensiveOp;
}

// Example 4: Async once function for API calls
function createApiCaller() {
	const apiCall = onceAsync(async (endpoint: string) => {
		console.log(`Making API call to: ${endpoint}`);
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 100));
		return { data: "api response", endpoint };
	});

	return apiCall;
}

// Example 5: Debounce with control methods
function createControllableHandler() {
	const controllableHandler = debounce((action: string) => {
		console.log(`Executing action: ${action}`);
		// In a real application, this would execute the action
		// executeAction(action);
	}, 500);

	return controllableHandler;
}

// Usage examples
const searchHandler = createAdvancedSearchHandler();
const scrollHandler = createScrollHandler();
const expensiveOp = createExpensiveOperation();
const apiCaller = createApiCaller();
const controllableHandler = createControllableHandler();

// Test enhanced debounce with leading edge
console.log("=== Enhanced Debounce Examples ===");
searchHandler("a"); // Should execute immediately (leading: true)
searchHandler("ab");
searchHandler("abc"); // Should execute after 300ms delay

// Test throttle
console.log("\n=== Throttle Examples ===");
scrollHandler(); // Should execute immediately
scrollHandler(); // Should be throttled
scrollHandler(); // Should be throttled

// Test once functions
console.log("\n=== Once Function Examples ===");
console.log("First call:", expensiveOp()); // Should execute
console.log("Second call:", expensiveOp()); // Should return cached result
console.log("Third call:", expensiveOp()); // Should return cached result

// Test async once
console.log("\n=== Async Once Examples ===");
const promise1 = apiCaller("/users");
const promise2 = apiCaller("/users"); // Should return same promise
console.log("Promise 1 === Promise 2:", promise1 === promise2);

// Test control methods
console.log("\n=== Control Methods Examples ===");
controllableHandler("action1");
controllableHandler("action2");
controllableHandler("action3");

// Check if pending
console.log("Handler pending:", controllableHandler.pending);

// Cancel the pending execution
controllableHandler.cancel();
console.log("Handler pending after cancel:", controllableHandler.pending);

// Flush example
controllableHandler("action4");
controllableHandler.flush(); // Should execute immediately
console.log("Handler pending after flush:", controllableHandler.pending);

// Wait for async operations
setTimeout(async () => {
	console.log("\n=== Async Results ===");
	try {
		const result1 = await promise1;
		const result2 = await promise2;
		console.log("API Result 1:", result1);
		console.log("API Result 2:", result2);
		console.log("Results are identical:", result1 === result2);
	} catch (error) {
		console.error("API call failed:", error);
	}
}, 200);

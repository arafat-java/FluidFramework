/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { debounce } from "../src/debounce.js";

// Example 1: Debouncing search input
function createSearchHandler() {
	const debouncedSearch = debounce((query: string) => {
		console.log(`Performing search for: "${query}"`);
		// In a real application, this would make an API call
		// performSearch(query);
	}, 300);

	return debouncedSearch;
}

// Example 2: Debouncing window resize handler
function createResizeHandler() {
	const debouncedResize = debounce(() => {
		console.log("Window resized, updating layout...");
		// In a real application, this would update the UI layout
		// updateLayout();
	}, 100);

	return debouncedResize;
}

// Example 3: Debouncing form submission
function createFormHandler() {
	const debouncedSubmit = debounce((formData: any) => {
		console.log("Submitting form data:", formData);
		// In a real application, this would submit the form
		// submitForm(formData);
	}, 500);

	return debouncedSubmit;
}

// Usage examples
const searchHandler = createSearchHandler();
const resizeHandler = createResizeHandler();
const formHandler = createFormHandler();

// Simulate rapid search input
searchHandler("a");
searchHandler("ab");
searchHandler("abc"); // Only this will execute after 300ms

// Simulate window resize events
resizeHandler();
resizeHandler();
resizeHandler(); // Only this will execute after 100ms

// Simulate form input changes
formHandler({ name: "John" });
formHandler({ name: "John", age: 30 });
formHandler({ name: "John", age: 30, email: "john@example.com" }); // Only this will execute after 500ms

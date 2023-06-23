/**
 * Svelte action to detect when an element is intersecting with the viewport
 * using `IntersectionObserver`.
 *
 * It is equivalent to just attaching an `IntersectionObserver` to the element,
 * but it handles the creation and destruction of the observer for you according
 * to Svelte's lifecycle.
 *
 * @param node The element to observe
 * @param callback The callback to call when the element is intersecting
 * @returns
 */
export const whenIntersect = (
	node: Element,
	callback: (entry: IntersectionObserverEntry) => void,
) => {
	// Create the observer.
	const observer = new IntersectionObserver((entries) => {
		// Since you can observe multiple elements with one observer, we need to
		// find the entry that corresponds to the element we are observing.
		//
		// I could probably just access the 0th index here & be done with it,
		// but just to be safe...
		const entry = entries.find(({ target }) => target === node);

		// If the entry is undefined, then the element is no longer in the DOM.
		if (!entry) return;

		callback(entry);
	});

	// Start observing the element.
	observer.observe(node);

	return {
		// Return a function to run when the element is destroyed.
		destroy() {
			// Stop observing the element.
			observer.disconnect();
		},
	};
};

export const whenIntersect = (
	node: Element,
	callback: (entry: IntersectionObserverEntry) => void,
) => {
	const observer = new IntersectionObserver((entries) => {
		const entry = entries.find(({ target }) => target === node);

		if (!entry) return;

		callback(entry);
	});

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
};

export const load = async ({ fetch, url }) => {
	const res = await fetch(`/api/v1/search${url.search}`);
	const json = await res.json();

	return {
		count: json.count,
		items: json.items,
	};
};

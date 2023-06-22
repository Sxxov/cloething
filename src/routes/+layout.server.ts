import { redirect } from '@sveltejs/kit';

export const load = ({ cookies, url }) => {
	const catalogue = cookies.get('catalogue');

	if (!url.searchParams.has('catalogue') && catalogue) {
		const to = new URL(url);

		to.searchParams.set('catalogue', catalogue);

		throw redirect(308, String(to));
	}
};

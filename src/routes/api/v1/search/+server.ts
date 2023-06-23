import db_men from '../../../../assets/db/men.json';
import db_women from '../../../../assets/db/women.json';
import db_kids from '../../../../assets/db/kids.json';
import { clamp } from '@sxxov/ut/math';
import { json } from '@sveltejs/kit';

const imgs = import.meta.glob('../../../../assets/img/items/*.webp');
const imgPathAndLoaders = Object.entries(imgs);

export interface IItem {
	img: () => Promise<unknown>;
	id: string;
	title: string;
	price: number;
	tags: readonly string[];
	colours: readonly `#${string}`[];
}

const dbItemToItem = (
	item:
		| (typeof db_men)[number]
		| (typeof db_women)[number]
		| (typeof db_kids)[number],
) =>
	({
		id: item.id,
		title: item.title,
		img:
			imgPathAndLoaders.find(([path]) =>
				path.endsWith(`/${item.src}`),
			)?.[1] ??
			(async () => {
				console.error(`No image loader was found for item: ${item.id}`);

				return '';
			}),
		price: item.price,
		tags: item.tags,
		colours:
			item.optionCount > 1
				? (
						[
							'#fad390',
							'#6a89cc',
							'#b8e994',
							'#e55039',
							'#1e3799',
							'#38ada9',
						] as const
				  ).slice(0, item.optionCount)
				: (['#fff0'] as const),
	} as const satisfies IItem);

const items = [
	...db_men.map(dbItemToItem),
	...db_women.map(dbItemToItem),
	...db_kids.map(dbItemToItem),
];

/**
 * The handler for the search request API endpoint. Handles GET requests only.
 *
 * @example
 * 	await(
 * 		await fetch(
 * 			`/api/v1/search${new URLSearchParams({
 * 				query: 'shirt',
 * 				limit: 10,
 * 				offset: 0,
 * 			})}`,
 * 		),
 * 	).json();
 */
export const GET = async ({ url }) => {
	// Get the parameters from the URL.
	// TODO: Add proper validation for the query parameters
	// 		 once database in implemented.
	const query = url.searchParams.get('query') ?? '';
	const limit = clamp(Number(url.searchParams.get('limit')) || 30, 0, 30);
	const offset = clamp(
		Number(url.searchParams.get('offset')) || 0,
		0,
		Infinity,
	);
	const tags = url.searchParams.getAll('tag');
	const catalogue = url.searchParams.get('catalogue') ?? '';

	// Filter the items based on the query parameters.
	const found = items.filter(
		(item) =>
			// If there are no tags, or the item has at least one of the tags.
			(tags.length <= 0 || item.tags.some((tag) => tags.includes(tag))) &&
			// If there is no catalogue, or the item is in the catalogue.
			(!catalogue || item.tags.includes(catalogue)) &&
			// If there is no query, or the item title or tags contain the query.
			(!query ||
				item.title.toLowerCase().includes(query.toLowerCase()) ||
				item.tags.some((tag) =>
					tag.toLowerCase().includes(query.toLowerCase()),
				)),
	);

	return json({
		count: found.length,
		items: await Promise.all(
			found.slice(offset, offset + limit).map(async (item) => ({
				id: item.id,
				title: item.title,
				src: String(((await item.img()) as any).default),
				price: item.price,
				tags: item.tags,
				colours: item.colours,
			})),
		),
	});
};

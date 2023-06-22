import db_men from '../../../../assets/db/men.json';
import db_women from '../../../../assets/db/women.json';
import db_kids from '../../../../assets/db/kids.json';
import { clamp } from '@sxxov/ut/math';
import { json } from '@sveltejs/kit';

export interface IItem {
	id: string;
	title: string;
	price: number;
	src: string;
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
		src: `/storage/items/${item.src}`,
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

export const GET = async ({ url }) => {
	const query = url.searchParams.get('query') ?? '';
	const limit = clamp(Number(url.searchParams.get('limit')) || 30, 0, 30);
	const offset = clamp(
		Number(url.searchParams.get('offset')) || 0,
		0,
		Infinity,
	);
	const tags = url.searchParams.getAll('tag');
	const catalogue = url.searchParams.get('catalogue') ?? '';

	const found = items.filter(
		(item) =>
			(tags.length <= 0 || item.tags.some((tag) => tags.includes(tag))) &&
			(!catalogue || item.tags.includes(catalogue)) &&
			(!query ||
				item.title.toLowerCase().includes(query.toLowerCase()) ||
				item.tags.some((tag) =>
					tag.toLowerCase().includes(query.toLowerCase()),
				)),
	);

	return json({
		count: found.length,
		items: found.slice(offset, offset + limit),
	});
};

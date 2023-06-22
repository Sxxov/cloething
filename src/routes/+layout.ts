import { Store } from '@sxxov/ut/store';

export const load = () => {
	return {
		freezeScroll: new Store(false),
	};
};

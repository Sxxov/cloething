<script
	context="module"
	lang="ts"
>
	import { Store } from '@sxxov/ut/store';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { beforeNavigate } from '$app/navigation';

	export const Catalogues = {
		women: { name: 'Women', icon: ic_face_3 },
		men: { name: 'Men', icon: ic_face },
		kids: { name: 'Kids', icon: ic_child_care },
	};

	export const catalogue = new Store<keyof typeof Catalogues>('women');

	init: {
		if (browser) {
			const spCatalogue = new URLSearchParams(location.search).get(
				'catalogue',
			);
			if (spCatalogue && spCatalogue in Catalogues) {
				catalogue.set(spCatalogue as keyof typeof Catalogues);
				break init;
			}

			const [cookieCatalogue = ''] =
				/(?<=catalogue=).*?(?=;|$)/.exec(document.cookie) ?? [];
			if (cookieCatalogue in Catalogues) {
				catalogue.set(cookieCatalogue as keyof typeof Catalogues);
				break init;
			}
		}

		catalogue.set('women');
	}

	catalogue.subscribe((v) => {
		if (browser) {
			document.cookie = `catalogue=${v}`;

			const p = get(page);

			if (!p.url) return;

			const to = new URL(p.url);

			if (to.searchParams.get('catalogue') !== v)
				to.searchParams.set('catalogue', v);

			void goto(to);
		}
	});
</script>

<script lang="ts">
	import { Button, ButtonVariants } from '@sxxov/sv/button';
	import { Svg } from '@sxxov/sv/svg';
	import { ic_child_care, ic_face, ic_face_3 } from 'maic/two_tone';
	import { goto } from '$app/navigation';
	import { css, type TCss } from '@sxxov/ut/css';

	export let width: TCss = 'max-content';

	beforeNavigate(({ to }) => {
		if (to) {
			const spCatalogue = to.url.searchParams.get('catalogue');
			if (
				spCatalogue &&
				spCatalogue in Catalogues &&
				spCatalogue !== $catalogue
			) {
				$catalogue = spCatalogue as keyof typeof Catalogues;
			}
		}
	});
</script>

<div
	class="catalogue-selector"
	style="
		--width: {css(width)};
	"
>
	{#each Object.entries(Catalogues) as [k, { name, icon }]}
		{@const isSelected = k === $catalogue}
		{@const url = new URL($page.url)}
		{(url.searchParams.set('catalogue', k), '')}
		<a href={url.search}>
			<Button
				width="max-content"
				roundness={28}
				{...isSelected
					? ButtonVariants.Primary
					: ButtonVariants.Secondary}
				colourBackground={isSelected
					? '----colour-accent-tertiary'
					: '----colour-background-primary'}
				shadow="----shadow-inner-sm"
			>
				<svelte:fragment slot="left"><Svg svg={icon} /></svelte:fragment
				>
				&nbsp;
				<span style="text-decoration: {isSelected ? '' : 'underline'};"
					>{name}</span
				>
				<div slot="right" />
			</Button>
		</a>
	{/each}
</div>

<style lang="postcss">
	.catalogue-selector {
		display: flex;
		flex-wrap: wrap;

		width: var(--width);

		& a {
			text-decoration: none;
		}
	}
</style>

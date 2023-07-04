<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '@sxxov/sv/button';
	import { whenResize } from '@sxxov/sv/ut/use';
	import { uncss } from '@sxxov/ut/css';
	import { onMount } from 'svelte';
	import { expoInOut } from 'svelte/easing';
	import { whenIntersect } from '../../lib/actions/whenIntersect';
	import { catalogue } from '../../lib/nav/CatalogueSelector.svelte';
	import { TitleOfPage } from '@sxxov/sv/misc';

	export let data;

	const paginationLimit = 30;
	const itemWidthMin = 400;
	let itemContainerDiv: HTMLDivElement | undefined;
	let itemContainerWidth = 0;
	let hasMounted = false;
	let isNavigatingAway = false;

	let { items } = data;

	export const dropOut = (
		element: HTMLElement,
		{ delay = 0, duration = 500 } = {},
	) => {
		const { marginBottom } = getComputedStyle(element);
		const marginBottomPx = uncss(marginBottom);
		const { clientWidth: width, clientHeight: height } = element;

		return {
			delay: isNavigatingAway ? 0 : delay,
			duration: isNavigatingAway ? 0 : duration,
			easing: expoInOut,
			css: (t: number) => `
			flex-grow: 0;
			opacity: ${t};
			width: ${t * width}px;
			height: ${t * height}px;
			margin-bottom: ${t * marginBottomPx}px;
		`,
		};
	};

	const setItems = (v: any[]) => {
		items = v;
	};

	beforeNavigate(({ from, to }) => {
		if (from?.route.id !== to?.route.id) isNavigatingAway = true;
	});

	onMount(() => {
		itemContainerWidth = itemContainerDiv!.clientWidth;
		hasMounted = true;
	});

	$: setItems(data.items);
	$: hasMounted && (data.items, scrollTo({ top: 0, behavior: 'smooth' }));

	$: itemColumns = Math.floor(itemContainerWidth / itemWidthMin);
	$: itemWidthMax =
		itemColumns > 0 ? itemContainerWidth / itemColumns : itemContainerWidth;

	$: query = $page.url.searchParams.get('query') ?? '';
	$: tags = $page.url.searchParams.getAll('tag');

	$: heading = query ? `“${query}”` : 'All Items';
</script>

<TitleOfPage title="{heading} — Cloething" />
<div class="component">
	<div class="heading">
		<h4>{heading}</h4>
		<p>
			{data.count} items in {$catalogue[0]?.toUpperCase()}{$catalogue.slice(
				1,
			)}
		</p>
	</div>

	<div
		class="items"
		bind:this={itemContainerDiv}
		use:whenResize={({ width }) => {
			itemContainerWidth = width;
		}}
		style="
			--width-item-min: {itemWidthMin}px;
			--width-item-max: {itemWidthMax}px;
		"
		class:unmounted={!hasMounted}
	>
		{#each items as { src, id, title, colours, price, tags }, i (id)}
			<a href="/Individual.html?id={id}">
				<div
					class="item"
					style="
						--i: {i % paginationLimit};
					"
					out:dropOut
				>
					<Button
						colourBackground="----colour-background-primary"
						colourBackgroundHover="----colour-background-secondary"
						height="auto"
						width="100%"
						roundness={0}
						shadow="----shadow-none"
						padding={0}
					>
						<div class="content">
							<div class="image">
								<img
									{src}
									alt={title}
								/>
							</div>

							<div class="data">
								<div class="colours">
									{#each colours as colour}
										<div
											class="colour"
											style="
												--colour: {colour};
											"
										/>
									{/each}
								</div>
								<p class="name">{title}</p>

								<p class="price">${price.toFixed(2)}</p>
							</div>
						</div>
					</Button>
				</div>
			</a>
		{/each}
		<div
			use:whenIntersect={async (e) => {
				if (e.isIntersecting) {
					const p = new URLSearchParams($page.url.searchParams);
					p.set('limit', String(paginationLimit));
					p.set('offset', String(items.length));

					const res = await fetch(`/api/v1/search?${p}`);

					if (res.ok) {
						const { items: newItems } = await res.json();

						items.push(...newItems);
						items = items;
					}
				}
			}}
		/>
	</div>
</div>

<style lang="postcss">
	.component {
		min-height: calc(100svh - 84px);
		min-height: calc(100vh - 84px);

		& > .heading {
			position: relative;
			text-align: center;
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: 28px;
			padding: 56px;
			box-sizing: border-box;
			z-index: 10;
			background: linear-gradient(
				180deg,
				var(----colour-background-primary) 90%,
				var(----colour-background-transparent) 100%
			);

			& > h4 {
				margin: 0;
			}

			& > p {
				margin: 0;
			}
		}

		& > .items {
			display: grid;
			/* grid-auto-flow: dense;
			grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
			gap: 0px;
			row-gap: 56px; */
			display: flex;
			flex-wrap: wrap;
			gap: 0px;

			&.unmounted {
				display: grid;
				grid-auto-flow: dense;
				grid-template-columns: repeat(
					auto-fill,
					minmax(var(--width-item-min), 1fr)
				);
				gap: 0px;

				& > a {
					& > .item {
						width: 100%;
						margin-bottom: 0;
					}
				}
			}

			& > a {
				display: contents;

				& > .item {
					position: relative;
					display: flex;
					flex-direction: column;
					/* width: 100%; */
					width: var(--width-item-min);
					max-width: var(--width-item-max);
					flex-grow: 1;
					margin-bottom: 56px;

					overflow: hidden;
					overflow: clip;

					box-shadow: var(----shadow-none);

					transform: translateY(0);
					transition: box-shadow 0.5s var(----ease-fast-slow),
						border-radius 0.5s var(----ease-fast-slow),
						transform 0.5s var(----ease-fast-slow);
					animation: in 1s var(----ease-slow-slow)
						calc(var(--i) * 0.1s) 1 normal backwards;

					@keyframes in {
						0% {
							opacity: 0;
							transform: translateY(-200px);
						}
						10% {
							opacity: 1;
						}
						100% {
							opacity: 1;
							transform: translateY(0px);
						}
					}

					&:hover {
						z-index: 10;

						--roundness-hover: 2px;

						box-shadow: var(----shadow-3xl);
						border-radius: var(--roundness-hover);
						transform: translateY(-4px) scale(1.01);

						box-sizing: border-box;

						& .content {
							& > .image {
								padding: 0px 2px;

								& > img {
									border-radius: var(--roundness-hover)
										var(--roundness-hover) 0 0;

									filter: brightness(1.1) contrast(1.1)
										saturate(0);
								}
							}
						}
					}

					& .content {
						& > .image {
							width: 100%;
							height: var(--width-item-max);

							aspect-ratio: 1 / 1;

							padding: 0px 1px;
							box-sizing: border-box;

							box-shadow: var(----shadow-inner-sm);
							transition: padding 0.5s var(----ease-fast-slow);

							& > img {
								display: block;
								width: 100%;
								height: 100%;
								object-fit: cover;

								border-radius: 0;
								filter: brightness(1) contrast(1) saturate(1);
								transition: filter 0.1s var(----ease-fast-slow),
									border-radius 0.5s var(----ease-fast-slow);
							}
						}

						& > .data {
							padding: 28px;
							box-sizing: border-box;
							text-align: center;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							gap: 14px;

							& > .name {
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								word-wrap: break-word;
								font-weight: 700;
								margin: 0;
								line-height: 1.5em;
								min-height: 3em;
							}

							& > .price {
								margin: 0;
							}

							& > .colours {
								display: flex;
								flex-direction: row;
								justify-content: center;
								align-items: center;

								& > .colour {
									width: 7px;
									height: 7px;
									border-radius: 50%;
									margin: 0 4px;

									background: var(--colour);
									border: 2px solid
										var(----colour-text-tertiary);
									box-shadow: var(----shadow-inner-sm);

									transition: background 0.1s
										var(----ease-fast-slow);

									&:first-child {
										margin-left: 0;
									}

									&:last-child {
										margin-right: 0;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>

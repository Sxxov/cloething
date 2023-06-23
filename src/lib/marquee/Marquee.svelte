<script lang="ts">
	/** A component that scrolls text in a straight line, like a marquee board. */

	import { css, type TCss } from '@sxxov/ut/css';
	import { onMount } from 'svelte';

	/**
	 * The duration of how long a piece of text will take to scroll from one end
	 * of the component, to the other.
	 */
	export let duration: TCss = 20;
	/**
	 * The gap between each piece of text.
	 *
	 * This is used to determine how many pieces of text are required to fill
	 * the component.
	 */
	export let gap: TCss = 10;

	let itemWidth = 0;
	let clientWidth = 0;

	/**
	 * Whether the component has been fully inserted into the DOM.
	 *
	 * This will stay `false` during SSR, since `onMount()` only runs on the
	 * client.
	 */
	let hasMounted = false;

	/**
	 * Compute the number of items required to fill the component, every time
	 * either the item width or the client width changes.
	 */
	$: itemCount = Math.ceil(clientWidth / itemWidth || 0) + 1;

	onMount(() => {
		hasMounted = true;
	});
</script>

<div
	class="marquee"
	style="
		--duration: {css(duration, 's')};
		--gap: {css(gap)};
		--count-item: {itemCount};
		--animation-iter-count-item: {hasMounted ? 'infinite' : '0'};
	"
	bind:clientWidth
>
	<div class="content">
		<div
			class="item"
			class:animated={hasMounted}
			bind:clientWidth={itemWidth}
		>
			<slot />
		</div>
		<!--
			Create an array with the length of `itemCount`, then fill it with nothing

			This is a workaround to create an index loop, since Svelte doesn't support
			loops in the template.
		-->
		{#each Array(itemCount).fill(undefined) as _}
			<div
				class="item"
				class:animated={hasMounted}
			>
				<slot />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.marquee {
		width: 100%;

		overflow: hidden;
		overflow: clip;

		& .item {
			padding-right: var(--gap);
			white-space: nowrap;
		}

		& > .content {
			display: flex;

			& > .item {
				flex-shrink: 0;

				/*
					BUG: for some reason, having the animation set initially will cause incorrect rendering
					when there are enough items to fully cover the overflow. this is reproducible in
					Chrome 111 & Firefox 111. the workaround is to only set the animation after the
					component has mounted.
				*/
				&.animated {
					animation: scroll calc(var(--duration) / var(--count-item))
						linear infinite;

					@keyframes scroll {
						from {
							transform: translateX(-100%);
						}
						to {
							transform: translateX(0%);
						}
					}
				}
			}
		}
	}
</style>

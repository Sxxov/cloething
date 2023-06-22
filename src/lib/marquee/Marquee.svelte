<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';
	import { onMount } from 'svelte';

	export let duration: TCss = 20;
	export let gap: TCss = 10;

	let itemWidth = 0;
	let clientWidth = 0;
	let hasMounted = false;

	$: itemCount = Math.ceil(clientWidth / itemWidth || 0) + 1;

	onMount(() => {
		hasMounted = true;
	});
</script>

<div
	class="component"
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
	.component {
		/* display: inline-block; */

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

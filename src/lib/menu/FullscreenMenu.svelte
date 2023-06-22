<script
	lang="ts"
	context="module"
>
	import { Store } from '@sxxov/ut/store';

	export let fullscreenMenuActive = new Store(false);
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import { css } from '@sxxov/ut/css';
	import { Composition, Tween } from '@sxxov/sv/animation';
	import { Button, ButtonVariants } from '@sxxov/sv/button';
	import type { TSvgString } from '@sxxov/ut/types';
	import { Svg } from '@sxxov/sv/svg';
	import { Spacer } from '@sxxov/sv/layout';
	import { bezierQuintInOut } from '@sxxov/ut/bezier/beziers';
	import { ic_close, ic_menu } from 'maic/two_tone';

	export let prefix = '';
	export let suffix = '';
	export let toppings: {
		icon: TSvgString;
		name: string;
		action: () => void;
	}[] = [];
	export let active = false;
	export let currentPageIndex = -1;

	let chosenButton = -1;
	$: active && (chosenButton = -1);

	$: fullscreenMenuActive.set(active);
	$: active = $fullscreenMenuActive;

	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === 'Escape') active = false;
	};

	onMount(() => {
		document.addEventListener('keyup', onKeyUp);
	});

	onDestroy(() => {
		if (browser) document.removeEventListener('keyup', onKeyUp);
	});
</script>

{#if (toppings?.length ?? 0) > 0}
	<div
		class="menu"
		class:active
		style="
			--duration: 0.5s;
		"
	>
		<div class="button">
			<Button
				{...ButtonVariants.FabRegularSecondary}
				on:click={() => {
					active = !active;
				}}
			>
				<Svg svg={active ? ic_close : ic_menu} />
			</Button>
		</div>
		<div
			class="overlay"
			on:click={() => {
				active = false;
			}}
			on:keydown={(event) => {
				if (event.key === 'Escape') active = false;
			}}
		>
			<div class="left" />
			<div class="top" />
			<div class="right" />
			<div class="bottom" />
		</div>
		<div
			class="toppings"
			style="
				--grid-template-rows: auto repeat({toppings.length}, min-content) auto;
			"
		>
			{#each toppings as { icon, name, action }, i}
				<Composition let:composition>
					<div
						class="topping"
						class:chosen={chosenButton === i}
						style="
							--grid-row: {i + 2} / {i + 3};
							--i: {i};
						"
						on:mouseover={() => {
							composition.play(1);
						}}
						on:focus={() => {
							composition.play(1);
						}}
						on:focusin={() => {
							composition.play(1);
						}}
						on:mouseout={() => {
							composition.play(-1);
						}}
						on:focusout={() => {
							composition.play(-1);
						}}
						on:blur={() => {
							composition.play(-1);
						}}
					>
						<Button
							{...ButtonVariants.Secondary}
							padding={14}
							width="100%"
							height="100%"
							shadow="----shadow-none"
							on:click={() => {
								active = false;
								chosenButton = i;
								action();
							}}
						>
							<svelte:fragment slot="left"
								><Svg
									svg={icon}
									height={16}
									width={24}
									colour={css(
										i === currentPageIndex &&
											i !== chosenButton
											? 'var(----colour-background-primary)'
											: 'var(----colour-text-primary)',
									)}
								/></svelte:fragment
							>

							<p
								class="heading"
								style="
										--colour-text: {i === currentPageIndex && i !== chosenButton
									? 'var(----colour-background-primary)'
									: 'var(----colour-text-primary)'}
									"
							>
								{#if prefix}
									<span class="prefix">
										{prefix}
									</span>
								{/if}

								{#each name
									.replace(/ /g, '\xa0')
									.split('') as char, ii}
									<Tween
										{composition}
										start={0}
										end={3}
										duration={500}
										bezier={bezierQuintInOut}
										delay={((ii * 2) / 60) * 1000}
										let:v
										><span
											style="
												transform: translateY({ii % 2 ? '' : '-'}{v}px);
											">{char}</span
										></Tween
									>
								{/each}
								<!-- {value} -->
								{#if suffix}
									<span class="suffix">
										{suffix}
									</span>
								{/if}
							</p>
						</Button>
					</div>
				</Composition>
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	.overlay {
		position: fixed;
		height: 100vh;
		top: 0;
		width: 100vw;
		left: 0;

		pointer-events: none;

		& > div {
			position: absolute;
			height: 100vh;
			width: 100vw;

			pointer-events: auto;

			clip-path: inset(100% 100% 100% 100%);

			background: var(----colour-background-primary);
			background: #000;
		}

		& > .left {
			top: 0;
			left: 0;

			clip-path: inset(0 100% 0 0);
			transition: clip-path 0.8s var(----ease-slow-slow);

			.active > & {
				clip-path: inset(0 50% 0 0);
			}
		}

		& > .top {
			top: 0;
			left: 0;

			clip-path: inset(0 0 100% 0);
			transition: clip-path 0.3s var(----ease-fast-slow);

			.active > & {
				clip-path: inset(0 0 50.1% 0);
			}
		}

		& > .right {
			top: 0;
			right: 0;

			clip-path: inset(0 0 0 100%);
			transition: clip-path 0.8s var(----ease-slow-slow);

			.active > & {
				clip-path: inset(0 0 0 50%);
			}
		}

		& > .bottom {
			bottom: 0;
			left: 0;

			clip-path: inset(100% 0 0 0);
			transition: clip-path 0.3s var(----ease-fast-slow);

			.active > & {
				clip-path: inset(50.1% 0 0 0);
			}
		}
	}

	.menu {
		& > .button {
			position: relative;
			z-index: 1;
			width: min-content;
		}

		&.chosen > .toppings {
			& .topping {
				--transition-background: background-color 0.3s
					var(----ease-fast-slow);
			}
		}

		&.active > .toppings {
			& .topping {
				--transition-border: border 0s calc(var(--delay) + 0.5s);
				--transition-opacity: opacity 0s calc(var(--delay));
				--transision-width: width 0.5s var(--delay)
					var(----ease-fast-slow);

				opacity: 1;
				pointer-events: auto;
				width: min(min(calc(100vw - 28px), 400px), 100vw);
			}
		}

		& > .toppings {
			height: 100%;
			width: 100%;

			position: fixed;
			top: 0;
			left: 0;

			display: grid;

			grid-template-rows: var(--grid-template-rows);
			align-items: center;
			justify-items: center;

			row-gap: 32px;

			z-index: 1;

			pointer-events: none;

			& .topping {
				width: 112px;
				height: 56px;
				grid-row: var(--grid-row);

				opacity: 0;
				pointer-events: none;

				--delay: calc(var(--i) * 0.1s);
				--transision-all: all 0.2s var(----ease-slow-slow);
				--transition-background: background-color 0s;
				--transition-padding: padding 0.5s var(--delay)
					var(----ease-fast-slow);
				--transision-width: width 0.3s var(--delay)
					var(----ease-slow-fast);
				--transision-height: height 0.2s var(----ease-fast-slow);
				--transition-border: border 0s var(--delay);
				--transition-opacity: opacity 0.1s calc(var(--delay) + 0.25s)
					var(----ease-fast-slow);

				transition: var(--transision-all), var(--transition-background),
					var(--transition-padding), var(--transision-width),
					var(--transision-height), var(--transition-border),
					var(--transition-opacity);

				pointer-events: auto;

				&:hover,
				&:active,
				&.chosen {
					height: 112px;
				}

				& .heading {
					display: inline-block;
					white-space: nowrap;
					color: var(--colour-text);

					text-transform: capitalize;
					font-weight: 900;

					font-size: 1rem;
				}

				& span {
					display: inline-block;
					padding: 0 0.25em;
				}
			}
		}
	}
</style>

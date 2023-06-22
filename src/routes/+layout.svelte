<script
	lang="ts"
	context="module"
>
	export const enum Particulars {
		NAME = 'Cloething',
		DESCRIPTION = '',
		KEYWORDS = '',
		AUTHOR = '',
	}
</script>

<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Lenis from '@studio-freight/lenis';
	import { onMount } from 'svelte';
	import faviPng from '../assets/favi/favicon.png?png&imagetools';
	import faviSvg from '../assets/favi/favicon.svg?url';
	import '../app.pcss';
	import Nav from '../lib/nav/Nav.svelte';
	import { Svg } from '@sxxov/sv/svg';
	import { Button, ButtonVariants } from '@sxxov/sv/button';
	import ic_whatsapp from '../assets/img/whatsapp.svg?raw';
	import ic_cg_text from '../assets/brand/logo/cg/text.svg?raw';
	import ic_cged_text from '../assets/brand/logo/cged/text.svg?raw';

	let navActive = false;
	let main: HTMLElement | undefined;
	let contentDiv: HTMLDivElement | undefined;
	let lenis: Lenis | undefined;
	let lenisRafHandle: number | undefined;
	const pageIdToScrollY = new Map<string, number>();

	$: if (lenis && window.matchMedia('(pointer: fine)').matches)
		navActive ? lenis.stop() : lenis.start();

	beforeNavigate((nav) => {
		const { id: fromId } = nav.from?.route ?? {};
		const fromScrollY = Number(lenis?.scroll);
		if (fromId) pageIdToScrollY.set(fromId, fromScrollY);
	});

	afterNavigate((nav) => {
		if (nav.type === 'popstate') {
			const { id: toId } = nav.to?.route ?? {};
			const toScrollY = toId ? pageIdToScrollY.get(toId) ?? 0 : 0;

			main!.scrollTo(0, toScrollY);
		}

		recreateLenis();
	});

	onMount(() => {
		recreateLenis();
	});

	const recreateLenis = () => {
		if (lenis) lenis.destroy();
		if (lenisRafHandle) cancelAnimationFrame(lenisRafHandle);

		lenis = new Lenis({
			wrapper: main!,
			content: contentDiv!,
			duration: 0.5,
		});

		lenisRafHandle = requestAnimationFrame(function raf(time) {
			lenis!.raf(time);
			lenisRafHandle = requestAnimationFrame(raf);
		});
	};
</script>

<svelte:head>
	<meta charset="utf-8" />

	<!-- Icon Tags -->
	<link
		rel="icon"
		type="image/svg+xml"
		href={faviSvg}
	/>
	<link
		rel="icon"
		type="image/png"
		href={faviPng}
	/>

	<!-- Viewport Tag to prevent jank -->
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1"
	/>

	<!-- Primary Meta Tags -->
	<meta
		name="title"
		content={Particulars.NAME}
	/>
	<meta
		name="description"
		content={Particulars.DESCRIPTION}
	/>
	<meta
		name="keywords"
		content={Particulars.KEYWORDS}
	/>
	<meta
		name="author"
		content="@{Particulars.AUTHOR}"
	/>

	<!-- Open Graph / Facebook -->
	<meta
		property="og:type"
		content="website"
	/>
	<meta
		property="og:url"
		content="https://metatags.io/"
	/>
	<meta
		property="og:title"
		content={Particulars.NAME}
	/>
	<meta
		property="og:description"
		content={Particulars.DESCRIPTION}
	/>
	<meta
		property="og:image"
		content="/screenshot.png"
	/>

	<!-- Twitter -->
	<meta
		property="twitter:card"
		content="summary_large_image"
	/>
	<meta
		property="twitter:url"
		content="https://metatags.io/"
	/>
	<meta
		property="twitter:title"
		content={Particulars.NAME}
	/>
	<meta
		property="twitter:description"
		content={Particulars.DESCRIPTION}
	/>
	<meta
		property="twitter:image"
		content="/screenshot.png"
	/>
</svelte:head>

<main bind:this={main}>
	<div
		class="content"
		bind:this={contentDiv}
	>
		<Nav bind:active={navActive} />
		<slot />
		<footer>
			<!-- <Logo hasBackNav={false} /> -->
			<div class="explainer">
				<div class="logos">
					<Svg
						width="auto"
						height={42}
						svg={ic_cg_text}
					/>/<Svg
						width="auto"
						height={67}
						svg={ic_cged_text}
					/>
				</div>
				<p>Sustainability meets chique.<br />Est. 2023</p>
			</div>
			<div class="centre">
				<p>© Cloething Inc. 2023</p>
			</div>
			<p>
				<a href="/">Home</a><br />
				<a href="/about-us">About Us</a><br />
				<a href="/contact-us">Contact Us</a><br />
				<a href="/faq">FAQ</a><br />
				<a href="http://localhost/shipping.html"
					>Shipping & Return Policies</a
				>
			</p>
			<div class="bottom">
				<Button
					{...ButtonVariants.Secondary}
					width="min(336px, calc(100vw - 56px))"
					><svelte:fragment slot="left"
						><Svg svg={ic_whatsapp} /></svelte:fragment
					>Contact</Button
				>
			</div>
		</footer>
	</div>
</main>

<style lang="postcss">
	:global(html, body) {
		margin: 0;

		background: var(----colour-background-primary);
	}

	main {
		height: 100%;
		height: 100svh;
		overflow: auto;

		& > .content {
			min-height: 100%;
			width: inherit;

			& > footer {
				/* display: grid;
				grid-template-columns: auto 1fr auto; */
				display: flex;
				flex-wrap: wrap;
				gap: max(1rem, 5vw);

				position: relative;
				height: 400px;
				background: var(----colour-background-secondary);
				z-index: 9;

				padding: var(----padding);
				box-sizing: border-box;

				& > .explainer {
					& > .logos {
						display: flex;
						align-items: center;
						gap: 1rem;

						color: var(----colour-text-primary);
					}
				}

				& > .centre {
					flex-grow: 1;
				}

				& > .bottom {
					width: 100%;
				}

				& > p {
					margin: 0;
					color: var(----colour-text-primary);
				}
			}
		}
	}
</style>

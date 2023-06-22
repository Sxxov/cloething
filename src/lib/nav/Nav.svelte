<script lang="ts">
	import { browser } from '$app/environment';
	import Lenis from '@studio-freight/lenis';
	import { Composition, Tween } from '@sxxov/sv/animation';
	import { Button, ButtonVariants } from '@sxxov/sv/button';
	import { Spacer } from '@sxxov/sv/layout';
	import { Svg } from '@sxxov/sv/svg';
	import { whenResize } from '@sxxov/sv/ut/use';
	import { bezierQuintInOut } from '@sxxov/ut/bezier/beziers';
	import {
		ic_account_circle,
		ic_add,
		ic_arrow_outward,
		ic_close,
		ic_cruelty_free,
		ic_menu,
		ic_remove,
		ic_shopping_cart,
		ic_shopping_cart_checkout,
		ic_volunteer_activism,
	} from 'maic/two_tone';
	import { onMount } from 'svelte';
	import ic_cg_symbol from '../../assets/brand/logo/cg/symbol.svg';
	import ic_cged_symbol from '../../assets/brand/logo/cged/symbol.svg';
	import img_misc_1 from '../../assets/img/misc/1284615.jpg';
	import img_misc_2 from '../../assets/img/misc/1284616.jpg';
	import img_misc_3 from '../../assets/img/misc/1284617.jpg';
	import CatelogueSelector from './CatalogueSelector.svelte';
	import Search from './Search.svelte';
	import { page } from '$app/stores';
	import Logo from './Logo.svelte';

	const enum Breakpoints {
		CATALOGUE = 1080,
		LOGO = 720,
		MENU = 776,
	}

	export let active = false;

	let menuDiv: HTMLDivElement | undefined;
	let cartDiv: HTMLDivElement | undefined;
	let stuffActive = false;
	let cartActive = false;
	let accountActive = false;

	let widthBar = 0;

	const cartItems = [
		{
			src: img_misc_1,
			name: 'Crewmate T-Shirt',
			price: 19.99,
			count: 1,
		},
		{
			src: img_misc_2,
			name: 'Impostor T-Shirt',
			price: 29.99,
			count: 3,
		},
		{
			src: img_misc_3,
			name: 'Something Pants',
			price: 69.99,
			count: 10,
		},
	];

	const setActive = (v: boolean) => (active = v);
	const setStuffActive = (v: boolean) => (stuffActive = v);
	const setCartActive = (v: boolean) => (cartActive = v);
	const setAccountActive = (v: boolean) => (accountActive = v);
	$: setActive(stuffActive || cartActive || accountActive);
	$: if (stuffActive) {
		if (widthBar < Breakpoints.MENU) {
			setCartActive(false);
			setAccountActive(false);
		}
	}

	$: if (cartActive) {
		if (widthBar < Breakpoints.MENU) setStuffActive(false);
		setAccountActive(false);
	}

	$: if (accountActive) {
		if (widthBar < Breakpoints.MENU) setStuffActive(false);
		setCartActive(false);
	}

	$: onMount(() => {
		const lenisMenu = new Lenis({
			wrapper: menuDiv!,
			content: menuDiv!,
			duration: 0.5,
		});
		const lenisCart = new Lenis({
			wrapper: cartDiv!,
			content: cartDiv!,
			duration: 0.5,
		});
		let lenisRaf = requestAnimationFrame(function raf(time) {
			lenisMenu.raf(time);
			lenisCart.raf(time);

			lenisRaf = requestAnimationFrame(raf);
		});

		return () => {
			lenisMenu.destroy();
			lenisCart.destroy();
			cancelAnimationFrame(lenisRaf);
		};
	});
</script>

<Composition let:composition>
	<div
		class="nav"
		on:click={() => {
			composition.pause();
			composition.seekToProgress(1);
		}}
		on:keydown={(e) => {
			if (e.key === 'Escape') {
				composition.pause();
				composition.seekToProgress(1);
			}
		}}
	>
		<div class="anim">
			<Tween
				{composition}
				start={49}
				end={0}
				delay={2000}
				duration={1000}
				bezier={bezierQuintInOut}
				let:v={y}
			>
				{#if y > 0.1}
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 157 {y}"
					>
						<Tween
							{composition}
							start={0}
							end={-49}
							delay={1000}
							duration={1000}
							bezier={bezierQuintInOut}
							let:v={x}
						>
							<Tween
								{composition}
								start={49}
								end={0}
								delay={0}
								duration={1000}
								bezier={bezierQuintInOut}
								let:v
							>
								<path
									d="M15.8079 4.344C17.9199 4.344 19.6479 4.664 20.9919 5.304C22.3679 5.912 23.5839 6.632 24.6399 7.464C25.2799 7.944 25.7599 8.008 26.0799 7.656C26.4319 7.272 26.6719 6.392 26.7999 5.016H27.9039C27.8399 6.2 27.7919 7.64 27.7599 9.336C27.7279 11.032 27.7119 13.272 27.7119 16.056H26.6079C26.3839 14.68 26.1759 13.592 25.9839 12.792C25.7919 11.96 25.5519 11.256 25.2639 10.68C25.0079 10.104 24.6559 9.528 24.2079 8.952C23.2159 7.64 21.9679 6.696 20.4639 6.12C18.9599 5.512 17.3759 5.208 15.7119 5.208C14.1439 5.208 12.7199 5.608 11.4399 6.408C10.1919 7.176 9.10395 8.296 8.17595 9.768C7.27995 11.24 6.57595 13.016 6.06395 15.096C5.58395 17.176 5.34395 19.512 5.34395 22.104C5.34395 24.792 5.61595 27.176 6.15995 29.256C6.70395 31.304 7.45595 33.032 8.41595 34.44C9.40795 35.848 10.5599 36.92 11.8719 37.656C13.2159 38.36 14.6559 38.712 16.1919 38.712C17.6319 38.712 19.1359 38.424 20.7039 37.848C22.2719 37.272 23.5039 36.344 24.3999 35.064C25.1039 34.136 25.5839 33.128 25.8399 32.04C26.1279 30.952 26.3839 29.432 26.6079 27.48H27.7119C27.7119 30.392 27.7279 32.744 27.7599 34.536C27.7919 36.296 27.8399 37.784 27.9039 39H26.7999C26.6719 37.624 26.4479 36.76 26.1279 36.408C25.8399 36.056 25.3439 36.104 24.6399 36.552C23.4559 37.384 22.1919 38.12 20.8479 38.76C19.5359 39.368 17.8399 39.672 15.7599 39.672C12.7199 39.672 10.0479 38.984 7.74395 37.608C5.47195 36.232 3.69595 34.248 2.41595 31.656C1.16795 29.064 0.543945 25.944 0.543945 22.296C0.543945 18.712 1.19995 15.576 2.51195 12.888C3.82395 10.2 5.61595 8.104 7.88795 6.6C10.1919 5.096 12.8319 4.344 15.8079 4.344Z"
									fill="currentColor"
									style="transform: translateY({v + x}px);"
								/>
							</Tween>
						</Tween>
						<Tween
							{composition}
							start={0}
							end={-49}
							delay={1100}
							duration={1000}
							bezier={bezierQuintInOut}
							let:v={x}
						>
							<Tween
								{composition}
								start={49}
								end={0}
								delay={100}
								duration={1000}
								bezier={bezierQuintInOut}
								let:v
							>
								<path
									d="M28.7428 34.92C28.4868 35.848 28.4068 36.584 28.5028 37.128C28.5988 37.64 28.9508 37.896 29.5588 37.896C30.1988 37.896 30.7908 37.544 31.3348 36.84C31.9108 36.104 32.5188 34.824 33.1588 33L33.7828 31.224H34.6948L33.4948 34.728C33.0788 35.944 32.5668 36.92 31.9588 37.656C31.3828 38.36 30.7428 38.872 30.0388 39.192C29.3348 39.512 28.5668 39.672 27.7348 39.672C26.6788 39.672 25.8948 39.464 25.3828 39.048C24.9028 38.664 24.5988 38.136 24.4708 37.464C24.3748 36.792 24.3908 36.072 24.5188 35.304C24.6788 34.504 24.8708 33.72 25.0948 32.952L32.9188 6.984C33.2388 5.896 33.2068 5.096 32.8228 4.584C32.4388 4.072 31.4628 3.816 29.8948 3.816L30.2308 2.808C31.9908 2.776 33.5428 2.6 34.8868 2.28C36.2308 1.928 37.5268 1.448 38.7748 0.839999L28.7428 34.92Z"
									fill="currentColor"
									style="transform: translateY({v + x}px);"
								/>
							</Tween>
						</Tween>
						<Tween
							{composition}
							start={0}
							end={-49}
							delay={1200}
							duration={1000}
							bezier={bezierQuintInOut}
							let:v={x}
						>
							<Tween
								{composition}
								start={49}
								end={0}
								delay={200}
								duration={1000}
								bezier={bezierQuintInOut}
								let:v
							>
								<path
									d="M44.5513 13.608C46.5993 13.608 48.4393 14.056 50.0713 14.952C51.7033 15.848 52.9993 17.256 53.9593 19.176C54.9513 21.096 55.4473 23.592 55.4473 26.664C55.4473 29.736 54.9513 32.232 53.9593 34.152C52.9993 36.04 51.7033 37.432 50.0713 38.328C48.4393 39.224 46.5993 39.672 44.5513 39.672C42.5353 39.672 40.6953 39.224 39.0313 38.328C37.3993 37.432 36.0873 36.04 35.0953 34.152C34.1353 32.232 33.6553 29.736 33.6553 26.664C33.6553 23.592 34.1353 21.096 35.0953 19.176C36.0873 17.256 37.3993 15.848 39.0313 14.952C40.6953 14.056 42.5353 13.608 44.5513 13.608ZM44.5513 14.568C42.7273 14.568 41.2233 15.512 40.0393 17.4C38.8873 19.288 38.3113 22.376 38.3113 26.664C38.3113 30.952 38.8873 34.04 40.0393 35.928C41.2233 37.784 42.7273 38.712 44.5513 38.712C46.3753 38.712 47.8633 37.784 49.0153 35.928C50.1993 34.04 50.7913 30.952 50.7913 26.664C50.7913 22.376 50.1993 19.288 49.0153 17.4C47.8633 15.512 46.3753 14.568 44.5513 14.568Z"
									fill="currentColor"
									style="transform: translateY({v + x}px);"
								/>
							</Tween>
						</Tween>
						<Tween
							{composition}
							start={0}
							end={-49}
							delay={1300}
							duration={1000}
							bezier={bezierQuintInOut}
							let:v={x}
						>
							<Tween
								{composition}
								start={49}
								end={0}
								delay={300}
								duration={1000}
								bezier={bezierQuintInOut}
								let:v
							>
								<path
									d="M64.9922 13.608C67.8082 13.608 70.0002 14.472 71.5682 16.2C73.1682 17.896 73.9682 20.552 73.9682 24.168H57.0242L56.9762 23.256H69.3602C69.4242 21.688 69.2962 20.248 68.9762 18.936C68.6562 17.592 68.1442 16.52 67.4402 15.72C66.7682 14.92 65.8882 14.52 64.8002 14.52C63.3282 14.52 62.0162 15.256 60.8642 16.728C59.7442 18.2 59.0722 20.536 58.8482 23.736L58.9922 23.928C58.9282 24.408 58.8802 24.936 58.8482 25.512C58.8162 26.088 58.8002 26.664 58.8002 27.24C58.8002 29.416 59.1522 31.288 59.8562 32.856C60.5602 34.424 61.4722 35.624 62.5922 36.456C63.7442 37.256 64.9282 37.656 66.1442 37.656C67.1042 37.656 68.0162 37.512 68.8802 37.224C69.7442 36.904 70.5442 36.392 71.2802 35.688C72.0162 34.984 72.6562 34.04 73.2002 32.856L74.1602 33.24C73.8082 34.296 73.2322 35.32 72.4322 36.312C71.6322 37.304 70.6242 38.12 69.4082 38.76C68.1922 39.368 66.7842 39.672 65.1842 39.672C62.8802 39.672 60.8962 39.144 59.2322 38.088C57.6002 37.032 56.3362 35.576 55.4402 33.72C54.5762 31.832 54.1442 29.672 54.1442 27.24C54.1442 24.424 54.5922 22.008 55.4882 19.992C56.3842 17.944 57.6482 16.376 59.2802 15.288C60.9122 14.168 62.8162 13.608 64.9922 13.608Z"
									fill="currentColor"
									style="transform: translateY({v + x}px);"
								/>
							</Tween>
						</Tween>
						<Tween
							{composition}
							start={0}
							end={-49}
							delay={1400}
							duration={1000}
							bezier={bezierQuintInOut}
							let:v={x}
						>
							<Tween
								{composition}
								start={49}
								end={0}
								delay={400}
								duration={1000}
								bezier={bezierQuintInOut}
								let:v
							>
								<path
									d="M88.4574 14.328L88.3134 15.288H73.3854L73.6254 14.328H88.4574ZM76.2654 34.92C75.9774 35.976 76.0414 36.744 76.4574 37.224C76.9054 37.672 77.4814 37.896 78.1854 37.896C78.8895 37.896 79.5934 37.592 80.2974 36.984C81.0334 36.376 81.7534 35.08 82.4574 33.096L83.1294 31.224H84.0414L83.0334 34.248C82.3294 36.328 81.4174 37.752 80.2974 38.52C79.2094 39.288 77.9294 39.672 76.4574 39.672C75.1454 39.672 74.1374 39.4 73.4334 38.856C72.7614 38.28 72.3614 37.48 72.2334 36.456C72.1054 35.432 72.2334 34.264 72.6174 32.952L80.0574 7.032C80.8254 7 81.5774 6.936 82.3134 6.84C83.0814 6.744 83.7694 6.584 84.3774 6.36L76.2654 34.92Z"
									fill="currentColor"
									style="transform: translateY({v + x}px);"
								/>
							</Tween>
						</Tween>
						<Tween
							{composition}
							start={0}
							end={-49}
							delay={1500}
							duration={1000}
							bezier={bezierQuintInOut}
							let:v={x}
						>
							<Tween
								{composition}
								start={49}
								end={0}
								delay={500}
								duration={1000}
								bezier={bezierQuintInOut}
								let:v
							>
								<path
									d="M84.5665 39H80.3904L89.8944 6.984C90.2144 5.896 90.1665 5.096 89.7505 4.584C89.3664 4.072 88.3904 3.816 86.8224 3.816L87.1105 2.808C88.8705 2.776 90.4545 2.6 91.8624 2.28C93.2704 1.928 94.5665 1.448 95.7505 0.839999L84.5665 39ZM85.9104 31.896C87.1264 28.536 88.2785 25.688 89.3664 23.352C90.4865 21.016 91.5905 19.144 92.6785 17.736C93.7664 16.296 94.8865 15.256 96.0385 14.616C97.1905 13.976 98.3904 13.656 99.6385 13.656C101.142 13.656 102.166 14.024 102.71 14.76C103.286 15.464 103.542 16.376 103.478 17.496C103.414 18.616 103.19 19.752 102.806 20.904L98.1505 34.92C97.8945 35.752 97.7824 36.456 97.8144 37.032C97.8464 37.608 98.2144 37.896 98.9184 37.896C99.5265 37.896 100.118 37.56 100.694 36.888C101.302 36.216 101.942 34.92 102.614 33L103.238 31.224H104.15L102.95 34.728C102.502 36.072 101.942 37.096 101.27 37.8C100.63 38.504 99.9425 38.984 99.2065 39.24C98.5024 39.528 97.8145 39.672 97.1424 39.672C95.8624 39.672 94.9665 39.384 94.4545 38.808C93.9425 38.232 93.7184 37.432 93.7824 36.408C93.8784 35.384 94.1345 34.232 94.5505 32.952L99.1105 19.224C99.2704 18.744 99.4145 18.184 99.5424 17.544C99.6704 16.904 99.6385 16.36 99.4464 15.912C99.2865 15.432 98.8224 15.192 98.0545 15.192C97.2544 15.192 96.3904 15.56 95.4624 16.296C94.5665 17 93.6385 18.024 92.6785 19.368C91.7185 20.712 90.7745 22.328 89.8465 24.216C88.9184 26.104 88.0224 28.216 87.1584 30.552C86.3264 32.856 85.5424 35.352 84.8064 38.04L85.9104 31.896Z"
									fill="currentColor"
									style="transform: translateY({v + x}px);"
								/>
							</Tween>
						</Tween>
						<Tween
							{composition}
							start={0}
							end={-49}
							delay={1600}
							duration={1000}
							bezier={bezierQuintInOut}
							let:v={x}
						>
							<Tween
								{composition}
								start={49}
								end={0}
								delay={600}
								duration={1000}
								bezier={bezierQuintInOut}
								let:v
							>
								<path
									d="M107.661 2.28C108.493 2.28 109.213 2.584 109.821 3.192C110.429 3.8 110.733 4.52 110.733 5.352C110.733 6.184 110.429 6.904 109.821 7.512C109.213 8.12 108.493 8.424 107.661 8.424C106.829 8.424 106.109 8.12 105.501 7.512C104.893 6.904 104.589 6.184 104.589 5.352C104.589 4.52 104.893 3.8 105.501 3.192C106.109 2.584 106.829 2.28 107.661 2.28ZM110.157 13.752V34.536C110.157 35.88 110.429 36.792 110.973 37.272C111.549 37.752 112.493 37.992 113.805 37.992V39C113.261 38.968 112.429 38.936 111.309 38.904C110.221 38.84 109.117 38.808 107.997 38.808C106.909 38.808 105.805 38.84 104.685 38.904C103.565 38.936 102.733 38.968 102.189 39V37.992C103.501 37.992 104.429 37.752 104.973 37.272C105.549 36.792 105.837 35.88 105.837 34.536V19.512C105.837 18.072 105.581 17.016 105.069 16.344C104.557 15.64 103.597 15.288 102.189 15.288V14.28C103.213 14.376 104.205 14.424 105.165 14.424C106.093 14.424 106.973 14.376 107.805 14.28C108.669 14.152 109.453 13.976 110.157 13.752Z"
									fill="currentColor"
									style="transform: translateY({v + x}px);"
								/>
							</Tween>
						</Tween>
						<Tween
							{composition}
							start={0}
							end={-49}
							delay={1700}
							duration={1000}
							bezier={bezierQuintInOut}
							let:v={x}
						>
							<Tween
								{composition}
								start={49}
								end={0}
								delay={700}
								duration={1000}
								bezier={bezierQuintInOut}
								let:v
							>
								<path
									d="M126.619 13.608C127.835 13.608 128.843 13.768 129.643 14.088C130.475 14.408 131.163 14.856 131.707 15.432C132.315 16.072 132.747 16.872 133.003 17.832C133.259 18.792 133.387 20.088 133.387 21.72V34.536C133.387 35.88 133.659 36.792 134.203 37.272C134.779 37.752 135.723 37.992 137.035 37.992V39C136.491 38.968 135.659 38.936 134.539 38.904C133.419 38.84 132.331 38.808 131.275 38.808C130.219 38.808 129.179 38.84 128.155 38.904C127.163 38.936 126.411 38.968 125.899 39V37.992C127.051 37.992 127.867 37.752 128.347 37.272C128.827 36.792 129.067 35.88 129.067 34.536V20.664C129.067 19.672 128.987 18.76 128.827 17.928C128.667 17.096 128.299 16.424 127.723 15.912C127.179 15.4 126.331 15.144 125.179 15.144C123.835 15.144 122.651 15.528 121.627 16.296C120.635 17.064 119.851 18.12 119.275 19.464C118.731 20.776 118.459 22.248 118.459 23.88V34.536C118.459 35.88 118.699 36.792 119.179 37.272C119.659 37.752 120.475 37.992 121.627 37.992V39C121.115 38.968 120.347 38.936 119.323 38.904C118.331 38.84 117.307 38.808 116.251 38.808C115.195 38.808 114.107 38.84 112.987 38.904C111.867 38.936 111.035 38.968 110.491 39V37.992C111.803 37.992 112.731 37.752 113.275 37.272C113.851 36.792 114.139 35.88 114.139 34.536V19.512C114.139 18.072 113.883 17.016 113.371 16.344C112.859 15.64 111.899 15.288 110.491 15.288V14.28C111.515 14.376 112.507 14.424 113.467 14.424C114.395 14.424 115.275 14.376 116.107 14.28C116.971 14.152 117.755 13.976 118.459 13.752V19.416C119.291 17.24 120.443 15.736 121.915 14.904C123.419 14.04 124.987 13.608 126.619 13.608Z"
									fill="currentColor"
									style="transform: translateY({v + x}px);"
								/>
							</Tween>
						</Tween>
						<Tween
							{composition}
							start={0}
							end={-49}
							delay={1800}
							duration={1000}
							bezier={bezierQuintInOut}
							let:v={x}
						>
							<Tween
								{composition}
								start={49}
								end={0}
								delay={800}
								duration={1000}
								bezier={bezierQuintInOut}
								let:v
							>
								<path
									d="M141.735 48.024C140.039 48.024 138.439 47.848 136.935 47.496C135.431 47.144 134.215 46.584 133.287 45.816C132.391 45.08 131.943 44.136 131.943 42.984C131.943 41.864 132.391 40.904 133.287 40.104C134.183 39.304 135.399 38.696 136.935 38.28L137.223 39.048C136.519 39.272 135.959 39.72 135.543 40.392C135.127 41.064 134.919 41.816 134.919 42.648C134.919 44.12 135.591 45.24 136.935 46.008C138.311 46.808 140.087 47.208 142.263 47.208C143.703 47.208 145.111 47.016 146.487 46.632C147.863 46.28 148.999 45.672 149.895 44.808C150.791 43.944 151.239 42.808 151.239 41.4C151.239 40.344 150.855 39.48 150.087 38.808C149.351 38.104 147.879 37.752 145.671 37.752H142.119C141.095 37.752 140.103 37.672 139.143 37.512C138.183 37.352 137.399 37.016 136.791 36.504C136.183 35.992 135.879 35.208 135.879 34.152C135.879 33.064 136.327 32.024 137.223 31.032C138.119 30.008 139.767 28.968 142.167 27.912L142.743 28.344C141.655 28.92 140.711 29.512 139.911 30.12C139.111 30.696 138.711 31.384 138.711 32.184C138.711 33.208 139.479 33.72 141.015 33.72H147.015C148.359 33.72 149.591 33.912 150.711 34.296C151.863 34.68 152.791 35.288 153.495 36.12C154.199 36.952 154.551 38.04 154.551 39.384C154.551 40.888 154.071 42.296 153.111 43.608C152.151 44.92 150.711 45.976 148.791 46.776C146.903 47.608 144.551 48.024 141.735 48.024ZM141.975 28.776C140.407 28.776 138.983 28.52 137.703 28.008C136.423 27.464 135.415 26.632 134.679 25.512C133.943 24.392 133.575 22.952 133.575 21.192C133.575 19.432 133.943 17.992 134.679 16.872C135.415 15.752 136.423 14.936 137.703 14.424C138.983 13.88 140.407 13.608 141.975 13.608C143.575 13.608 144.999 13.88 146.247 14.424C147.527 14.936 148.535 15.752 149.271 16.872C150.007 17.992 150.375 19.432 150.375 21.192C150.375 22.952 150.007 24.392 149.271 25.512C148.535 26.632 147.527 27.464 146.247 28.008C144.999 28.52 143.575 28.776 141.975 28.776ZM141.975 27.912C143.191 27.912 144.135 27.432 144.807 26.472C145.511 25.512 145.863 23.752 145.863 21.192C145.863 18.632 145.511 16.872 144.807 15.912C144.135 14.952 143.191 14.472 141.975 14.472C140.791 14.472 139.847 14.952 139.143 15.912C138.439 16.872 138.087 18.632 138.087 21.192C138.087 23.752 138.439 25.512 139.143 26.472C139.847 27.432 140.791 27.912 141.975 27.912ZM148.887 17.592L148.023 17.256C148.471 16.168 149.239 15.208 150.327 14.376C151.415 13.544 152.551 13.128 153.735 13.128C154.567 13.128 155.239 13.368 155.751 13.848C156.263 14.296 156.519 14.984 156.519 15.912C156.519 16.904 156.247 17.608 155.703 18.024C155.191 18.408 154.663 18.6 154.119 18.6C153.639 18.6 153.191 18.44 152.775 18.12C152.359 17.768 152.119 17.224 152.055 16.488C151.991 15.752 152.215 14.808 152.727 13.656L153.351 13.8C152.007 14.312 151.047 14.856 150.471 15.432C149.895 15.976 149.367 16.696 148.887 17.592Z"
									fill="currentColor"
									style="transform: translateY({v + x}px);"
								/>
							</Tween>
						</Tween>
					</svg>
				{/if}
			</Tween>
		</div>
		<Tween
			{composition}
			start={0}
			end={84}
			delay={2000}
			duration={1000}
			bezier={bezierQuintInOut}
			let:v
		>
			<div
				class="bar"
				style="height: {v}px"
				use:whenResize={({ width }) => {
					[widthBar] = [width];
				}}
			>
				<Tween
					{composition}
					start={84}
					end={0}
					delay={2000}
					duration={1000}
					bezier={bezierQuintInOut}
					let:v
				>
					<div
						class="left"
						style="transform: translateY({v}px);"
						on:keydown={(e) => {
							if (e.key === 'Escape') stuffActive = false;
						}}
					>
						<Button
							{...ButtonVariants.FabRegularSecondary}
							colourBackground="----colour-background-secondary"
							colourBackgroundHover="----colour-background-tertiary"
							shadow="----shadow-inner-sm"
							on:click={() => (stuffActive = !stuffActive)}
						>
							<Svg svg={stuffActive ? ic_close : ic_menu} />
						</Button>
						{#if widthBar > Breakpoints.LOGO}
							<Logo />
						{/if}
					</div>
				</Tween>
				<Tween
					{composition}
					start={84}
					end={0}
					delay={2300}
					duration={1000}
					bezier={bezierQuintInOut}
					let:v
				>
					<div
						class="centre"
						style="transform: translateY({v}px);"
					>
						<Search />
					</div>
				</Tween>
				<Tween
					{composition}
					start={84}
					end={0}
					delay={2600}
					duration={1000}
					bezier={bezierQuintInOut}
					let:v
				>
					<div
						class="right"
						style="transform: translateY({v}px);"
					>
						{#if widthBar > Breakpoints.CATALOGUE}
							<CatelogueSelector />
						{/if}
						<div class="pill">
							<div class="cart">
								<Button
									{...ButtonVariants.FabRegularSecondary}
									colourBackground="transparent"
									shadow="----shadow-none"
									roundness={56}
									on:click={() => (cartActive = !cartActive)}
									><Svg
										svg={cartActive
											? ic_close
											: ic_shopping_cart}
									/></Button
								>
							</div>
							<div class="account">
								<Button
									{...ButtonVariants.FabRegularSecondary}
									colourBackground="transparent"
									shadow="----shadow-none"
									roundness={56}
									on:click={() =>
										(accountActive = !accountActive)}
									><Svg
										svg={accountActive
											? ic_close
											: ic_account_circle}
									/></Button
								>
							</div>
						</div>
					</div>
				</Tween>
			</div>
		</Tween>
	</div>
	{(browser && composition.play(), '')}
</Composition>
<div
	class="stuff menu"
	class:active={stuffActive}
	bind:this={menuDiv}
>
	{#if widthBar <= Breakpoints.LOGO}
		<Logo />
	{/if}
	{#if widthBar <= Breakpoints.CATALOGUE}
		<CatelogueSelector width="min-content" />
	{/if}
	<div class="section">
		<h4>Best Sellers</h4>
		<p>
			<a href="/best-sellers/featured">Featured</a><br />
			<a href="/best-sellers/trending">Trending</a><br />
			<a href="/best-sellers/all-time">All-time Best Sellers</a>
		</p>
	</div>
	<div class="section">
		<h4>New Arrivals</h4>
		<p>
			<a href="/new-arrivals/?women">Women's New Arrivals</a><br />
			<a href="/new-arrivals/?men">Men's New Arrivals</a><br />
			<a href="/new-arrivals/?kids">Kids' New Arrivals</a>
		</p>
	</div>
	<div class="section">
		<h4>Collections</h4>
		<p>
			<a href="/collections/spring-2023">Spring Collection '23</a><br />
			<a href="/collections/crewmate-2023">Crewmate Series</a><br />
			<a href="/collections/impostor-2023">Impostor Collection</a><br />
			<a href="/collections/something-2023">Something Edition</a>
		</p>
	</div>
	<div class="section">
		<h4>Catelogues</h4>
		<p>
			<a href="/catelogue/?women">Womens</a><br />
			<a href="/catelogue/?men">Mens</a><br />
			<a href="/catelogue/?kids">Kids</a><br />
			<a href="/catelogue/?unisex">Unisex</a>
		</p>
	</div>
	<div class="section">
		<h4>Categories</h4>
		<p>
			<a href="/categories/shirts">Shirts</a><br />
			<a href="/categories/t-shirts">T-Shirts</a><br />
			<a href="/categories/trousers">Trousers</a><br />
			<a href="/categories/dresses">Dresses</a><br />
			<a href="/categories/accessories">Accessories</a><br />
			<a href="/categories/shoes">Shoes</a><br />
			<a href="/categories/formalwear">Formalwear</a>
		</p>
	</div>
	<Spacer height={28} />
	<div class="cta">
		<a href="/education"
			><Button {...ButtonVariants.Secondary}>
				<svelte:fragment slot="left"
					><Svg svg={ic_cruelty_free} /></svelte:fragment
				>Cloething Education<svelte:fragment slot="right"
					><Svg svg={ic_arrow_outward} /></svelte:fragment
				>
			</Button></a
		>
		<a href="/education/donate"
			><Button {...ButtonVariants.Secondary}>
				<svelte:fragment slot="left"
					><Svg svg={ic_volunteer_activism} /></svelte:fragment
				>Donate<svelte:fragment slot="right"
					><Svg svg={ic_arrow_outward} /></svelte:fragment
				>
			</Button></a
		>
	</div>
</div>
<div
	class="cart menu"
	class:active={cartActive}
	bind:this={cartDiv}
>
	<div class="section">
		<h4>Cart</h4>
		<div class="items">
			{#each cartItems as item}
				<div class="item">
					<div class="image">
						<img
							src={item.src}
							alt="Item"
						/>
					</div>
					<div class="details">
						<h5>{item.name}</h5>
						<p>${item.price}</p>
					</div>
					<div class="actions">
						<div class="quantity">
							<Button
								{...ButtonVariants.FabRegularSecondary}
								on:click={() => {
									--item.count;
								}}><Svg svg={ic_remove} /></Button
							>
							<div class="number"><p>{item.count}</p></div>
							<Button
								{...ButtonVariants.FabRegularSecondary}
								on:click={() => {
									++item.count;
								}}><Svg svg={ic_add} /></Button
							>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<Spacer height={28} />
	<div class="cta">
		<div class="total">
			<h4>Total</h4>
			<p>
				${cartItems
					.reduce((prev, curr) => prev + curr.price * curr.count, 0)
					.toFixed(2)}
			</p>
		</div>
		<a href="/pay">
			<Button {...ButtonVariants.Primary}
				><svelte:fragment slot="left"
					><Svg svg={ic_shopping_cart_checkout} /></svelte:fragment
				>Checkout</Button
			>
		</a>
	</div>
</div>
<div
	class="account menu"
	class:active={accountActive}
>
	<div class="section">
		<h4>Account</h4>
		<p>
			<a href="/account">My Account</a><br />
			<a href="/account/orders">My Orders</a><br />
			<a href="/account/settings">Settings</a><br />
			<a href="/account/logout">Logout</a>
		</p>
	</div>
</div>
<div
	class="overlay"
	on:click={() => {
		stuffActive = false;
		cartActive = false;
		accountActive = false;
	}}
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			stuffActive = false;
			cartActive = false;
			accountActive = false;
		}
	}}
/>

<!-- 
<Dropdown
	name="thing"
	label="thing"
	items={[
		{
			icon: ic_check,
			id: 'thing',
			terms: ['thing', 'thing', 'thing'],
			title: 'thing',
		},
		{
			icon: ic_check,
			id: 'thing2',
			terms: ['thing', 'thing', 'thing'],
			title: 'thing',
		},
	]}
/> -->

<style lang="postcss">
	.nav {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1002;

		background: var(----colour-background-primary);

		& > .anim {
			width: 100%;

			& > svg {
				display: block;
				height: auto;

				& path {
					fill: var(----colour-text-primary);
				}
			}
		}

		& > .bar {
			height: 84px;

			display: grid;
			grid-template-areas: 'left centre right';
			grid-template-columns: auto 1fr auto;
			gap: 14px;

			padding: 0 7px;
			box-sizing: border-box;

			overflow: hidden;
			overflow: clip;

			background: var(----colour-background-primary);
			box-shadow: var(----shadow-sm);
			border-bottom: 1px solid var(----colour-background-secondary);

			& > .left {
				width: max-content;
				grid-area: left;
				display: flex;
				align-items: center;
				justify-self: start;

				z-index: 1000;

				gap: 7px;
			}

			& > .centre {
				grid-area: centre;
				display: flex;
				align-items: center;
				justify-content: center;

				gap: 7px;
			}

			& > .right {
				width: max-content;
				grid-area: right;
				display: flex;
				align-items: center;
				justify-self: end;

				z-index: 1000;

				gap: 28px;

				& > .pill {
					display: flex;
					gap: 0;
					background: var(----colour-background-secondary);
					border-radius: 56px;
					box-shadow: var(----shadow-sm);

					& > .cart {
						margin-right: -7px;
						z-index: 1;
					}

					& > .account {
						margin-left: -7px;
					}
				}
			}
		}
	}

	.menu {
		position: fixed;
		top: 84px;
		width: 400px;
		max-width: 100%;
		height: calc(100% - 84px);

		overflow: auto;

		z-index: 1001;

		background: var(----colour-background-primary);
		border-right: 1px solid var(----colour-background-secondary);
		box-shadow: var(----shadow-sm);
		transform: translateX(0);
		transition: transform 0.5s var(----ease-fast-slow);

		& > .cta {
			position: sticky;
			bottom: 0;
			display: flex;
			flex-direction: column;
			gap: 14px;

			padding: var(----padding);
			box-sizing: border-box;

			background: var(----colour-background-primary);
			border-top: 1px solid var(----colour-background-secondary);
		}
	}

	.menu {
		&.stuff {
			left: 0;
			&:not(.active) {
				transform: translateX(-100%);
			}

			& > .section {
				line-height: 1.5;
				padding: 0 var(----padding);

				box-sizing: border-box;
			}
		}

		&.cart {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 28px;

			right: 0;
			&:not(.active) {
				transform: translateX(100%);
			}

			& > .section {
				padding: var(----padding);
				box-sizing: border-box;

				& > .items {
					display: flex;
					flex-direction: column;
					gap: 14px;

					& > .item {
						display: grid;
						grid-template-areas: 'image details' 'image actions';
						grid-template-columns: 112px 1fr max-content;
						grid-template-rows: 1fr auto;

						gap: 14px;

						& > .image {
							grid-area: image;

							width: 112px;
							height: 100%;
							overflow: hidden;
							overflow: clip;
							border-radius: var(----roundness);

							& > img {
								width: 100%;
								height: 100%;
								object-fit: cover;
							}
						}

						& > .details {
							grid-area: details;

							& > h5 {
								margin-top: 0;
							}
						}

						& > .actions {
							grid-area: actions;
							display: flex;
							gap: 7px;

							& > .quantity {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;
							}
						}
					}
				}
			}

			& > .cta {
				& > .total {
					& > h4 {
						margin-top: 0;
					}
				}
			}
		}

		&.account {
			right: 0;
			&:not(.active) {
				transform: translateX(100%);
			}

			& > .section {
				line-height: 1.5;
				padding: var(----padding);
				box-sizing: border-box;
			}
		}
	}

	.active ~ .overlay {
		opacity: 1;
		pointer-events: all;
	}

	.overlay {
		position: fixed;
		top: 84px;
		left: 0;
		width: 100%;
		height: calc(100% - 84px);
		background: rgba(0, 0, 0, 0.5);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s var(----ease-fast-slow);

		z-index: 1000;
	}
</style>

<script lang="ts">
	import { Button, ButtonVariants } from '@sxxov/sv/button';
	import { Svg } from '@sxxov/sv/svg';
	import { page } from '$app/stores';
	import ic_cg_symbol from '../../assets/brand/logo/cg/symbol.svg';
	import ic_cged_symbol from '../../assets/brand/logo/cged/symbol.svg';
</script>

<div class="logo">
	<a href="/"
		><Button
			{...ButtonVariants.Secondary}
			colourBackground="----colour-background-primary"
			colourBackgroundHover="----colour-background-secondary"
			shadow="----shadow-none"
		>
			<Svg
				width="100%"
				height={42}
				colour={$page.url.pathname.startsWith('/education')
					? '----colour-text-secondary'
					: '----colour-text-primary'}
				svg={ic_cg_symbol}
			/>
		</Button></a
	>
	<p style="color: var(----colour-text-secondary)">/</p>
	<a href="/education"
		><Button
			{...ButtonVariants.Secondary}
			colourBackground="----colour-background-primary"
			colourBackgroundHover="----colour-background-secondary"
			shadow="----shadow-none"
		>
			<Svg
				width="100%"
				height={42}
				colour={$page.url.pathname.startsWith('/education')
					? '----colour-text-primary'
					: '----colour-text-secondary'}
				svg={ic_cged_symbol}
			/>
		</Button></a
	>
</div>

<style lang="postcss">
	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

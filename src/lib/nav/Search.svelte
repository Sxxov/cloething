<script lang="ts">
	import { Button, ButtonVariants } from '@sxxov/sv/button';
	import { Input } from '@sxxov/sv/input';
	import { Svg } from '@sxxov/sv/svg';
	import { ic_arrow_forward, ic_search } from 'maic/two_tone';
	import { catalogue } from './CatalogueSelector.svelte';
	import { page } from '$app/stores';

	let query = '';
	let active = false;

	const setQuery = (v: string) => (query = v);

	$: setQuery($page.url.searchParams.get('query') ?? '');
</script>

<div class="search">
	<form
		action="/search"
		method="get"
	>
		<div class="input">
			<Input
				name="query"
				bind:active
				bind:value={query}
			>
				<div
					class="left"
					slot="left"
				>
					<Svg
						svg={ic_search}
						colour="----colour-text-secondary"
					/>
				</div>

				<div
					class="right"
					slot="right"
					class:active
				>
					<Button
						{...ButtonVariants.FabRegularSecondary}
						type="submit"
						on:mousedown={(e) => {
							e.preventDefault();
						}}
						><Svg
							svg={ic_arrow_forward}
							colour="----colour-text-secondary"
						/></Button
					>
				</div>
			</Input>
		</div>
		<input
			type="hidden"
			name="catalogue"
			value={$catalogue}
		/>
	</form>
</div>

<style lang="postcss">
	.search {
		width: 100%;

		& > form {
			height: calc(112px - 52px);
			display: flex;
			align-items: flex-end;

			& > .input {
				flex-grow: 1;

				& .left {
					padding: 0 16px;
				}

				& .right {
					&:not(.active) {
						display: none;
					}
				}
			}
		}
	}
</style>

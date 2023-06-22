<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="component">
	<div class="content">
		<h1>{$page.status}</h1>
		{#if $page.error}
			<p>{$page.error.message}</p>
		{/if}
	</div>
</div>

<style>
	.component {
		padding: 0 20vw;
		box-sizing: border-box;
		display: grid;
		height: calc(100vh - 84px);
		height: calc(100svh - 84px);
		justify-items: center;
		align-items: center;
	}

	.content {
		text-align: center;
	}

	h1 {
		font-size: 4rem;
		line-height: 2;
	}
</style>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import '../styles/global.scss';

	let Header: any;
	let Footer: any;

	onMount(async () => {
		// Lazy load components
		const headerModule = await import('$lib/components/Header.svelte');
		const footerModule = await import('$lib/components/Footer.svelte');
		Header = headerModule.default;
		Footer = footerModule.default;
	});
</script>

<div class="app">
	{#if Header}
		<svelte:component this={Header} />
	{/if}
	<main transition:fade={{ duration: 300 }}>
		<slot />
	</main>
	{#if Footer}
		<svelte:component this={Footer} />
	{/if}
</div>

<style lang="scss">
  @use '../styles/variables.scss' as *;

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		font-family: $font-primary;
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: $font-heading;
		color: $text-primary;
		margin: 0;
	}

	p {
		color: $text-secondary;
		line-height: $line-height-normal;
		margin: 0;
	}

	a {
		color: $primary-color;
		text-decoration: none;
		transition: color $transition-fast;

		&:hover {
			color: $primary-dark;
		}
	}

	button {
		font-family: $font-primary;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 $spacing-md;
	}
</style>

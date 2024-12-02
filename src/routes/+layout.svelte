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
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		margin-top: clamp(2rem, 4vw, 4rem); // Responsive margin
		padding: clamp(1rem, 2vw, 2rem); // Responsive padding
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		
		@media (max-width: 768px) {
			margin-top: 2rem;
			padding: 1rem;
		}
	}
</style>

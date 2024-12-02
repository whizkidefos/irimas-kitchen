<script lang="ts">
	import { fade } from 'svelte/transition';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../styles/global.scss';
</script>

<div class="app">
	<Header />
	<main transition:fade={{ duration: 300 }}>
		<slot />
	</main>
	<Footer />
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		margin-top: 4rem;
		padding: 2rem;
		// max-width: 1200px;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
	}
</style>

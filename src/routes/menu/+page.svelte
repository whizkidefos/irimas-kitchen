<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Hero from '$lib/components/Hero.svelte';
	import { menuItems } from '$lib/data/menu';
	import SEO from '$lib/components/SEO.svelte';

	interface MenuItem {
		name: string;
		description: string;
		category: string;
	}

	const menuItemsByCategory = menuItems.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [];
		}
		acc[item.category].push(item);
		return acc;
	}, {} as Record<string, typeof menuItems>);

	const categories = [...new Set(menuItems.map((item) => item.category))];
</script>

<SEO 
	title="Menu | Irima's Kitchen - Authentic Nigerian Cuisine"
	description="Explore our diverse menu of authentic Nigerian dishes. From traditional soups and stews to modern fusion dishes, discover the rich flavors of Nigeria."
	keywords="Nigerian menu, African food menu, Nigerian dishes, traditional Nigerian food, African cuisine menu"
/>

<Hero 
	title="Our Menu"
	subtitle="Discover our delicious Nigerian dishes made with love and tradition"
	image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80"
	cta={{ text: "Order Now", link: "/contact" }}
/>

<div class="menu-page bg-secondary" in:fade={{ duration: 500 }}>
	<div class="container">
		<header class="section-title" in:fly={{ y: -20, duration: 600, delay: 200 }}>
			<h1 class="font-heading mb-4">Our Menu</h1>
			<p class="text-secondary font-primary">Experience authentic Nigerian cuisine with a modern twist</p>
		</header>

		{#each categories as category}
			<section class="menu-section" in:fly={{ y: 20, duration: 600, delay: 300 }}>
				<h2 class="font-primary mb-4">{category}</h2>
				<div class="menu-grid">
					{#each menuItemsByCategory[category] as item}
						<div class="card menu-item">
							<div class="menu-item-content">
								<h3 class="font-primary mb-2 item-name">{item.name}</h3>
								<p class="description text-secondary mb-3">{item.description}</p>
								<a href="/contact" class="btn btn-primary">
									<span>Order Now</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<line x1="5" y1="12" x2="19" y2="12"></line>
										<polyline points="12 5 19 12 12 19"></polyline>
									</svg>
								</a>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../styles/variables' as v;

	.menu-page {
		padding: v.$spacing-2xl 0;
	}

	.menu-section {
		margin-bottom: v.$spacing-2xl;
	}

	.menu-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: v.$spacing-lg;
		padding: v.$spacing-md;
	}

	.menu-item {
		background: v.$bg-primary;
		padding: v.$spacing-lg;
		border-radius: v.$border-radius-lg;
		box-shadow: v.$shadow-md;
		transition: transform v.$transition-normal, box-shadow v.$transition-normal;

		&:hover {
			transform: translateY(-2px);
			box-shadow: v.$shadow-lg;
		}

		.item-name {
			font-family: v.$font-heading;
			font-size: v.$font-size-lg;
			margin-bottom: v.$spacing-xs;
			color: v.$text-primary;
		}

		.item-description {
			color: v.$text-secondary;
			font-size: v.$font-size-base;
		}
	}

	@media (max-width: v.$breakpoint-sm) {
		.menu-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

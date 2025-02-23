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
	class="hero"
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
	@use '../../styles/variables' as *;

	.menu-page {
		padding: $spacing-2xl 0;
		min-height: 100vh;
		background-color: $bg-secondary;
	}

	.menu-section {
		margin-bottom: $spacing-2xl;

		h2 {
			position: relative;
			color: $text-primary;
			padding-bottom: $spacing-sm;
			
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 60px;
				height: 3px;
				background-color: $primary-color;
			}
		}
	}

	.menu-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: $spacing-lg;
		margin-top: $spacing-lg;
	}

	.menu-item {
		transition: all 0.3s ease;
		cursor: pointer;

		&:hover {
			color: $primary-color;
			transform: translateY(-2px);
		}

		&.active {
			color: $primary-color;
			font-weight: 600;
		}

		.item-name {
			font-size: $font-size-lg;
			margin-bottom: $spacing-xs;
			transition: color 0.3s ease;

			&:hover {
				color: $primary-color;
			}
		}
	}

	.menu-item-content {
		padding: $spacing-lg;

		h3 {
			color: $text-primary;
			font-size: $font-size-xl;
		}

		.description {
			font-size: $font-size-base;
			min-height: 3rem;
		}

		.btn {
			display: inline-flex;
			align-items: center;
			gap: $spacing-xs;
			background-color: $primary-color;
			color: white;
			padding: $spacing-sm $spacing-md;
			border-radius: 4px;
			text-decoration: none;
			transition: background-color 0.2s ease;
			
			svg {
				transition: transform $transition-fast;
			}

			&:hover {
				background-color: $primary-dark;
				
				svg {
					transform: translateX(4px);
				}
			}
		}
	}

	@media (max-width: $breakpoint-md) {
		.menu-page {
			padding: $spacing-xl 0;
		}

		.menu-grid {
			grid-template-columns: 1fr;
			gap: $spacing-md;
		}

		.menu-item-content {
			padding: $spacing-md;
		}
	}

	.hero {
		margin-bottom: $spacing-2xl;
	}
</style>

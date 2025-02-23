<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Hero from '$lib/components/Hero.svelte';

	interface MenuItem {
		name: string;
		description: string;
		category: string;
	}

	const menuItems: MenuItem[] = [
		{
			name: 'Fried Rice',
			description: 'Classic Nigerian fried rice with mixed vegetables',
			category: 'Rice'
		},
		{
			name: 'Jellof Rice',
			description: 'Signature Nigerian jollof rice cooked in tomato sauce',
			category: 'Rice'
		},
		{
			name: 'Rice & Buka Stew',
			description: 'White rice served with traditional buka stew',
			category: 'Rice'
		},
		{
			name: 'Pasta',
			description: 'Nigerian-style pasta with rich tomato sauce',
			category: 'Main Course'
		},
		{
			name: 'Goat Meat Pepper Soup',
			description: 'Spicy pepper soup with tender goat meat',
			category: 'Soups'
		},
		{
			name: 'Chicken Pepper Soup',
			description: 'Traditional pepper soup with chicken',
			category: 'Soups'
		},
		{
			name: 'Cat Fish Pepper Soup',
			description: 'Spicy catfish pepper soup with herbs',
			category: 'Soups'
		},
		{
			name: 'Asun',
			description: 'Spicy grilled goat meat',
			category: 'Main Course'
		},
		{
			name: 'Peppered Chicken',
			description: 'Grilled chicken with spicy pepper sauce',
			category: 'Main Course'
		},
		{
			name: 'Peppered Meat',
			description: 'Spicy grilled beef',
			category: 'Main Course'
		},
		{
			name: 'Ewa Agoyin',
			description: 'Mashed beans with special pepper sauce',
			category: 'Main Course'
		},
		{
			name: 'Yam & Sauce',
			description: 'Boiled yam with egg sauce',
			category: 'Yam'
		},
		{
			name: 'Yam Porridge',
			description: 'Yam porridge cooked with palm oil and spices',
			category: 'Yam'
		},
		{
			name: 'Chicken & Chips',
			description: 'Fried chicken served with potato chips',
			category: 'Main Course'
		},
		{
			name: 'Salad',
			description: 'Fresh vegetable salad with dressing',
			category: 'Sides'
		},
		{
			name: 'Edikaikong Soup',
			description: 'Rich vegetable soup with assorted meat',
			category: 'Soups'
		},
		{
			name: 'Afang Soup',
			description: 'Traditional soup made with afang leaves',
			category: 'Soups'
		},
		{
			name: 'Banga Soup',
			description: 'Palm nut soup with assorted meat',
			category: 'Soups'
		},
		{
			name: 'Sea Food Okro Soup',
			description: 'Okro soup with mixed seafood',
			category: 'Soups'
		},
		{
			name: 'Egusi Soup',
			description: 'Melon seed soup with vegetables',
			category: 'Soups'
		},
		{
			name: 'White Soup',
			description: 'Traditional white soup with goat meat',
			category: 'Soups'
		},
		{
			name: 'Fried Fish',
			description: 'Crispy fried fish with pepper sauce',
			category: 'Main Course'
		}
	];

	const categories = [...new Set(menuItems.map((item) => item.category))];
</script>

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
					{#each menuItems.filter((item) => item.category === category) as item}
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
	@import '../../styles/variables';

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

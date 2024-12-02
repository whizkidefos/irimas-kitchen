<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	interface MenuItem {
		name: string;
		description: string;
		price: string;
		category: string;
	}

	const menuItems: MenuItem[] = [
		{
			name: 'Jollof Rice Special',
			description: 'Nigerian-style jollof rice with grilled chicken and plantains',
			price: '₦3,500',
			category: 'Main Course'
		},
		{
			name: 'Seafood Okra Soup',
			description: 'Fresh okra soup with assorted seafood and traditional spices',
			price: '₦4,200',
			category: 'Soups'
		},
		{
			name: 'Suya Platter',
			description: 'Spiced grilled beef with onions and tomatoes',
			price: '₦3,800',
			category: 'Appetizers'
		},
		{
			name: 'Egusi Soup',
			description: 'Traditional Nigerian soup made with ground melon seeds and vegetables',
			price: '₦3,000',
			category: 'Soups'
		}
	];

	const categories = [...new Set(menuItems.map((item) => item.category))];
</script>

<div class="menu-page" in:fade={{ duration: 500 }}>
	<header class="menu-header" in:fly={{ y: -20, duration: 600, delay: 200 }}>
		<h1>Our Menu</h1>
		<p>Experience authentic Nigerian cuisine with a modern twist</p>
	</header>

	{#each categories as category}
		<section class="menu-section" in:fly={{ y: 20, duration: 600, delay: 300 }}>
			<h2>{category}</h2>
			<div class="menu-grid">
				{#each menuItems.filter((item) => item.category === category) as item}
					<div class="menu-item">
						<div class="menu-item-header">
							<h3>{item.name}</h3>
							<span class="price">{item.price}</span>
						</div>
						<p>{item.description}</p>
					</div>
				{/each}
			</div>
		</section>
	{/each}
</div>

<style lang="scss">
	.menu-page {
		padding: 2rem 0;
	}

	.menu-header {
		text-align: center;
		margin-bottom: 4rem;

		h1 {
			font-size: 3rem;
			color: var(--secondary-color);
			margin-bottom: 1rem;
		}

		p {
			font-size: 1.2rem;
			color: #666;
		}
	}

	.menu-section {
		margin-bottom: 3rem;

		h2 {
			font-size: 2rem;
			color: var(--primary-color);
			margin-bottom: 2rem;
			padding-bottom: 0.5rem;
			border-bottom: 2px solid var(--primary-color);
		}
	}

	.menu-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.menu-item {
		background: white;
		padding: 1.5rem;
		border-radius: 10px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;

		&:hover {
			transform: translateY(-5px);
		}

		.menu-item-header {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			margin-bottom: 0.5rem;

			h3 {
				font-size: 1.3rem;
				color: var(--secondary-color);
				margin: 0;
			}

			.price {
				font-weight: bold;
				color: var(--primary-color);
			}
		}

		p {
			color: #666;
			margin: 0;
			font-size: 0.95rem;
		}
	}

	@media (max-width: 768px) {
		.menu-header {
			h1 {
				font-size: 2.5rem;
			}
		}

		.menu-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

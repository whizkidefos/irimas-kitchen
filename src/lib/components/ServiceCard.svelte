<script lang="ts">
	import { fly } from 'svelte/transition';

	export let service: {
		title: string;
		description: string;
		image: string;
		features: string[];
	};
	export let index: number;

	const isEven = index % 2 === 0;
</script>

<div
	class="service-card"
	class:reverse={!isEven}
	in:fly={{
		x: isEven ? -50 : 50,
		duration: 800,
		delay: 300 + index * 150
	}}
>
	<div class="image-container">
		<img src={service.image} alt={service.title} />
	</div>
	<div class="content">
		<h2>{service.title}</h2>
		<p class="description">{service.description}</p>
		<div class="features">
			<h3>What we offer:</h3>
			<ul>
				{#each service.features as feature}
					<li>{feature}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="scss">
	.service-card {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		align-items: center;
		background: white;
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;

		&:hover {
			transform: translateY(-5px);
		}

		&.reverse {
			direction: rtl;
			.content {
				direction: ltr;
			}
		}

		.image-container {
			height: 400px;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				transition: transform 0.3s ease;
			}

			&:hover img {
				transform: scale(1.1);
			}
		}

		.content {
			padding: 2rem;

			h2 {
				color: #2c3e50;
				font-size: 2rem;
				margin-bottom: 1rem;
			}

			.description {
				color: #666;
				line-height: 1.6;
				margin-bottom: 1.5rem;
			}

			.features {
				h3 {
					color: #e67e22;
					margin-bottom: 1rem;
				}

				ul {
					list-style: none;
					padding: 0;
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
					gap: 0.5rem;

					li {
						color: #666;
						padding-left: 1.5rem;
						position: relative;

						&::before {
							content: '✓';
							position: absolute;
							left: 0;
							color: #e67e22;
							font-weight: bold;
						}
					}
				}
			}
		}
	}

	@media (max-width: 768px) {
		.service-card {
			grid-template-columns: 1fr;

			&.reverse {
				direction: ltr;
			}

			.image-container {
				height: 300px;
			}

			.content {
				padding: 1.5rem;

				h2 {
					font-size: 1.8rem;
				}
			}
		}
	}
</style>

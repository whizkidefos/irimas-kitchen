<script lang="ts">
	import { fly } from 'svelte/transition';

	export let service: {
		title: string;
		description: string;
		icon: string;
		link: string;
	};
	export let index: number;
</script>

<div
	class="service-preview"
	in:fly={{
		y: 20,
		duration: 600,
		delay: 200 + index * 100
	}}
>
	<div class="icon">{service.icon}</div>
	<h3>{service.title}</h3>
	<p>{service.description}</p>
	<a href={service.link} class="learn-more">Learn More</a>
</div>

<style lang="scss">
	.service-preview {
		background: white;
		padding: 2rem;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		text-align: center;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;

		&:hover {
			transform: translateY(-5px);
			box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
		}

		.icon {
			font-size: 2.5rem;
			margin-bottom: 1rem;
		}

		h3 {
			color: var(--secondary-color);
			margin-bottom: 0.5rem;
			font-family: 'Cormorant Garamond', serif;
		}

		p {
			color: #666;
			margin-bottom: 1.5rem;
			font-family: 'Lato', sans-serif;
		}

		.learn-more {
			color: var(--primary-color);
			text-decoration: none;
			font-weight: 500;
			font-family: 'Lato', sans-serif;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				bottom: -2px;
				left: 0;
				width: 0;
				height: 2px;
				background-color: var(--primary-color);
				transition: width 0.3s ease;
			}

			&:hover::after {
				width: 100%;
			}
		}
	}
</style>

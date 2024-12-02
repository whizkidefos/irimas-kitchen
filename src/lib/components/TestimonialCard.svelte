<script lang="ts">
	import { fly } from 'svelte/transition';

	export let testimonial: {
		name: string;
		role: string;
		content: string;
		image: string;
	};
	export let index: number;
</script>

<div
	class="testimonial-card"
	in:fly={{
		y: 20,
		duration: 600,
		delay: 300 + index * 150
	}}
>
	<div class="quote">❝</div>
	<p class="content">{testimonial.content}</p>
	<div class="author">
		<img src={testimonial.image} alt={testimonial.name} />
		<div class="info">
			<h4>{testimonial.name}</h4>
			<p>{testimonial.role}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.testimonial-card {
		background: white;
		padding: 2rem;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		position: relative;
		transition: transform 0.3s ease;

		&:hover {
			transform: translateY(-5px);
		}

		.quote {
			position: absolute;
			top: 1rem;
			left: 1rem;
			font-size: 4rem;
			color: var(--accent-color);
			opacity: 0.2;
			font-family: 'Playfair Display', serif;
		}

		.content {
			font-style: italic;
			margin-bottom: 1.5rem;
			color: #666;
			position: relative;
			z-index: 1;
		}

		.author {
			display: flex;
			align-items: center;
			gap: 1rem;

			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				object-fit: cover;
			}

			.info {
				h4 {
					margin: 0;
					color: var(--secondary-color);
					font-family: 'Cormorant Garamond', serif;
				}

				p {
					margin: 0;
					font-size: 0.9rem;
					color: #666;
				}
			}
		}
	}
</style>

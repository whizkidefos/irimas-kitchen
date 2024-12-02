<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Hero from '$lib/components/Hero.svelte';
	import ServicePreview from '$lib/components/ServicePreview.svelte';
	import TestimonialCard from '$lib/components/TestimonialCard.svelte';

	const heroData = {
		title: "Welcome to Irima's Kitchen",
		subtitle: 'A State Of The Art Boutique Kitchen & Beachfront Restaurant',
		image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
		cta: { text: 'View Our Menu', link: '/menu' }
	};

	const featuredServices = [
		{
			title: 'Fine Dining',
			description: 'Experience luxury dining with a beachfront view',
			icon: '🍽️',
			link: '/services'
		},
		{
			title: 'Private Chef',
			description: 'Bring our expertise to your special events',
			icon: '👨‍🍳',
			link: '/services'
		},
		{
			title: 'Cooking Classes',
			description: 'Learn the art of Nigerian cuisine',
			icon: '📚',
			link: '/services'
		}
	];

	const testimonials = [
		{
			name: 'Sarah Johnson',
			role: 'Event Planner',
			content: 'The catering service was exceptional. Every detail was perfect!',
			image:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
		},
		{
			name: 'Michael Chen',
			role: 'Food Critic',
			content: 'A true gem in Lagos. The fusion of flavors is outstanding.',
			image:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
		}
	];
</script>

<svelte:head>
	<title>Irima's Kitchen - Boutique Restaurant & Catering</title>
	<meta
		name="description"
		content="Experience fine dining at Lagos' premier beachfront restaurant. Authentic Nigerian cuisine with a modern twist."
	/>
</svelte:head>

<Hero {...heroData} />

<section class="about-preview" in:fade={{ duration: 800, delay: 300 }}>
	<div class="container">
		<div class="content">
			<h2>Our Story</h2>
			<p>
				Founded by Certified Chef Irima in 2019, we started as a humble pop-up shop in Calabar,
				making our mark during the renowned Calabar Carnival. Today, we've grown into a full-service
				beachfront restaurant in Lekki, Lagos, offering an unforgettable dining experience.
			</p>
			<a href="/about" class="btn">Learn More</a>
		</div>
		<div class="image">
			<img
				src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80"
				alt="Chef preparing food"
				loading="lazy"
			/>
		</div>
	</div>
</section>

<section class="services-preview" in:fade={{ duration: 800, delay: 400 }}>
	<div class="container">
		<h2>Our Services</h2>
		<div class="services-grid">
			{#each featuredServices as service, i}
				<ServicePreview {service} index={i} />
			{/each}
		</div>
		<div class="cta">
			<a href="/services" class="btn">View All Services</a>
		</div>
	</div>
</section>

<section class="testimonials" in:fade={{ duration: 800, delay: 500 }}>
	<div class="container">
		<h2>What Our Guests Say</h2>
		<div class="testimonials-grid">
			{#each testimonials as testimonial, i}
				<TestimonialCard {testimonial} index={i} />
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	section {
		padding: 5rem 0;

		h2 {
			text-align: center;
			font-size: 2.5rem;
			color: var(--secondary-color);
			margin-bottom: 3rem;
		}
	}

	.about-preview {
		background-color: white;

		.container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
			align-items: center;

			@media (max-width: 768px) {
				grid-template-columns: 1fr;
				gap: 2rem;
			}
		}

		.content {
			h2 {
				text-align: left;
				margin-bottom: 1.5rem;
			}

			p {
				margin-bottom: 2rem;
				font-size: 1.1rem;
				line-height: 1.8;
				color: #666;
			}
		}

		.image {
			img {
				border-radius: 10px;
				box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
			}
		}
	}

	.services-preview {
		background-color: #f8f9fa;

		.services-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			gap: 2rem;
			margin-bottom: 3rem;
		}

		.cta {
			text-align: center;
		}
	}

	.testimonials {
		background-color: white;

		.testimonials-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			gap: 2rem;
		}
	}
</style>

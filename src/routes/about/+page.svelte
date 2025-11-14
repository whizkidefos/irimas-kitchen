<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Hero from '$lib/components/Hero.svelte';
	import Seo from '$lib/components/SEO.svelte';

	const heroData = {
		title: "About Irima's Kitchen",
		subtitle: 'Our Journey Since 2019',
		image: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80',
		customClass: 'hero'
	};
</script>

<Seo
	title="About Us | Irima's Kitchen - Learn More about Our Story"
	description="Get to know more about Irima's Kitchen, our story, and our commitment to serving authentic Nigerian food."
	keywords="about us, Irima's Kitchen, food, restaurant, authentic, Nigerian"
/>

<Hero {...heroData} />

<div class="about-content" in:fade={{ duration: 800, delay: 300 }}>
	<section class="story" in:fly={{ y: 20, duration: 600, delay: 400 }}>
		<h2>Our Story</h2>
		<p>
			Founded by Certified Chef Irima in 2019, Irima's Kitchen started as a food pop-up shop in
			Calabar, Cross River State. Our first breakthrough came during the Popular Calabar Carnival,
			held every December, where we established our first central pop-up location.
		</p>
		<p>
			Today, we've grown into a full-service beachfront restaurant in Lekki, Lagos, offering an
			unforgettable dining experience with a perfect blend of traditional and contemporary Nigerian
			cuisine.
		</p>
	</section>

	<section class="values" in:fly={{ y: 20, duration: 600, delay: 600 }}>
		<h2>Our Values</h2>
		<div class="values-grid">
			<div class="value-card">
				<h3>Quality</h3>
				<p>We use only the finest, freshest ingredients in all our dishes.</p>
			</div>
			<div class="value-card">
				<h3>Tradition</h3>
				<p>Preserving authentic Nigerian flavors while adding modern twists.</p>
			</div>
			<div class="value-card">
				<h3>Service</h3>
				<p>Providing exceptional dining experiences for every guest.</p>
			</div>
			<div class="value-card">
				<h3>Community</h3>
				<p>Supporting local farmers and businesses in our supply chain.</p>
			</div>
		</div>
	</section>
</div>

<style lang="scss">
  @use '../../styles/variables' as *;

  .about-content {
		max-width: 800px;
		margin: 4rem auto;
		padding: 0 1rem;

		section {
			margin-bottom: 4rem;
		}

		h2 {
			color: #2c3e50;
			font-size: 2rem;
			margin-bottom: 1.5rem;
			text-align: center;
		}

		.story {
			p {
				color: #666;
				line-height: 1.8;
				margin-bottom: 1.5rem;
			}
		}

		.values-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 2rem;
			margin-top: 2rem;

			.value-card {
				background: white;
				padding: 2rem;
				border-radius: 10px;
				box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
				text-align: center;
				transition: transform 0.3s ease;

				&:hover {
					transform: translateY(-5px);
				}

				h3 {
					color: #e67e22;
					margin-bottom: 1rem;
				}

				p {
					color: #666;
				}
			}
		}
	}

	@media (max-width: 768px) {
		.about-content {
			margin: 2rem auto;

			h2 {
				font-size: 1.8rem;
			}
		}
	}
</style>

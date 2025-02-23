<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Hero from '$lib/components/Hero.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import Seo from '$lib/components/SEO.svelte';

	const heroData = {
		title: 'Our Services',
		subtitle: 'Experience Excellence in Every Detail',
		image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80'
	};

	const services = [
		{
			title: 'Fine Dining Experience',
			description:
				'Immerse yourself in our beachfront restaurant atmosphere with stunning views of the Lagos coastline. Enjoy our carefully curated menu featuring both traditional Nigerian cuisine and contemporary fusion dishes.',
			image:
				'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80',
			features: [
				'Scenic beach views',
				'Indoor & outdoor seating',
				'Private dining areas',
				'Live music on weekends'
			]
		},
		{
			title: 'Premium Take Out',
			description:
				'Enjoy our delicious meals in the comfort of your home or office. We ensure your takeaway orders are packaged with care to maintain the quality and temperature of your food.',
			image:
				'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80',
			features: [
				'Easy online ordering',
				'Eco-friendly packaging',
				'Special packaging for soups',
				'Corporate order discounts'
			]
		},
		{
			title: 'Private Chef Service',
			description:
				"Bring the Irima's Kitchen experience to your location with our professional chef service. Perfect for private events, celebrations, or intimate dining experiences.",
			image:
				'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80',
			features: [
				'Customized menu planning',
				'Professional service staff',
				'Equipment provided',
				'Dietary accommodations'
			]
		},
		{
			title: 'Event Catering',
			description:
				'From corporate events to weddings, our catering service provides a full-range dining experience for your special occasions. We handle everything from setup to cleanup.',
			image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80',
			features: [
				'Full event planning',
				'Custom menu creation',
				'Staff & equipment',
				'Setup & cleanup'
			]
		},
		{
			title: 'Cooking Classes',
			description:
				'Learn the art of Nigerian cuisine from our expert chefs. Perfect for individuals or groups wanting to master traditional cooking techniques.',
			image:
				'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&q=80',
			features: [
				'Hands-on instruction',
				'Traditional techniques',
				'Recipe booklets',
				'Wine pairing lessons'
			]
		},
		{
			title: 'Food Consultation',
			description:
				'Get expert advice on menu planning, kitchen setup, and restaurant operations. Ideal for businesses and aspiring restaurateurs.',
			image:
				'https://images.unsplash.com/photo-1582192730841-2a682d7375f9?auto=format&fit=crop&q=80',
			features: ['Menu development', 'Kitchen optimization', 'Staff training', 'Business planning']
		}
	];
</script>

<Seo
	title="Services | Irima's Kitchen - Expert Services"
	description="Discover our range of services, from catering to cooking classes, and learn how we can enhance your dining experience."
	keywords="services, catering, cooking classes, restaurant, food, expert, professional"
	canonicalUrl="https://irimas-kitchen.vercel.app/services"
	ogImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80"
/>

<Hero {...heroData} />

<div class="services-container" in:fade={{ duration: 800, delay: 300 }}>
	{#each services as service, i}
		<ServiceCard {service} index={i} />
	{/each}
</div>

<style lang="scss">
    @use '../../styles/variables' as *;
	.services-container {
		max-width: 1200px;
		margin: 4rem auto;
		padding: 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}
</style>

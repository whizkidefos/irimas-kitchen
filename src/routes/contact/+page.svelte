<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Hero from '$lib/components/Hero.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';

	const heroData = {
		title: 'Contact Us',
		subtitle: "Get in Touch with Irima's Kitchen",
		image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80'
	};

	const contactInfo = [
		{
			icon: '📍',
			title: 'Location',
			details: ['Lekki Lagos, Nigeria']
		},
		{
			icon: '🕒',
			title: 'Hours',
			details: ['Monday - Saturday', '9:00 AM - 6:00 PM']
		},
		{
			icon: '📞',
			title: 'Contact',
			details: ['Special services available', 'after hours at extra cost']
		}
	];
</script>

<Hero {...heroData} />

<div class="contact-container" in:fade={{ duration: 800, delay: 300 }}>
	<div class="contact-info" in:fly={{ x: -50, duration: 800, delay: 400 }}>
		{#each contactInfo as info}
			<div class="info-card">
				<span class="icon">{info.icon}</span>
				<h3>{info.title}</h3>
				{#each info.details as detail}
					<p>{detail}</p>
				{/each}
			</div>
		{/each}
	</div>

	<div class="form-section" in:fly={{ x: 50, duration: 800, delay: 500 }}>
		<h2>Send us a Message</h2>
		<ContactForm />
	</div>
</div>

<style lang="scss">
	.contact-container {
		max-width: 1200px;
		margin: 4rem auto;
		padding: 0 1rem;
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 3rem;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		.info-card {
			background: white;
			padding: 1.5rem;
			border-radius: 10px;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
			transition: transform 0.3s ease;

			&:hover {
				transform: translateY(-5px);
			}

			.icon {
				font-size: 2rem;
				margin-bottom: 1rem;
				display: inline-block;
			}

			h3 {
				color: #2c3e50;
				margin-bottom: 0.5rem;
			}

			p {
				color: #666;
				margin: 0;
			}
		}
	}

	.form-section {
		background: white;
		padding: 2rem;
		border-radius: 15px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

		h2 {
			color: #2c3e50;
			margin-bottom: 2rem;
			text-align: center;
		}
	}

	@media (max-width: 768px) {
		.contact-container {
			grid-template-columns: 1fr;
		}
	}
</style>

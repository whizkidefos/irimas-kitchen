<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Hero from '$lib/components/Hero.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';

	const heroData = {
		title: 'Contact Us',
		subtitle: "Get in Touch with Irima's Kitchen",
		image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80',
		cta: { text: 'Place an Order', link: '#order-form' }
	};

	const contactInfo = [
		{
			icon: '📍',
			title: 'Location',
			details: ['Lekki Lagos, Nigeria'],
			link: 'https://maps.google.com'
		},
		{
			icon: '🕒',
			title: 'Hours',
			details: ['Monday - Saturday', '9:00 AM - 6:00 PM'],
			subtext: 'Special hours available for events'
		},
		{
			icon: '📞',
			title: 'Contact',
			details: ['Special services available', 'after hours at extra cost'],
			subtext: 'Catering & Events Welcome'
		},
		{
			icon: '🚚',
			title: 'Delivery',
			details: ['Available within Lekki', 'Same-day delivery available'],
			subtext: 'Free delivery on orders above ₦10,000'
		}
	];

	const faqs = [
		{
			question: 'Do you offer catering services?',
			answer: 'Yes, we offer full-service catering for events of all sizes. Contact us for a custom quote.'
		},
		{
			question: 'What is your delivery radius?',
			answer: 'We currently deliver within the Lekki area. Delivery to other areas can be arranged for large orders.'
		},
		{
			question: 'Can I customize my order?',
			answer: 'Absolutely! We can accommodate special requests and dietary requirements. Just let us know in the order form.'
		},
		{
			question: 'How far in advance should I place my order?',
			answer: 'For regular orders, 2-3 hours notice is appreciated. For catering and large orders, please give us 24-48 hours notice.'
		}
	];
</script>

<Hero {...heroData} />

<div class="contact-page" in:fade={{ duration: 800, delay: 300 }}>
	<div class="contact-container">
		<div class="contact-info" in:fly={{ x: -50, duration: 800, delay: 400 }}>
			{#each contactInfo as info}
				<div class="info-card">
					<span class="icon">{info.icon}</span>
					<h3>{info.title}</h3>
					<div class="details">
						{#each info.details as detail}
							<p>{detail}</p>
						{/each}
						{#if info.subtext}
							<p class="subtext">{info.subtext}</p>
						{/if}
						{#if info.link}
							<a href={info.link} target="_blank" rel="noopener noreferrer">View Map →</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<div class="form-section" in:fly={{ x: 50, duration: 800, delay: 500 }} id="order-form">
			<h2>Send us a Message</h2>
			<p class="form-intro">Whether you're placing an order or just saying hello, we'd love to hear from you!</p>
			<ContactForm />
		</div>
	</div>

	<div class="faq-section" in:fade={{ duration: 800, delay: 600 }}>
		<h2>Frequently Asked Questions</h2>
		<div class="faq-grid">
			{#each faqs as faq}
				<div class="faq-card" in:fly={{ y: 20, duration: 800 }}>
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../styles/variables';

	.contact-page {
		background-color: $bg-secondary;
		padding: $spacing-2xl 0;
	}

	.contact-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 $spacing-lg;
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: $spacing-2xl;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: $spacing-lg;

		.info-card {
			background: $bg-primary;
			padding: $spacing-lg;
			border-radius: $border-radius-lg;
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
			transition: transform 0.3s ease, box-shadow 0.3s ease;

			&:hover {
				transform: translateY(-5px);
				box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
			}

			.icon {
				font-size: $font-size-3xl;
				margin-bottom: $spacing-md;
				display: inline-block;
			}

			h3 {
				color: $primary-color;
				margin-bottom: $spacing-sm;
				font-size: $font-size-xl;
				font-weight: 600;
			}

			.details {
				p {
					color: $text-primary;
					margin: 0;
					line-height: 1.6;

					&.subtext {
						color: $text-secondary;
						font-size: $font-size-sm;
						margin-top: $spacing-sm;
						font-style: italic;
					}
				}

				a {
					display: inline-block;
					margin-top: $spacing-sm;
					color: $primary-color;
					text-decoration: none;
					font-weight: 500;
					transition: color 0.2s ease;

					&:hover {
						color: $primary-dark;
					}
				}
			}
		}
	}

	.form-section {
		background: $bg-primary;
		padding: $spacing-2xl;
		border-radius: $border-radius-lg;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

		h2 {
			color: $text-primary;
			margin-bottom: $spacing-xs;
			font-size: $font-size-2xl;
			font-weight: 700;
		}

		.form-intro {
			color: $text-secondary;
			margin-bottom: $spacing-xl;
			font-size: $font-size-lg;
		}
	}

	.faq-section {
		max-width: 1200px;
		margin: $spacing-3xl auto 0;
		padding: 0 $spacing-lg;

		h2 {
			color: $text-primary;
			margin-bottom: $spacing-2xl;
			font-size: $font-size-2xl;
			font-weight: 700;
			text-align: center;
		}

		.faq-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
			gap: $spacing-lg;
		}

		.faq-card {
			background: $bg-primary;
			padding: $spacing-lg;
			border-radius: $border-radius-lg;
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

			h3 {
				color: $primary-color;
				margin-bottom: $spacing-sm;
				font-size: $font-size-lg;
				font-weight: 600;
			}

			p {
				color: $text-secondary;
				line-height: 1.6;
				margin: 0;
			}
		}
	}

	@media (max-width: $breakpoint-md) {
		.contact-container {
			grid-template-columns: 1fr;
			gap: $spacing-xl;
		}

		.faq-section {
			.faq-grid {
				grid-template-columns: 1fr;
			}
		}

		.form-section {
			padding: $spacing-xl;
		}
	}
</style>

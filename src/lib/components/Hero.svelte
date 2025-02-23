<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import { flyUp } from '$lib/utils/animations';
	
	export let title: string;
	export let subtitle: string;
	export let image: string;
	export let cta = { text: '', link: '' };
	export let customClass: string;
  
	let heroElement: HTMLElement;
	let contentElement: HTMLElement;
	let imageElement: HTMLElement;
</script>
  
<div class="hero {customClass}" bind:this={heroElement}>
	<div 
	  class="hero-background" 
	  bind:this={imageElement}
	  style="background-image: url({image});"
	></div>
	
	<div class="overlay"></div>
	
	<div class="hero-content" bind:this={contentElement}>
	  <div class="content-wrapper">
		<Typewriter interval={50} cascade>
		  <h1>{title}</h1>
		</Typewriter>
		
		<p transition:flyUp={{ y: 30, duration: 800, delay: 500 }}>
		  {subtitle}
		</p>
		
		{#if cta.text}
		  <div class="cta-wrapper" transition:flyUp={{ y: 30, duration: 800, delay: 1000 }}>
			<a href={cta.link} class="cta-button">
			  {cta.text}
			  <span class="arrow">→</span>
			</a>
		  </div>
		{/if}
	  </div>
	</div>
</div>
  
<style lang="scss">
	@use '../../styles/variables';

	.hero {
	  height: 100vh;
	  position: relative;
	  overflow: hidden;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  margin: -4rem -2rem 0;
  
	  .hero-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 120%;
		background-size: cover;
		background-position: center;
	  }
  
	  .overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
		  to bottom,
		  rgba(0, 0, 0, 0.6),
		  rgba(0, 0, 0, 0.8)
		);
	  }
  
	  .hero-content {
		position: relative;
		z-index: 2;
		color: white;
		text-align: center;
		max-width: 800px;
		padding: 0 2rem;
  
		.content-wrapper {
		  opacity: 0;
		  animation: fadeIn 1s ease forwards;
		  animation-delay: 0.5s;
		}
  
		h1 {
		  font-size: clamp(2.5rem, 8vw, 5rem);
		  margin-bottom: 1.5rem;
		  font-weight: 700;
		  line-height: 1.1;
		  color: $primary-color;
		  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
		}
  
		p {
		  font-size: clamp(1.1rem, 3vw, 1.5rem);
		  margin-bottom: 2rem;
		  line-height: 1.6;
		  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
		}
  
		.cta-wrapper {
		  .cta-button {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			padding: 1rem 2rem;
			background-color: var(--primary-color);
			color: white;
			text-decoration: none;
			border-radius: var(--border-radius);
			font-weight: 500;
			letter-spacing: 1px;
			text-transform: uppercase;
			transition: all 0.3s ease;
  
			.arrow {
			  transition: transform 0.3s ease;
			}
  
			&:hover {
			  background-color: $primary-dark;
			  transform: translateY(-2px);
  
			  .arrow {
				transform: translateX(5px);
			  }
			}
		  }
		}
	  }
	}
  
	@keyframes fadeIn {
	  from {
		opacity: 0;
		transform: translateY(20px);
	  }
	  to {
		opacity: 1;
		transform: translateY(0);
	  }
	}
  
	@media (max-width: 768px) {
	  .hero {
		height: 90vh;
		margin: -4rem -1rem 0;
  
		.hero-content {
		  padding: 0 1rem;
		}
	  }
	}
</style>
<script lang="ts">
	import { page } from '$app/stores';
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
  
	let isMenuOpen = false;
	let isScrolled = false;
  
	const navItems = [
	  { path: '/', label: 'Home' },
	  { path: '/menu', label: 'Menu' },
	  { path: '/services', label: 'Services' },
	  { path: '/about', label: 'About' },
	  { path: '/contact', label: 'Contact' }
	];
  
	onMount(() => {
	  const handleScroll = () => {
		isScrolled = window.scrollY > 50;
	  };
	  window.addEventListener('scroll', handleScroll);
	  return () => window.removeEventListener('scroll', handleScroll);
	});
  
	function toggleMenu() {
	  isMenuOpen = !isMenuOpen;
	}
  
	function closeMenu() {
	  isMenuOpen = false;
	}
  </script>
  
  <header class:scrolled={isScrolled}>
	<nav>
	  <div class="logo">
		<a href="/" on:click={closeMenu}>
			<img src="/logo.svg" alt="Irima's Kitchen Logo" />
			<span class="font-primary">Irima's <span class="kitchen">Kitchen</span></span>
		</a>
	  </div>
  
	  <button 
		class="menu-toggle" 
		on:click={toggleMenu} 
		aria-label="Toggle menu"
		class:open={isMenuOpen}
	  >
		<span></span>
		<span></span>
		<span></span>
	  </button>
  
	  <div class="nav-links" class:open={isMenuOpen}>
		{#if isMenuOpen}
		  <!-- svelte-ignore a11y_click_events_have_key_events -->
		  <div 
			class="overlay" 
			on:click={closeMenu} 
			transition:fade={{ duration: 200 }}
		  ></div>
		{/if}
  
		<ul class:visible={isMenuOpen}>
		  {#each navItems as { path, label }}
			<li>
			  <a 
				href={path} 
				class:active={$page.url.pathname === path}
				on:click={closeMenu}
			  >
				{label}
			  </a>
			</li>
		  {/each}
		</ul>
	  </div>
	</nav>
  </header>
  
  <style lang="scss">
	header {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  z-index: 1000;
	  background: rgba(255, 255, 255, 0.95);
	  backdrop-filter: blur(10px);
	  transition: all 0.3s ease;
  
	  &.scrolled {
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	  }
	}
  
	nav {
	  max-width: 1400px;
	  margin: 0 auto;
	  padding: 1rem 2rem;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  position: relative;
	}
  
	.logo {
		a {
			display: flex;
			align-items: center;
			gap: $spacing-sm;
			text-decoration: none;
			color: $text-primary;
			font-size: $font-size-xl;
			font-weight: 700;
			font-family: 'Lato', sans-serif;

			img {
				width: 32px;
				height: 32px;
				object-fit: contain;
			}

			.kitchen {
				color: $primary-color;
			}
		}
	}
  
	.nav-links {
	  ul {
		display: flex;
		gap: 2.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
  
		a {
		  font-family: 'Lato', sans-serif;
		  color: var(--text-color);
		  text-decoration: none;
		  font-weight: 500;
		  font-size: 1rem;
		  text-transform: uppercase;
		  letter-spacing: 1px;
		  position: relative;
		  padding: 0.5rem 0;
  
		  &::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 0;
			height: 2px;
			background-color: var(--primary-color);
			transition: width 0.3s ease;
		  }
  
		  &:hover::after,
		  &.active::after {
			width: 100%;
		  }
  
		  &.active {
			color: var(--primary-color);
		  }
		}
	  }
	}
  
	.menu-toggle {
	  display: none;
	  background: none;
	  border: none;
	  cursor: pointer;
	  width: 30px;
	  height: 24px;
	  position: relative;
	  z-index: 1001;
	  padding: 0;
  
	  span {
		display: block;
		width: 100%;
		height: 2px;
		background-color: var(--text-color);
		position: absolute;
		left: 0;
		transition: all 0.3s ease;
  
		&:first-child {
		  top: 0;
		}
  
		&:nth-child(2) {
		  top: 50%;
		  transform: translateY(-50%);
		}
  
		&:last-child {
		  bottom: 0;
		}
	  }
  
	  &.open {
		span {
		  &:first-child {
			transform: rotate(45deg);
			top: 50%;
			margin-top: -1px;
		  }
  
		  &:nth-child(2) {
			opacity: 0;
		  }
  
		  &:last-child {
			transform: rotate(-45deg);
			bottom: 50%;
			margin-bottom: -1px;
		  }
		}
	  }
	}
  
	@media (max-width: 768px) {
	  .menu-toggle {
		display: block;
	  }
  
	  .nav-links {
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		width: 100%;
		pointer-events: none;
  
		&.open {
		  pointer-events: auto;
		}
  
		.overlay {
		  position: fixed;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  background: rgba(0, 0, 0, 0.5);
		  z-index: 1;
		}
  
		ul {
		  position: fixed;
		  top: 0;
		  right: -300px;
		  width: 300px;
		  height: 100vh;
		  background: white;
		  flex-direction: column;
		  padding: 6rem 2rem 2rem;
		  margin: 0;
		  z-index: 2;
		  transition: right 0.3s ease;
		  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  
		  &.visible {
			right: 0;
		  }
  
		  li {
			opacity: 0;
			transform: translateX(20px);
			transition: all 0.3s ease;
			transition-delay: calc(var(--i) * 0.1s);
		  }
		}
	  }
  
	  .nav-links.open ul li {
		opacity: 1;
		transform: translateX(0);
	  }
	}
  </style>
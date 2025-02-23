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
		{#each navItems as { path, label }}
		  <a
			href={path}
			on:click={closeMenu}
			aria-current={$page.url.pathname === path ? 'page' : undefined}
		  >
			{label}
		  </a>
		{/each}
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
	  background-color: $bg-primary;
	  transition: all 0.3s ease;
	  
	  &.scrolled {
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	  }
	}
  
	nav {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  max-width: 1200px;
	  margin: 0 auto;
	  padding: $spacing-md $spacing-lg;
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
  
	.menu-toggle {
		display: none;
		flex-direction: column;
		justify-content: space-between;
		width: 30px;
		height: 20px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 10;

		span {
			width: 100%;
			height: 2px;
			background-color: $primary-color;
			transition: all 0.3s ease-in-out;
		}

		&.open {
			span {
				&:first-child {
					transform: translateY(9px) rotate(45deg);
				}

				&:nth-child(2) {
					opacity: 0;
				}

				&:last-child {
					transform: translateY(-9px) rotate(-45deg);
				}
			}
		}
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: $spacing-xl;

		a {
			color: $text-primary;
			text-decoration: none;
			font-weight: 500;
			font-size: $font-size-base;
			padding: $spacing-xs $spacing-sm;
			border-radius: $border-radius-sm;
			transition: all 0.3s ease;
			text-transform: uppercase;
			letter-spacing: 0.5px;

			&:hover {
				color: $primary-color;
			}

			&[aria-current="page"] {
				color: $primary-color;
				font-weight: 600;
				position: relative;

				&::after {
					content: '';
					position: absolute;
					bottom: -2px;
					left: 50%;
					transform: translateX(-50%);
					width: 24px;
					height: 2px;
					background-color: $primary-color;
					border-radius: $border-radius-full;
				}
			}
		}
	}

	@media (max-width: $breakpoint-md) {
		nav {
			padding: $spacing-sm $spacing-md;
		}

		.menu-toggle {
			display: flex;
		}

		.nav-links {
			display: none;
			position: fixed;
			top: 0;
			right: 0;
			height: 100vh;
			width: 250px;
			background-color: $bg-primary;
			padding: 80px $spacing-lg $spacing-lg;
			flex-direction: column;
			align-items: flex-start;
			gap: $spacing-md;
			box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
			transition: transform 0.3s ease;

			&.open {
				display: flex;
				animation: slideIn 0.3s ease forwards;
			}

			a {
				font-size: $font-size-lg;
				padding: $spacing-sm;
				width: 100%;
				text-align: left;

				&[aria-current="page"] {
					background-color: $bg-accent;
					
					&::after {
						display: none;
					}
				}

				&:hover {
					background-color: $bg-secondary;
				}
			}
		}
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}
</style>
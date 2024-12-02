import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

interface FlyParams {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
}

export const fadeIn = {
  duration: 800,
  delay: 300
};

export function flyUp(
  node: Element,
  params: FlyParams = { y: 50, duration: 800, delay: 0 }
): TransitionConfig {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;

  return {
    delay: params.delay,
    duration: params.duration || 800,
    easing: cubicOut,
    css: (t, u) => `
      transform: ${transform} translate(${(params.x || 0) * u}px, ${(params.y || 0) * u}px);
      opacity: ${t}
    `
  };
}

export const parallaxScroll = (node: HTMLElement, speed: number = 0.5): { destroy(): void } => {
  let initialOffset = 0;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxOffset = scrolled * speed;
    node.style.transform = `translateY(${parallaxOffset}px)`;
  }

  window.addEventListener('scroll', updateParallax);
  updateParallax();

  return {
    destroy() {
      window.removeEventListener('scroll', updateParallax);
    }
  };
};

export const revealOnScroll = (node: HTMLElement, threshold: number = 0.1): { destroy(): void } => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add('revealed');
          observer.unobserve(node);
        }
      });
    },
    { threshold }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
};
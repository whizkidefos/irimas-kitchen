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

export const flyUp = (node: HTMLElement, params: FlyParams = {}): TransitionConfig => {
  const { 
    y = 30, 
    duration = 800, 
    delay = 500 
  } = params;

  return {
    delay,
    duration,
    css: (t) => {
      const eased = cubicOut(t);
      return `
        transform: translateY(${(1 - eased) * y}px);
        opacity: ${eased};
      `;
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
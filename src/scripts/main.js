// src/scripts/main.js

import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';

Alpine.plugin(intersect);

Alpine.data('statsAnimation', () => ({
  animate(element) {
    const statElements = element.querySelectorAll('[data-value]');

    statElements.forEach(statEl => {
      const target = parseInt(statEl.dataset.value, 10);
      const prefix = statEl.dataset.prefix || '';
      const unit = statEl.dataset.unit || '';

      const duration = 1200;

      const startTime = Date.now();

      const counterInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const currentValue = Math.floor(progress * target);
        
        statEl.innerText = `${prefix}${currentValue}${unit}`;
        
        if (progress >= 1) {
          clearInterval(counterInterval);
        }
      }, 16);
    });
  }
}));

Alpine.data('header', () => ({
  scrolled: false,
  isMobile: false,

  handleScroll() {
    this.scrolled = window.scrollY > 50;
  },

  handleResize() {
    this.isMobile = window.innerWidth < 640;
  },

  init() {
    this.handleResize();
    this.handleScroll();

    this.boundHandleScroll = this.handleScroll.bind(this);
    this.boundHandleResize = this.handleResize.bind(this);
    
    window.addEventListener('scroll', this.boundHandleScroll);
    window.addEventListener('resize', this.boundHandleResize);
  },

  destroy() {
    window.removeEventListener('scroll', this.boundHandleScroll);
    window.removeEventListener('resize', this.boundHandleResize);
  }
}));

window.Alpine = Alpine;
// Alpine.start();

import { animate, AnimationOptions, motion, MotionProps, PanInfo } from 'framer-motion';

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3 }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const bloomAnimation = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    filter: 'blur(10px)',
    boxShadow: '0 0 0 rgba(99, 102, 241, 0)'
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    filter: 'blur(5px)',
    boxShadow: '0 0 0 rgba(99, 102, 241, 0)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const cardHoverAnimation = {
  whileHover: { 
    y: -5, 
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.2 }
  },
  whileTap: { 
    y: 0, 
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    transition: { duration: 0.2 }
  }
};

export const counterAnimation = (
  from: number, 
  to: number, 
  formatter: (value: number) => string = (value) => Math.round(value).toString(),
  duration: number = 1
) => {
  const controls = { value: from };
  
  const updateTextValue = (value: number, element: HTMLElement) => {
    if (element) {
      element.textContent = formatter(value);
    }
  };
  
  return (element: HTMLElement) => {
    if (!element) return;
    
    updateTextValue(from, element);
    
    animate(controls, { value: to }, {
      duration,
      onUpdate: (latest) => {
        updateTextValue(latest.value, element);
      },
      ease: 'easeOut'
    });
  };
};

export const createParticles = (
  parentElement: HTMLElement, 
  count: number = 10,
  colors: string[] = ['#6366F1', '#8B5CF6', '#EC4899']
) => {
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 8 + 4; // Random size between 4 and 12px
    const particle = document.createElement('div');
    
    particle.classList.add('bloom-particle');
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const distance = 30 + Math.random() * 60; // Random distance between 30 and 90px
    
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    
    // Random position within the parent element
    const rect = parentElement.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    particle.style.animation = `particle-fade ${0.6 + Math.random() * 0.4}s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
    
    parentElement.appendChild(particle);
    particles.push(particle);
  }
  
  // Remove particles after animation completes
  setTimeout(() => {
    particles.forEach(particle => {
      if (parentElement.contains(particle)) {
        parentElement.removeChild(particle);
      }
    });
  }, 1000);
};

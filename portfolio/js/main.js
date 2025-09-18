// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Throttle function for performance
const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// ===== NAVBAR FUNCTIONALITY =====
class NavbarController {
  constructor() {
    this.navbar = $('#navbar');
    this.navToggle = $('#nav-toggle');
    this.navMenu = $('#nav-menu');
    this.navLinks = $$('.nav-link');
    this.sections = $$('section');
    
    this.init();
  }
  
  init() {
    this.handleScroll();
    this.handleNavToggle();
    this.handleSmoothScrolling();
    this.handleActiveSection();
    
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
    window.addEventListener('scroll', throttle(() => this.handleActiveSection(), 100));
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 80) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }
  
  handleNavToggle() {
    this.navToggle.addEventListener('click', () => {
      this.navToggle.classList.toggle('active');
      this.navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
      });
    });
  }
  
  handleSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = $(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  handleActiveSection() {
    const scrollY = window.scrollY + 100;
    
    this.sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = $(`[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }
}

// ===== PARTICLES BACKGROUND =====
class ParticlesCanvas {
  constructor(canvasId) {
    this.canvas = $(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    
    this.init();
  }
  
  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }
  
  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }
  
  createParticles() {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.particles = [];
      this.createParticles();
    });
    
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary check
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        particle.x -= dx * 0.01;
        particle.y -= dy * 0.01;
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(79, 70, 229, ${particle.opacity})`;
      this.ctx.fill();
      
      // Draw connections
      this.particles.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(otherParticle.x, otherParticle.y);
            this.ctx.strokeStyle = `rgba(79, 70, 229, ${0.1 * (1 - distance / 100)})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
          }
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ===== TYPEWRITER EFFECT =====
class TypewriterEffect {
  constructor(elementId, texts, speed = 100) {
    this.element = $(elementId);
    if (!this.element) return;
    
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    
    this.init();
  }
  
  init() {
    setTimeout(() => this.type(), 1000);
  }
  
  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    
    let typeSpeed = this.speed;
    
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    
    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    this.init();
  }
  
  init() {
    // Observe elements for animation
    const animatedElements = $$('[data-animation]');
    animatedElements.forEach(el => this.observer.observe(el));
    
    // Observe sections for general animations
    const sections = $$('.about, .skills, .projects, .contact');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      this.observer.observe(section);
    });
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Handle specific animations
        const animation = element.getAttribute('data-animation');
        if (animation) {
          element.classList.add(animation);
        } else {
          // Default fade in animation
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        // Handle skills animation
        if (element.classList.contains('skills')) {
          this.animateSkills();
        }
        
        // Handle stats animation
        if (element.classList.contains('about')) {
          this.animateCounters();
        }
        
        this.observer.unobserve(element);
      }
    });
  }
  
  animateSkills() {
    const skillBars = $$('.skill-progress');
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = `${width}%`;
      }, 300);
    });
  }
  
  animateCounters() {
    const counters = $$('[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      let current = 0;
      const increment = target / 50;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      setTimeout(updateCounter, 500);
    });
  }
}

// ===== PROJECT FILTER =====
class ProjectFilter {
  constructor() {
    this.filterBtns = $$('.filter-btn');
    this.projectCards = $$('.project-card');
    
    this.init();
  }
  
  init() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        this.filterProjects(filter);
        this.updateActiveButton(btn);
      });
    });
  }
  
  filterProjects(filter) {
    this.projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.6s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  updateActiveButton(activeBtn) {
    this.filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }
}

// ===== CONTACT FORM HANDLER =====
class ContactForm {
  constructor(formId) {
    this.form = $(formId);
    if (!this.form) return;
    
    this.init();
  }
  
  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
    
    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }
  
  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    const errorElement = field.parentElement.querySelector('.form-error');
    
    let isValid = true;
    let errorMessage = '';
    
    if (!value) {
      isValid = false;
      errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    } else if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    } else if (fieldName === 'message' && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters long';
    }
    
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = isValid ? 'none' : 'block';
    }
    
    field.style.borderColor = isValid ? 'rgba(79, 70, 229, 0.3)' : '#ef4444';
    
    return isValid;
  }
  
  clearError(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
    field.style.borderColor = 'rgba(79, 70, 229, 0.3)';
  }
  
  async handleSubmit() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    const inputs = this.form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      this.showNotification('Please fix the errors before submitting', 'error');
      return;
    }
    
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
      // Simulate API call (replace with actual form handling)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      this.form.reset();
      
    } catch (error) {
      // Error
      this.showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }
  
  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => this.closeNotification(notification));
    
    // Auto close after 5 seconds
    setTimeout(() => this.closeNotification(notification), 5000);
  }
  
  closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }
}

// ===== LOADING SCREEN =====
class LoadingScreen {
  constructor() {
    this.createLoadingScreen();
  }
  
  createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loading-screen';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-logo">&lt;/&gt;</div>
        <div class="loader-text">Loading Portfolio...</div>
        <div class="loader-progress">
          <div class="loader-bar"></div>
        </div>
      </div>
    `;
    
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0a0a0a;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.5s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      .loader-content {
        text-align: center;
      }
      .loader-logo {
        font-family: 'JetBrains Mono', monospace;
        font-size: 3rem;
        font-weight: 700;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 20px;
        animation: pulse 2s infinite;
      }
      .loader-text {
        color: #a1a1aa;
        margin-bottom: 30px;
        font-size: 1.2rem;
      }
      .loader-progress {
        width: 300px;
        height: 4px;
        background: rgba(79, 70, 229, 0.1);
        border-radius: 2px;
        overflow: hidden;
      }
      .loader-bar {
        height: 100%;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        width: 0%;
        animation: loading 3s ease-in-out;
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes loading {
        0% { width: 0%; }
        100% { width: 100%; }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loader);
    
    // Remove loader after animation
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
        style.remove();
      }, 500);
    }, 3000);
  }
}

// ===== SCROLL PROGRESS INDICATOR =====
class ScrollProgress {
  constructor() {
    this.createProgressBar();
    this.updateProgress();
    
    window.addEventListener('scroll', throttle(() => this.updateProgress(), 100));
  }
  
  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 70px;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      z-index: 1000;
      transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    this.progressBar = progressBar;
  }
  
  updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    this.progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize loading screen
  new LoadingScreen();
  
  // Initialize core components after loading
  setTimeout(() => {
    // Navigation
    new NavbarController();
    
    // Particles background
    new ParticlesCanvas('#particles-canvas');
    
    // Typewriter effect
    new TypewriterEffect('#typewriter-role', [
      'Full Stack Developer',
      'Game Developer',
      'UI/UX Enthusiast',
      'Problem Solver'
    ], 150);
    
    // Animation observer
    new AnimationObserver();
    
    // Project filter
    new ProjectFilter();
    
    // Contact form
    new ContactForm('#contact-form');
    
    // Scroll progress
    new ScrollProgress();
    
  }, 100);
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Preload critical resources
const preloadResources = () => {
  const criticalResources = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = resource;
    document.head.appendChild(link);
  });
};

// Initialize performance optimizations
preloadResources();

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(registrationError => console.log('SW registration failed'));
  });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Skip to main content with Alt+M
  if (e.altKey && e.key === 'm') {
    e.preventDefault();
    $('main').focus();
  }
  
  // ESC to close mobile menu
  if (e.key === 'Escape') {
    const navToggle = $('#nav-toggle');
    const navMenu = $('#nav-menu');
    
    if (navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
});

// Focus management for better accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Trap focus in mobile menu when open
document.addEventListener('keydown', (e) => {
  const navMenu = $('#nav-menu');
  if (!navMenu.classList.contains('active') || e.key !== 'Tab') return;
  
  const focusable = navMenu.querySelectorAll(focusableElements);
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];
  
  if (e.shiftKey && document.activeElement === firstFocusable) {
    e.preventDefault();
    lastFocusable.focus();
  } else if (!e.shiftKey && document.activeElement === lastFocusable) {
    e.preventDefault();
    firstFocusable.focus();
  }
});

// Reduced motion support
const respectsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (respectsReducedMotion) {
  // Disable complex animations for users who prefer reduced motion
  document.documentElement.style.setProperty('--transition-fast', '0ms');
  document.documentElement.style.setProperty('--transition-normal', '0ms');
  document.documentElement.style.setProperty('--transition-slow', '0ms');
}
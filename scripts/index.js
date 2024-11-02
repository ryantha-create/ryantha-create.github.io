document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll implementation
  const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = anchor.getAttribute('href');
      smoothScroll(target);
    });
  });

  // Enhanced Intersection Observer with different animations
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');

        // Add specific animations based on section
        if (entry.target.classList.contains('feature')) {
          entry.target.style.animationDelay = `${entries.indexOf(entry) * 0.1}s`;
        }

        if (entry.target.classList.contains('testimonial')) {
          entry.target.style.animationDelay = `${entries.indexOf(entry) * 0.2}s`;
        }
      }
    });
  }, {
    threshold: 0.2
  });

  // Observe elements for animation
  document.querySelectorAll('section, .feature, .testimonial').forEach(element => {
    animateOnScroll.observe(element);
  });

  // Mobile menu toggle
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.classList.add('mobile-menu-button');
  mobileMenuButton.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  document.querySelector('.navbar .container').appendChild(mobileMenuButton);

  mobileMenuButton.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    mobileMenuButton.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-button')) {
      document.querySelector('.nav-links').classList.remove('active');
      mobileMenuButton.classList.remove('active');
    }
  });

  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
});

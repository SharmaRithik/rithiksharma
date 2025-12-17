// Academic Pages JavaScript

(function() {
  'use strict';

  // Dark/Light Mode Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const html = document.documentElement;

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  
  // Update icon based on current theme
  if (currentTheme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update icon
      if (newTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    });
  }

  // Top navigation menu toggle
  const topNavToggle = document.querySelector('.top-nav-toggle');
  const topNavMenu = document.querySelector('.top-nav-menu');
  
  if (topNavToggle && topNavMenu) {
    topNavToggle.addEventListener('click', function() {
      topNavMenu.classList.toggle('open');
      this.classList.toggle('active');
    });
  }

  // Close top nav menu when clicking outside
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
      if (topNavMenu && topNavMenu.classList.contains('open')) {
        if (!topNavMenu.contains(event.target) && !topNavToggle.contains(event.target)) {
          topNavMenu.classList.remove('open');
          if (topNavToggle) {
            topNavToggle.classList.remove('active');
          }
        }
      }
    }
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
      if (sidebar && sidebar.classList.contains('open')) {
        if (!sidebar.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
          sidebar.classList.remove('open');
        }
      }
    }
  });

  // Smooth scroll for navigation links
  const topNavLinks = document.querySelectorAll('.top-nav-menu a');
  
  function handleNavClick(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 60; // Account for top nav height
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (window.innerWidth <= 768 && sidebar) {
            sidebar.classList.remove('open');
          }
          
          // Close top nav menu if open on mobile
          if (window.innerWidth <= 768 && topNavMenu) {
            topNavMenu.classList.remove('open');
            if (topNavToggle) {
              topNavToggle.classList.remove('active');
            }
          }
        }
      }
    });
  }
  
  topNavLinks.forEach(handleNavClick);

  // Update active navigation link on scroll
  const sections = document.querySelectorAll('.content-section');
  const topNavItems = document.querySelectorAll('.top-nav-menu a');
  
  function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 120) { // Account for top nav
        current = section.getAttribute('id');
      }
    });
    
    // Update top nav
    topNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Initial call

  // Close mobile menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && sidebar) {
      sidebar.classList.remove('open');
    }
  });
})();


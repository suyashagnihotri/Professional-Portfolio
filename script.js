// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Toggle the hamburger menu animation
      const bars = document.querySelectorAll('.bar');
      if (menuToggle.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  }
  
  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      
      const bars = document.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    });
  });
  
  // Typewriter effect
  const typewriterElement = document.getElementById('typewriter');
  const texts = ['Upcoming Software Engineer'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 80;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at the end of typing
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  if (typewriterElement) {
    setTimeout(type, 1000);
  }
  
  // Animate skill bars when they come into view
  const progressBars = document.querySelectorAll('.progress');
  
  function animateProgressBars() {
    progressBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
      
      if (isVisible) {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      }
    });
  }
  
  // Counter animation
  const counters = document.querySelectorAll('.counter-number');
  
  function animateCounters() {
    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
      
      if (isVisible && !counter.classList.contains('animated')) {
        counter.classList.add('animated');
        
        const target = parseInt(counter.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const interval = Math.floor(duration / target);
        
        const timer = setInterval(() => {
          count++;
          counter.textContent = count;
          
          if (count >= target) {
            clearInterval(timer);
          }
        }, interval);
      }
    });
  }
  
  // Run animations on scroll
  window.addEventListener('scroll', function() {
    animateProgressBars();
    animateCounters();
    
    // Sticky navbar with background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      navbar.style.boxShadow = 'none';
    }
  });
  
  // Run animations on page load
  animateProgressBars();
  animateCounters();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
});
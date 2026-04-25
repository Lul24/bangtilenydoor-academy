// ============================================
// BANGTILENYDOOR ACADEMY - MAIN JAVASCRIPT
// Netlify Forms Version with AJAX Submission
// ============================================

// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });
  }

  document.addEventListener('click', function(event) {
    if (navLinks && navLinks.classList.contains('active')) {
      if (!navLinks.contains(event.target) && !mobileToggle.contains(event.target)) {
        navLinks.classList.remove('active');
      }
    }
  });

  const allNavLinks = document.querySelectorAll('.nav-links a');
  allNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navLinks) {
        navLinks.classList.remove('active');
      }
    });
  });
});

// ============================================
// HERO SLIDESHOW
// ============================================
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 1) {
  function nextHeroSlide() {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
  }
  setInterval(nextHeroSlide, 5000);
}

// ============================================
// DEADLINE TIMER
// ============================================
function updateDeadlineTimer() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (!daysEl) return;
  
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 45);
  deadline.setHours(23, 59, 59);
  const now = new Date();
  const diff = deadline - now;
  
  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (86400000)) / (3600000));
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateDeadlineTimer, 1000);
updateDeadlineTimer();

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href="#about"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('a[href="#top"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ============================================
// NETLIFY FORMS - Handle AJAX submission with feedback
// ============================================

// Function to show message
function showMessage(element, message, type) {
  if (!element) return;
  const className = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
  element.innerHTML = `<div class="${className}">${message}</div>`;
  element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    if (element) element.innerHTML = '';
  }, 5000);
}

// ============================================
// QUICK INQUIRY FORM (Index Page)
// ============================================
const quickForm = document.getElementById('quickInquiryForm');
const quickFeedback = document.getElementById('quickFormFeedback');

if (quickForm) {
  quickForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate required fields
    const name = document.getElementById('quickName')?.value.trim();
    const email = document.getElementById('quickEmail')?.value.trim();
    
    if (!name || !email || !email.includes('@')) {
      showMessage(quickFeedback, '⚠️ Please fill all required fields correctly.', 'error');
      return;
    }
    
    const submitBtn = quickForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    const formData = new FormData(quickForm);
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      showMessage(quickFeedback, '✅ Thank you! Our team will contact you soon.', 'success');
      quickForm.reset();
    })
    .catch(() => {
      showMessage(quickFeedback, '❌ Error submitting form. Please try again.', 'error');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });
}

// ============================================
// INQUIRY FORM (Inquiry Page)
// ============================================
const inquiryForm = document.getElementById('inquiryFormPage');
const inquiryFeedback = document.getElementById('formFeedbackPage');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate required fields
    const name = document.getElementById('fullNamePage')?.value.trim();
    const email = document.getElementById('emailAddressPage')?.value.trim();
    const message = document.getElementById('messagePage')?.value.trim();
    
    if (!name || !email || !email.includes('@') || !message) {
      showMessage(inquiryFeedback, '⚠️ Please fill all required fields correctly.', 'error');
      return;
    }
    
    const submitBtn = inquiryForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Submitting...';
    
    const formData = new FormData(inquiryForm);
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      showMessage(inquiryFeedback, '✅ Application submitted successfully! We will contact you within 24 hours.', 'success');
      inquiryForm.reset();
    })
    .catch(() => {
      showMessage(inquiryFeedback, '❌ Error submitting form. Please try again.', 'error');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    });
  });
}

// ============================================
// CONTACT FORM (Contact Page)
// ============================================
const contactForm = document.getElementById('contactForm');
const contactFeedback = document.getElementById('contactFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate required fields
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();
    
    if (!name || !email || !email.includes('@') || !message) {
      showMessage(contactFeedback, '⚠️ Please fill all required fields correctly.', 'error');
      return;
    }
    
    const submitBtn = contactForm.querySelector('.btn-send');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    const formData = new FormData(contactForm);
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      showMessage(contactFeedback, '✅ Message sent successfully! We will respond within 24 hours.', 'success');
      contactForm.reset();
    })
    .catch(() => {
      showMessage(contactFeedback, '❌ Error sending message. Please try again.', 'error');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });
}

// ============================================
// NEWSLETTER FORM (All Pages)
// ============================================
const newsForm = document.getElementById('newsletterForm');
const newsMsg = document.getElementById('newsMsg');

if (newsForm) {
  newsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsEmail')?.value.trim();
    
    if (!email || !email.includes('@')) {
      if (newsMsg) {
        newsMsg.innerHTML = '<span class="text-danger">⚠️ Please enter a valid email address</span>';
        setTimeout(() => { if (newsMsg) newsMsg.innerHTML = ''; }, 3000);
      }
      return;
    }
    
    const submitBtn = newsForm.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '...';
    
    const formData = new FormData(newsForm);
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      if (newsMsg) {
        newsMsg.innerHTML = '<span class="text-success">✅ Subscribed successfully! Check your inbox.</span>';
        newsForm.reset();
      }
    })
    .catch(() => {
      if (newsMsg) {
        newsMsg.innerHTML = '<span class="text-danger">❌ Error. Please try again.</span>';
      }
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      setTimeout(() => { if (newsMsg) newsMsg.innerHTML = ''; }, 5000);
    });
  });
}

// ============================================
// SCHOLARSHIP SEARCH (Scholarships Page)
// ============================================
const searchBtn = document.getElementById('searchScholarshipPageBtn');
const searchInput = document.getElementById('scholarshipSearchPage');
const searchMsg = document.getElementById('searchResultPageMsg');

const scholarships = [
  "Fulbright Foreign Student Program (USA)",
  "DAAD Scholarships (Germany)",
  "Chevening Scholarships (UK)",
  "Erasmus Mundus (Europe)",
  "Commonwealth Scholarships (UK)",
  "Vanier Canada Graduate Scholarships",
  "Utrecht Excellence Scholarship",
  "University of Auckland International",
  "Swedish Institute Scholarships"
];

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      if (searchMsg) searchMsg.innerHTML = '<span class="text-warning">✨ Type a keyword like "Germany", "UK", "USA"</span>';
      return;
    }
    
    const results = scholarships.filter(s => s.toLowerCase().includes(query));
    if (results.length > 0) {
      if (searchMsg) {
        searchMsg.innerHTML = `<span class="text-success">🔍 Found ${results.length} scholarship(s): ${results.slice(0,3).join(', ')}. <a href="inquiry.html" class="text-primary">Apply for guidance →</a></span>`;
      }
    } else {
      if (searchMsg) searchMsg.innerHTML = '<span class="text-info">No matching scholarships found. Contact our advisors for custom matches!</span>';
    }
  });
}

// ============================================
// SCHOLARSHIP DEADLINE TIMER
// ============================================
function updateScholarshipTimer() {
  const daysElem = document.getElementById('scholarshipDays');
  const hoursElem = document.getElementById('scholarshipHours');
  const minutesElem = document.getElementById('scholarshipMinutes');
  
  if (!daysElem) return;
  
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 30);
  deadline.setHours(23, 59, 59);
  const now = new Date();
  const diff = deadline - now;
  
  if (diff <= 0) {
    daysElem.textContent = '00';
    if (hoursElem) hoursElem.textContent = '00';
    if (minutesElem) minutesElem.textContent = '00';
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (86400000)) / (3600000));
  const minutes = Math.floor((diff % 3600000) / 60000);
  
  daysElem.textContent = String(days).padStart(2, '0');
  if (hoursElem) hoursElem.textContent = String(hours).padStart(2, '0');
  if (minutesElem) minutesElem.textContent = String(minutes).padStart(2, '0');
}

setInterval(updateScholarshipTimer, 60000);
updateScholarshipTimer();

// ============================================
// STATS ANIMATION ON SCROLL (Impacts Page)
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
  const observerOptions = { threshold: 0.5, rootMargin: '0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'all 0.6s ease';
    observer.observe(stat);
  });
}
// ============================================
// FORCED MOBILE MENU FIX - WORKS ON ALL PAGES
// ============================================
(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    function initMobileMenu() {
        // Get elements
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (!mobileToggle || !navLinks) {
            console.log('Mobile menu elements not found');
            return;
        }
        
        console.log('Mobile menu found - initializing');
        
        // Remove any existing event listeners by cloning
        const newToggle = mobileToggle.cloneNode(true);
        mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);
        
        // Add click event to new toggle
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            console.log('Menu toggled - active:', navLinks.classList.contains('active'));
        });
        
        // Close menu when clicking a link
        const allLinks = navLinks.querySelectorAll('a');
        allLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active')) {
                if (!navLinks.contains(e.target) && !newToggle.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            }
        });
    }
})();

console.log('✅ Bangtilenydoor Academy - All systems ready for Netlify');
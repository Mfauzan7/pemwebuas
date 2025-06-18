// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navMenu = document.getElementById("navMenu")

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")
  if (navMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-times")
  } else {
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
})

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const icon = mobileMenuBtn.querySelector("i")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  })
})

// Header scroll effect
const header = document.querySelector(".header")
let lastScrollY = window.scrollY

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }

  lastScrollY = currentScrollY
})

// Back to top button
const backToTopBtn = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible")
  } else {
    backToTopBtn.classList.remove("visible")
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = header.offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Contact form handling
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Simple validation
  if (!data.fullName || !data.phone || !data.email) {
    alert("Mohon lengkapi semua field yang wajib diisi.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    alert("Mohon masukkan alamat email yang valid.")
    return
  }

  // Phone validation (Indonesian format)
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
  if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
    alert("Mohon masukkan nomor telepon yang valid.")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...'
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Terima kasih! Pesan Anda telah terkirim. Tim kami akan menghubungi Anda segera.")
    this.reset()
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".product-card, .feature-card, .testimonial-card, .stat-card")

  animateElements.forEach((el) => {
    observer.observe(el)
  })
})

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start)
    }
  }, 16)
}

// Animate counters when stats section is visible
const statsSection = document.querySelector(".stats-section")
let statsAnimated = false

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        const statNumbers = entry.target.querySelectorAll(".stat-number")
        statNumbers.forEach((stat) => {
          const text = stat.textContent
          const number = Number.parseInt(text.replace(/\D/g, ""))
          if (number) {
            stat.textContent = "0"
            setTimeout(() => {
              animateCounter(stat, number)
            }, 500)
          }
        })
        statsAnimated = true
      }
    })
  },
  { threshold: 0.5 },
)

if (statsSection) {
  statsObserver.observe(statsSection)
}

// Product card hover effects
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})

// Testimonial carousel (simple auto-scroll)
const testimonialGrid = document.querySelector(".testimonials-grid")
if (testimonialGrid && window.innerWidth <= 768) {
  let currentIndex = 0
  const testimonials = testimonialGrid.querySelectorAll(".testimonial-card")

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? "block" : "none"
    })
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length
    showTestimonial(currentIndex)
  }

  // Show first testimonial
  showTestimonial(0)

  // Auto-advance every 5 seconds
  setInterval(nextTestimonial, 5000)
}

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active")
    const icon = mobileMenuBtn.querySelector("i")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Any additional scroll handling can go here
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("PLN Insurance website loaded successfully!")

  // Add loading animation to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (!this.classList.contains("loading")) {
        this.classList.add("loading")
        setTimeout(() => {
          this.classList.remove("loading")
        }, 1000)
      }
    })
  })
})
/* HamGoBor Website Script */

// --- Footer year ---
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Mobile nav toggle ---
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    links.style.display = links.style.display === "flex" ? "none" : "flex";
  });
}

// --- Carousel / Product Slider ---
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let index = 0;

// Dots for navigation
if (carousel && slides.length > 0) {
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "dots";
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
  document.querySelector(".slider")?.appendChild(dotsContainer);
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

function showSlide(i) {
  if (!carousel) return;
  index = (i + slides.length) % slides.length;
  carousel.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

prevBtn?.addEventListener("click", () => showSlide(index - 1));
nextBtn?.addEventListener("click", () => showSlide(index + 1));

// Auto-play every 5 seconds
if (carousel) {
  setInterval(() => showSlide(index + 1), 5000);
}

// --- Contact form (basic validation) ---
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm).entries());
    const status = document.getElementById("contact-status");
    if (!data.name || !data.email || !data.message) {
      status.textContent = "Please fill in all fields.";
      status.style.color = "#e64a19";
      return;
    }
    status.textContent = "Message sent successfully!";
    status.style.color = "#22c55e";
    contactForm.reset();
  });
}

// --- User Authentication (Signup & Login) ---
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(signupForm);
    const user = {
      name: form.get("name"),
      email: String(form.get("email")).toLowerCase(),
      password: form.get("password"),
      phone: form.get("phone")
    };
    localStorage.setItem("hamgobor:user", JSON.stringify(user));
    alert("Account created. Welcome to HamGoBor!");
    window.location.href = "dashboard.html";
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(loginForm);
    const email = String(form.get("email")).toLowerCase();
    const password = form.get("password");
    const stored = JSON.parse(localStorage.getItem("hamgobor:user") || "null");
    if (stored && stored.email === email && stored.password === password) {
      alert("Logged in successfully.");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials. Try again or sign up.");
    }
  });
}

// --- Dashboard population & logout ---
if (/dashboard\.html$/.test(location.pathname)) {
  const user = JSON.parse(localStorage.getItem("hamgobor:user") || "null");
  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("profile-name").textContent = user.name || "";
    document.getElementById("profile-email").textContent = user.email || "";
    document.getElementById("profile-phone").textContent = user.phone || "";
  }

  document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("hamgobor:user");
    alert("Logged out.");
    window.location.href = "index.html";
  });
}
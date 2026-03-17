const themeToggle = document.getElementById("themeToggle");
const yearEl = document.getElementById("year");
const hireBtn = document.querySelector(".hire");
const navLinks = document.querySelectorAll("nav a");
const contactForm = document.querySelector(".contact-form");

const THEME_KEY = "theme";

function setTheme(mode) {
    document.body.classList.toggle("dark", mode === "dark");
    themeToggle.textContent = mode === "dark" ? "Light mode" : "Dark mode";
    localStorage.setItem(THEME_KEY, mode);
}

function initTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") {
        setTheme(stored);
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth" });
}

function setActiveNav() {
    const fromTop = window.scrollY + 120;
    navLinks.forEach((link) => {
        const section = document.querySelector(link.hash);
        if (!section) return;
        const inView = section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop;
        link.classList.toggle("active", inView);
    });
}

function initYear() {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initListeners() {
    themeToggle.addEventListener("click", toggleTheme);

    if (hireBtn) {
        hireBtn.addEventListener("click", (e) => {
            e.preventDefault();
            scrollToSection("contact");
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            if (!link.hash) return;
            e.preventDefault();
            scrollToSection(link.hash.slice(1));
        });
    });

    window.addEventListener("scroll", setActiveNav);

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thanks! Your message has been sent.");
            contactForm.reset();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initYear();
    initListeners();
});

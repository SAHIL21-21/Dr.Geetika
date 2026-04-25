const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const appointmentForm = document.querySelector("#appointment-form");
const formNote = document.querySelector("#form-note");
const revealItems = document.querySelectorAll(".reveal");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

if (appointmentForm && formNote) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(appointmentForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone) {
      formNote.textContent = "Please enter your name and phone number first.";
      return;
    }

    const text =
      `Hello Prime Healthcare,%0A%0AI would like to book an appointment with Dr. Geetika Garg.%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Message: ${encodeURIComponent(message || "Please contact me for an appointment.")}`;

    window.open(`https://wa.me/919988054848?text=${text}`, "_blank");
    formNote.textContent = "Opening WhatsApp with your appointment request.";
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

(() => {
  // ---------- Header scroll state ----------
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---------- Reveal-on-scroll ----------
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  // ---------- Footer year ----------
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // ---------- Inquiry form ----------
  const form = document.getElementById("inquiryForm");
  const status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());

      // Basic validation
      if (!data.name || !data.email || !data.stay) {
        status.className = "form-status err";
        status.textContent = "Please fill in your name, email, and which stay.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        status.className = "form-status err";
        status.textContent = "That email doesn't look right.";
        return;
      }

      // TODO: replace with Formspree/Netlify endpoint when wired up.
      // For now, surface a friendly success and log to console.
      console.log("Bee Creek inquiry:", data);
      status.className = "form-status ok";
      status.textContent = "Thanks — we got it. We'll be in touch soon.";
      form.reset();
    });
  }

  // ---------- Airbnb book buttons (placeholder until URLs are provided) ----------
  const AIRBNB_URLS = {
    "big-bend": "https://www.airbnb.com/rooms/1410490592766462063",
    "nocona": "https://www.airbnb.com/rooms/1415461566993026047",
  };
  document.querySelectorAll("[data-airbnb]").forEach((a) => {
    const key = a.getAttribute("data-airbnb");
    const url = AIRBNB_URLS[key];
    if (url && url !== "#") {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const inquiry = document.getElementById("inquiry");
        if (inquiry) inquiry.scrollIntoView({ behavior: "smooth" });
      });
    }
  });
})();

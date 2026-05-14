export function initHomeAnimations(gsap, ScrollTrigger) {
  const triggers = [];
  gsap.registerPlugin(ScrollTrigger);

  // Hero fade-up
  gsap.from(".hero-content > *", {
    y: 50,
    opacity: 0,
    duration: 1.1,
    stagger: 0.12,
    ease: "power3.out",
    delay: 0.2,
  });

  gsap.from(".scroll-indicator", {
    opacity: 0,
    y: 15,
    duration: 0.8,
    delay: 1.2,
  });

  // Scroll reveals
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    const t = gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
    triggers.push(t);
  });

  // Stagger children
  document.querySelectorAll("[data-stagger]").forEach((container) => {
    const t = gsap.from(container.children, {
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: container, start: "top 82%" },
    });
    triggers.push(t);
  });

  // Counters
  document.querySelectorAll(".stat-num").forEach((element) => {
    const targetValue = parseInt(element.dataset.count) || 0;
    const suffix = element.dataset.suffix || "";

    ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to({ value: 0 }, {
          value: targetValue,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: function () {
            element.textContent = Math.floor(this.targets()[0].value) + suffix;
          },
        });
      },
    });
  });

  // 3D tilt
  document.querySelectorAll(".dest-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      gsap.to(card, {
        rotateY: ((event.clientX - rect.left) / rect.width - 0.5) * 8,
        rotateX: -((event.clientY - rect.top) / rect.height - 0.5) * 8,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: "elastic.out(1,0.4)",
      });
    });
  });

  // Magnetic
  document.querySelectorAll(".btn-primary, .nav-cta").forEach((btn) => {
    btn.addEventListener("mousemove", (event) => {
      const rect = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (event.clientX - rect.left - rect.width / 2) * 0.2,
        y: (event.clientY - rect.top - rect.height / 2) * 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1,0.3)",
      });
    });
  });

  return triggers;
}

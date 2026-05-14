<script>
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { packagesData, topDestinations, galleryImages, testimonials } from "../../public/data.js";

  let triggers = [];

  // ── Video Slideshow ──
  const heroVideos = [
    {
      src: "https://videos.pexels.com/video-files/4316120/4316120-uhd_2560_1440_25fps.mp4",
      poster:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80",
    },
    {
      src: "https://videos.pexels.com/video-files/4316236/4316236-uhd_2560_1440_25fps.mp4",
      poster:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80",
    },
    {
      src: "https://videos.pexels.com/video-files/3629536/3629536-hd_1920_1080_30fps.mp4",
      poster:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80",
    },
    {
      src: "https://videos.pexels.com/video-files/4315829/4315829-uhd_2560_1440_25fps.mp4",
      poster:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=80",
    },
  ];

  let currentSlide = 0;
  let videoRefs = [];
  let slideTimer;
  let progressTimer;
  let slideProgress = 0;
  const SLIDE_DURATION = 8000;

  function goToSlide(index) {
    if (index === currentSlide) return;
    const prev = currentSlide;
    currentSlide = index;
    slideProgress = 0;

    if (videoRefs[currentSlide]) {
      videoRefs[currentSlide].currentTime = 0;
      videoRefs[currentSlide].play().catch(() => {});
    }
    setTimeout(() => {
      if (videoRefs[prev]) videoRefs[prev].pause();
    }, 1600);
    resetTimer();
  }

  function advanceSlide() {
    goToSlide((currentSlide + 1) % heroVideos.length);
  }

  function resetTimer() {
    clearTimeout(slideTimer);
    clearInterval(progressTimer);
    slideProgress = 0;
    const step = 50;
    progressTimer = setInterval(() => {
      slideProgress += (step / SLIDE_DURATION) * 100;
      if (slideProgress >= 100) clearInterval(progressTimer);
    }, step);
    slideTimer = setTimeout(advanceSlide, SLIDE_DURATION);
  }

  const spiralImages = [
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80',
    'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
    'https://images.unsplash.com/photo-1587478640398-0f2c40c1ceba?w=800&q=80',
    'https://images.unsplash.com/photo-1514222785106-a8f81536b335?w=800&q=80',
    'https://images.unsplash.com/photo-1598144249156-f6d3cb20c6a2?w=800&q=80',
    'https://images.unsplash.com/photo-1590050720235-9dfa86df74f3?w=800&q=80',
    'https://images.unsplash.com/photo-1600100397608-f010f411c569?w=800&q=80',
    'https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800&q=80',
    'https://images.unsplash.com/photo-1582502693992-ce8474dc25ea?w=800&q=80',
    'https://images.unsplash.com/photo-1625062402283-9bfa0efd5d21?w=800&q=80',
    'https://images.unsplash.com/photo-1546875567-27e16a241203?w=800&q=80',
    'https://images.unsplash.com/photo-1627806509506-6966f3640b8a?w=800&q=80',
    'https://images.unsplash.com/photo-1598285519890-eec1a4cb99bb?w=800&q=80',
    'https://images.unsplash.com/photo-1525642838382-b7e51cdeafc7?w=800&q=80',
    'https://images.unsplash.com/photo-1592652431713-39906d4eeb5c?w=800&q=80',
    'https://images.unsplash.com/photo-1550231573-0f04fba222bb?w=800&q=80',
    'https://images.unsplash.com/photo-1568297779-7bd7d1fdf261?w=800&q=80'
  ];

  onMount(() => {
    // Initialize spiral
    if (window.initSpiral) window.initSpiral(spiralImages);

    // Start video slideshow
    if (videoRefs[0]) videoRefs[0].play().catch(() => {});
    resetTimer();

    // Wait a tick for DOM to be ready
    requestAnimationFrame(() => {
      const gsap = window.gsap;
      const ST = window.ScrollTrigger;
      if (!gsap || !ST) return;
      gsap.registerPlugin(ST);

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
      document.querySelectorAll("[data-stagger]").forEach((c) => {
        const t = gsap.from(c.children, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: c, start: "top 82%" },
        });
        triggers.push(t);
      });

      // Counters
      document.querySelectorAll(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || "";
        ST.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(
              { v: 0 },
              {
                v: target,
                duration: 2.2,
                ease: "power2.out",
                onUpdate: function () {
                  el.textContent = Math.floor(this.targets()[0].v) + suffix;
                },
              },
            );
          },
        });
      });

      // 3D tilt on dest cards
      document.querySelectorAll(".dest-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          gsap.to(card, {
            rotateY: ((e.clientX - r.left) / r.width - 0.5) * 8,
            rotateX: -((e.clientY - r.top) / r.height - 0.5) * 8,
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

      // Magnetic buttons
      document.querySelectorAll(".btn-primary, .nav-cta").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.2,
            y: (e.clientY - r.top - r.height / 2) * 0.2,
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

      // Swiper
      if (window.Swiper) {
        new window.Swiper(".testimonials-swiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          autoplay: { delay: 4000, disableOnInteraction: false },
          pagination: { el: ".swiper-pagination", clickable: true },
          breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          },
        });
      }

      // FAQ
      document.querySelectorAll(".faq-question").forEach((q) => {
        q.addEventListener("click", () => {
          const item = q.parentElement;
          const wasOpen = item.classList.contains("active");
          document
            .querySelectorAll(".faq-item")
            .forEach((i) => i.classList.remove("active"));
          if (!wasOpen) item.classList.add("active");
        });
      });
    });
  });

  onDestroy(() => {
    if (window.destroySpiral) window.destroySpiral();
    if (window.ScrollTrigger)
      window.ScrollTrigger.getAll().forEach((t) => t.kill());
    clearTimeout(slideTimer);
    clearInterval(progressTimer);
  });
</script>

<!-- Hero with Video Slideshow + Auto-Rolling Spiral -->
<section class="hero" id="hero">
  {#each heroVideos as video, i}
    <video
      bind:this={videoRefs[i]}
      class="hero-video"
      class:hero-video-active={i === currentSlide}
      muted
      loop
      playsinline
      preload={i === 0 ? "auto" : "metadata"}
      poster={video.poster}
    >
      <source src={video.src} type="video/mp4" />
    </video>
  {/each}
  <div class="hero-overlay"></div>

  <div class="hero-content">
    <p class="hero-label">Explore Incredible India</p>
    <h1>Where<em>Next?</em></h1>
    <p class="hero-subtitle">
      From the Taj Mahal to Kerala's backwaters, discover handpicked
      destinations and unforgettable experiences across India.
    </p>
    <div class="hero-btns">
      <a href="#spiral" class="btn btn-primary"
        >Start Exploring <i class="ri-arrow-right-line"></i></a
      >
    </div>
  </div>

  <!-- Slide indicators -->
  <div class="hero-slide-indicators">
    {#each heroVideos as _, i}
      <button
        class="slide-indicator"
        class:active={i === currentSlide}
        on:click={() => goToSlide(i)}
      >
        {#if i === currentSlide}
          <span class="slide-indicator-fill" style="width: {slideProgress}%"
          ></span>
        {/if}
      </button>
    {/each}
  </div>

  <div class="scroll-indicator">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<!-- Spiral Showcase Section -->
<section
  id="spiral"
  class="section section-dark spiral-section"
  style="position:relative;padding:0px;height: 100vh; overflow: hidden; display: flex; align-items: center;"
>
  <div id="webgl-container">
    <canvas id="webgl-canvas"></canvas>
  </div>
  <div
    class="container"
    style="right:0px;position:absolute;z-index:2;pointer-events:none;text-align:right;"
  >
    <div
      class="section-header"
      style="background:rgba(0,0,0,0.3);box-shadow:0px 0px 10px 10px rgba(0,0,0,0.3);border-radius:5px;"
      data-reveal
    >
      <div class="section-label">Explore Incredible India</div>
      <h2 class="section-title">Discover Endless<br />Wonders</h2>
      <p style="color: var(--text-muted);line-height: 1.8;">
        Spin through India's breathtaking landscapes<br /> — from Himalayan peaks
        to tropical shores.
      </p>
    </div>
  </div>
</section>

<!-- Marquee -->
<div class="marquee">
  <div class="marquee-track">
    <span>Jaipur</span><span>Goa</span><span>Kerala</span><span>Leh-Ladakh</span
    ><span>Varanasi</span><span>Munnar</span><span>Udaipur</span><span
      >Rishikesh</span
    ><span>Andaman</span><span>Hampi</span><span>Darjeeling</span><span
      >Agra</span
    >
    <span>Jaipur</span><span>Goa</span><span>Kerala</span><span>Leh-Ladakh</span
    ><span>Varanasi</span><span>Munnar</span><span>Udaipur</span><span
      >Rishikesh</span
    ><span>Andaman</span><span>Hampi</span><span>Darjeeling</span><span
      >Agra</span
    >
  </div>
</div>

<!-- Stats -->
<section class="stats">
  <div class="stats-grid">
    <div data-reveal>
      <div class="stat-num" data-count="500" data-suffix="+">0</div>
      <div class="stat-label">Destinations</div>
    </div>
    <div data-reveal>
      <div class="stat-num" data-count="12000" data-suffix="+">0</div>
      <div class="stat-label">Happy Travelers</div>
    </div>
    <div data-reveal>
      <div class="stat-num" data-count="98" data-suffix="%">0</div>
      <div class="stat-label">Satisfaction Rate</div>
    </div>
    <div data-reveal>
      <div class="stat-num" data-count="150" data-suffix="+">0</div>
      <div class="stat-label">Tour Packages</div>
    </div>
  </div>
</section>

<!-- Destinations -->
<section class="section" id="destinations">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Top Picks</div>
      <h2 class="section-title">Stunning Destinations</h2>
      <p class="section-subtitle">
        Explore our handpicked collection of India's most awe-inspiring places.
      </p>
    </div>
    <div class="dest-grid" data-stagger>
      {#each topDestinations as dest}
        <div class="dest-card">
          <img
            src={dest.img}
            alt={dest.alt}
            loading="lazy"
          />
          <div class="dest-card-overlay"></div>
          <div class="dest-card-info">
            <div class="dest-card-rating"><i class="ri-star-fill"></i> {dest.rating}</div>
            <h3>{dest.title}</h3>
            <p>{dest.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Packages -->
<section class="section section-dark" id="packages">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Featured</div>
      <h2 class="section-title">Popular Packages</h2>
      <p class="section-subtitle">
        Hand-crafted itineraries designed for unforgettable experiences.
      </p>
    </div>
    <div
      style="display:flex;flex-direction: column;align-items:center;justify-content: center; gap: 15%;"
      data-stagger
    >
      <div class="pkg-grid">
        {#each packagesData as pkg}
          <div class="pkg-card">
            <div class="pkg-card-img">
              <img src={pkg.image} alt={pkg.alt} loading="lazy" />
              <div class="pkg-badge">{pkg.badge}</div>
            </div>
            <div class="pkg-card-body">
              <h3>{pkg.title}</h3>
              <div class="pkg-meta">
                <span><i class="ri-time-line"></i> {pkg.days} Days</span><span
                  ><i class="ri-map-pin-line"></i> {pkg.location}</span
                ><span><i class="ri-star-fill"></i> {pkg.rating}</span>
              </div>
              <div class="pkg-price">
                <span class="amount">{pkg.price}</span><span class="per"
                  >/ person</span
                >
              </div>
            </div>
          </div>
        {/each}
      </div>
      <a
        href="/explore"
        style="margin-top:20px;max-width:max-content;opacity:1 !important;"
        class="btn btn-primary btn-sm"
        >Create Your Own Custom Package <i class="ri-arrow-right-s-line"></i></a
      >
    </div>
  </div>
</section>

<!-- Gallery -->
<section class="section" id="gallery">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Moments</div>
      <h2 class="section-title">Travel Gallery</h2>
      <p class="section-subtitle">
        A glimpse into the extraordinary moments that await you.
      </p>
    </div>
    <div class="gallery-grid" data-stagger>
      {#each galleryImages as img}
        <div class="gallery-item {img.class}">
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
          />
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="section section-dark testimonials-section" id="testimonials">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Reviews</div>
      <h2 class="section-title">What Travelers Say</h2>
      <p class="section-subtitle">
        Real stories from real adventurers who trusted us with their journeys.
      </p>
    </div>
    <div class="swiper testimonials-swiper">
      <div class="swiper-wrapper">
        {#each testimonials as t}
          <div class="swiper-slide">
            <div class="testimonial-card">
              <div class="testimonial-stars">
                {#each Array.from({ length: Math.floor(t.rating) }) as _}
                  <i class="ri-star-fill"></i>
                {/each}
                {#if t.rating % 1 !== 0}
                  <i class="ri-star-half-fill"></i>
                {/if}
              </div>
              <p class="testimonial-text">
                {t.text}
              </p>
              <div class="testimonial-author">
                <img
                  class="testimonial-avatar"
                  src={t.authorImg}
                  alt={t.authorName}
                />
                <div>
                  <div class="testimonial-name">{t.authorName}</div>
                  <div class="testimonial-role">{t.authorRole}</div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section" id="faq">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Support</div>
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-subtitle">
        Everything you need to know before booking your next adventure.
      </p>
    </div>
    <div class="faq-list" data-reveal>
      <div class="faq-item active">
        <div class="faq-question">
          <span>How do I book a travel package?</span><i class="ri-add-line"
          ></i>
        </div>
        <div class="faq-answer">
          Browse our packages on the Explore page, select your preferred trip,
          and click "Book Now". You'll be guided through a simple checkout
          process with secure payment options.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          <span>Can I customize my itinerary?</span><i class="ri-add-line"></i>
        </div>
        <div class="faq-answer">
          Absolutely! All our packages are fully customizable. Contact our
          travel concierge to tailor any trip to your preferences, budget, and
          schedule.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          <span>What's your cancellation policy?</span><i class="ri-add-line"
          ></i>
        </div>
        <div class="faq-answer">
          We offer free cancellation up to 30 days before departure.
          Cancellations within 14-30 days receive a 50% refund.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          <span>Are flights included in the packages?</span><i
            class="ri-add-line"
          ></i>
        </div>
        <div class="faq-answer">
          Most premium packages include flights. Budget-friendly options may be
          accommodation-only. Each listing clearly states what's included.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-question">
          <span>Do you offer group discounts?</span><i class="ri-add-line"></i>
        </div>
        <div class="faq-answer">
          Yes! Groups of 4 or more receive up to 15% off. Contact our team for
          custom group pricing.
        </div>
      </div>
    </div>
  </div>
</section>

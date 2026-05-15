<script>
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import {
    packagesData,
    topDestinations,
    galleryImages,
    testimonials,
    heroVideos,
    spiralImages,
  } from "../../public/data.js";
  import { initHomeAnimations } from "../utils/animations.js";
  import "./home.css";

  let animationTriggers = [];

  // ── Video Slideshow ──
  let activeVideoIndex = 0;
  let videoRefs = [];
  let slideshowTimer;
  let progressTimer;
  let slideProgress = 0;
  const SLIDESHOW_DURATION = 8000;

  function goToSlide(index) {
    if (index === activeVideoIndex) return;
    const previousIndex = activeVideoIndex;
    activeVideoIndex = index;
    slideProgress = 0;

    if (videoRefs[activeVideoIndex]) {
      videoRefs[activeVideoIndex].currentTime = 0;
      videoRefs[activeVideoIndex].play().catch(() => {});
    }
    setTimeout(() => {
      if (videoRefs[previousIndex]) videoRefs[previousIndex].pause();
    }, 1600);
    resetSlideshowTimer();
  }

  function playNextVideo() {
    goToSlide((activeVideoIndex + 1) % heroVideos.length);
  }

  function resetSlideshowTimer() {
    clearTimeout(slideshowTimer);
    clearInterval(progressTimer);
    slideProgress = 0;
    const updateInterval = 50;

    progressTimer = setInterval(() => {
      slideProgress += (updateInterval / SLIDESHOW_DURATION) * 100;
      if (slideProgress >= 100) clearInterval(progressTimer);
    }, updateInterval);

    slideshowTimer = setTimeout(playNextVideo, SLIDESHOW_DURATION);
  }

  onMount(() => {
    // Initialize spiral
    if (window.initSpiral) window.initSpiral(spiralImages);

    // Start video slideshow
    if (videoRefs[0]) videoRefs[0].play().catch(() => {});
    resetSlideshowTimer();

    // Wait a tick for DOM to be ready
    requestAnimationFrame(() => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      if (gsap && ScrollTrigger) {
        animationTriggers = initHomeAnimations(gsap, ScrollTrigger);
      }

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
    if (window.ScrollTrigger) {
      window.ScrollTrigger.getAll().forEach((t) => t.kill());
    }
    clearTimeout(slideshowTimer);
    clearInterval(progressTimer);
  });
</script>

<!-- Hero with Video Slideshow + Auto-Rolling Spiral -->
<section class="hero" id="hero">
  {#each heroVideos as video, i}
    <video
      bind:this={videoRefs[i]}
      class="hero-video"
      class:hero-video-active={i === activeVideoIndex}
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
      <a href="/explore" class="btn btn-primary"
        >Start Exploring <i class="ri-arrow-right-line"></i></a
      >
    </div>
  </div>

  <!-- Slide indicators -->
  <div class="hero-slide-indicators">
    {#each heroVideos as _, i}
      <button
        class="slide-indicator"
        class:active={i === activeVideoIndex}
        on:click={() => goToSlide(i)}
      >
        {#if i === activeVideoIndex}
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
<section id="spiral" class="section section-dark spiral-section">
  <div id="webgl-container">
    <canvas id="webgl-canvas"></canvas>
  </div>
  <div class="container spiral-container">
    <div class="section-header spiral-header" data-reveal>
      <div class="section-label">Explore Incredible India</div>
      <h2 class="section-title">Discover Endless<br />Wonders</h2>
      <p class="spiral-text">
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
          <img src={dest.img} alt={dest.alt} loading="lazy" />
          <div class="dest-card-overlay"></div>
          <div class="dest-card-info">
            <div class="dest-card-rating">
              <i class="ri-star-fill"></i>
              {dest.rating}
            </div>
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
    <div class="packages-wrapper" data-stagger>
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
      <a href="/explore" class="btn btn-primary btn-sm explore-link">
        Create Your Own Custom Package <i class="ri-arrow-right-s-line"></i>
      </a>
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
          <img src={img.src} alt={img.alt} loading="lazy" />
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
          and click "Book Now".
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
          <span>Are flights included in the packages?</span><i
            class="ri-add-line"
          ></i>
        </div>
        <div class="faq-answer">
          Most premium packages include flights. Budget-friendly options may be
          accommodation-only. Each listing clearly states what's included.
        </div>
      </div>
    </div>
  </div>
</section>

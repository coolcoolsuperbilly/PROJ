<script>
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { explorePackages, trendingDestinations } from "../../public/data.js";
  import { fetchTripPlan } from "../utils/api.js";
  import "./explore.css";

  let currentFilter = "All";
  function updateFilter(filterName) {
    currentFilter = filterName;
  }

  onMount(() => {
    // animation things
    requestAnimationFrame(() => {
      const gsap = window.gsap;
      const ST = window.ScrollTrigger;
      if (!gsap || !ST) return;
      gsap.registerPlugin(ST);
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      document.querySelectorAll("[data-stagger]").forEach((c) => {
        gsap.from(c.children, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: c, start: "top 82%" },
        });
      });
    });
  });

  onDestroy(() => {
    if (window.ScrollTrigger)
      window.ScrollTrigger.getAll().forEach((t) => t.kill());
    document.body.style.overflow = "";
  });

  // API Integration
  let searchQuery = "";
  let searchBudget = 50000;
  let isLoadingResults = false;
  let tripPlanData = null;
  let errorMsg = "";

  // Timeline Popup
  let showTimeline = false;
  let timelineData = null;

  function openTimeline(data) {
    timelineData = data;
    showTimeline = true;
    document.body.style.overflow = "hidden";
  }
  function closeTimeline() {
    showTimeline = false;
    timelineData = null;
    document.body.style.overflow = "";
  }

  function handleKeydown(event, data) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openTimeline(data);
    }
  }

  function bookOnBooking(name) {
    window.open(
      `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(name)}`,
      "_blank",
    );
  }

  async function handleSearch() {
    isLoadingResults = true;
    errorMsg = "";

    const response = await fetchTripPlan(searchQuery, searchBudget);

    if (response.error) {
      errorMsg = response.error;
    } else {
      tripPlanData = response.data;
    }

    isLoadingResults = false;
  }
</script>

<!-- Explore Hero -->
<section class="explore-hero">
  <img
    class="explore-hero-bg"
    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80"
    alt="India Gate at sunset"
  />
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-content">
      <h1 class="explore-hero-title">Create Your Own Tour Packages</h1>
      <p class="hero-label">AI-Powered Trip Planner</p>
      <p class="explore-hero-desc">
        Enter destinations and your budget — our AI builds the perfect package
        for you.
      </p>
      <form class="search-bar" on:submit|preventDefault={handleSearch}>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Destinations (e.g. Delhi, Agra, Jaipur)..."
          class="search-input-dest"
          required
        />
        <input
          type="number"
          bind:value={searchBudget}
          placeholder="Budget (₹)"
          min="5000"
          class="search-input-budget"
          required
        />
        <button
          class="btn btn-primary"
          type="submit"
          disabled={isLoadingResults}
        >
          {#if isLoadingResults}
            <i class="ri-loader-4-line spin"></i>
          {:else}
            <i class="ri-magic-line"></i>
          {/if}
        </button>
      </form>
      {#if errorMsg}
        <div class="search-error">
          <i class="ri-error-warning-line"></i>
          {errorMsg}
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Results -->
<section class="section section-dark">
  <div class="container">
    {#if tripPlanData}
      <!-- AI Package Card -->
      <div
        class="ai-pkg"
        on:click={() => openTimeline(tripPlanData)}
        on:keydown={(e) => handleKeydown(e, tripPlanData)}
        role="button"
        tabindex="0"
        data-reveal
      >
        <div class="ai-pkg-bg">
          <img
            src={tripPlanData.locations[0]?.image ||
              "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80"}
            alt="Package"
          />
          <div class="ai-pkg-overlay"></div>
        </div>
        <div class="ai-pkg-body">
          <span class="pkg-badge ai-pkg-badge">AI Generated Package</span>
          <h2>
            The {tripPlanData.locations.map((l) => l.name).join(" → ")} Journey
          </h2>
          <p class="ai-pkg-meta">
            {tripPlanData.locations.length} Destinations • Budget:
            <strong>₹{tripPlanData.total_cost}</strong>
          </p>
          <div class="ai-pkg-tags">
            {#each tripPlanData.locations as loc}
              <span class="route-tag"
                ><i class="ri-map-pin-2-fill"></i> {loc.name}</span
              >
            {/each}
            {#if tripPlanData.travel}
              {#each tripPlanData.travel as t}
                <span class="route-tag"
                  ><i class="ri-route-line"></i>
                  {t.from} → {t.to} ({t.type})</span
                >
              {/each}
            {/if}
          </div>
          <div class="ai-pkg-actions">
            <button
              class="btn btn-primary"
              on:click|stopPropagation={() => openTimeline(tripPlanData)}
            >
              <i class="ri-time-line"></i> View Timeline
            </button>
            <button
              class="btn btn-ghost"
              on:click|stopPropagation={() =>
                bookOnBooking(tripPlanData.locations[0]?.name || "")}
            >
              Book on Booking.com <i class="ri-external-link-line"></i>
            </button>
          </div>
        </div>
      </div>
    {:else}
      <!-- Default Static Packages -->
      <div class="section-header" data-reveal>
        <div class="section-label">Curated For You</div>
        <h2 class="section-title">Popular Packages</h2>
      </div>
      <div class="explore-grid" data-stagger>
        {#each explorePackages as pkg}
          <div class="pkg-card">
            <div class="pkg-card-img">
              <img
                src="https://images.unsplash.com/{pkg.img}?w=600&q=80"
                alt={pkg.name}
                loading="lazy"
              />
              {#if pkg.badge}<div class="pkg-badge">{pkg.badge}</div>{/if}
            </div>
            <div class="pkg-card-body">
              <h3>{pkg.name}</h3>
              <div class="pkg-meta">
                <span><i class="ri-time-line"></i> {pkg.days} Days</span>
                <span><i class="ri-map-pin-line"></i> {pkg.loc}</span>
                <span><i class="ri-star-fill"></i> {pkg.rating}</span>
              </div>
              <div class="pkg-price">
                <span class="amount">{pkg.price}</span><span class="per"
                  >/ person</span
                >
              </div>
              <button
                class="btn btn-primary btn-sm full-width-btn"
                on:click={() => bookOnBooking(pkg.loc)}>Book Now</button
              >
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<!-- Trending -->
<section class="section section-dark">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Hot Right Now</div>
      <h2 class="section-title">Trending Destinations</h2>
    </div>
    <div class="trending-grid" data-stagger>
      {#each trendingDestinations as t}
        <div class="trending-card">
          <img
            src="https://images.unsplash.com/{t.img}?w=600&q=80"
            alt={t.name}
            loading="lazy"
          />
          <div class="trending-card-overlay"></div>
          <div class="trending-card-info">
            <h3>{t.name}</h3>
            <p>Starting at {t.price}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section">
  <div class="container">
    <div class="cta-section" data-reveal>
      <div class="section-label">Ready?</div>
      <h2>Start Planning Your Dream India Trip</h2>
      <p>
        Join 12,000+ travelers who've discovered incredible India with Where
        Next.
      </p>
      <a href="/login" class="btn btn-primary"
        >Get Started <i class="ri-arrow-right-line"></i></a
      >
    </div>
  </div>
</section>

<!-- Timeline Modal -->
{#if showTimeline && timelineData}
  <div class="tl-modal" transition:fade={{ duration: 200 }}>
    <div class="tl-backdrop" on:click={closeTimeline}></div>
    <div class="tl-box">
      <button class="tl-close" on:click={closeTimeline}
        ><i class="ri-close-line"></i></button
      >
      <div class="tl-header">
        <h2>Your AI Journey</h2>
        <div class="tl-cost">Total: ₹{timelineData.total_cost}</div>
      </div>
      <div class="tl-body">
        {#each timelineData.locations as loc, i}
          <div class="tl-step">
            <div class="tl-node">
              <div class="tl-dot"></div>
              {#if i < timelineData.locations.length - 1}<div
                  class="tl-line"
                ></div>{/if}
            </div>
            <div class="tl-info">
              <h3>Day {i + 1}: {loc.name}</h3>
              <div class="tl-card">
                <img
                  src={loc.image ||
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80"}
                  alt={loc.name}
                  class="tl-img"
                />
                <div class="tl-details">
                  <div>
                    <strong><i class="ri-hotel-line"></i> Stay:</strong>
                    {loc.stay?.name || "Hotel"} (₹{loc.stay?.price || 0}/night)
                    <span
                      class="api-rating"
                      style="display:inline-flex;margin-left:6px;"
                      ><i class="ri-star-fill"></i>
                      {loc.stay?.rating || 4.5}</span
                    >
                  </div>
                  {#if loc.sightseeing?.length}
                    <div>
                      <strong><i class="ri-camera-lens-line"></i> See:</strong>
                      {loc.sightseeing.map((s) => s.name).join(", ")}
                    </div>
                  {/if}
                  <button
                    class="btn btn-sm btn-outline timeline-book-btn"
                    on:click|stopPropagation={() => bookOnBooking(loc.name)}
                  >
                    Book on Booking.com
                  </button>
                </div>
              </div>
              {#if timelineData.travel?.[i]}
                <div class="tl-travel">
                  <i class="ri-route-line"></i>
                  {timelineData.travel[i].from} → {timelineData.travel[i].to} via
                  {timelineData.travel[i].type} (₹{timelineData.travel[i]
                    .price}, {timelineData.travel[i].duration})
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

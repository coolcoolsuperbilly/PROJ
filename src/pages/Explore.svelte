<script>
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";

  let activeFilter = "All";
  function setFilter(f) {
    activeFilter = f;
  }

  onMount(() => {
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
  let searchBudget = 5000;
  let isSearching = false;
  let searchResults = null;
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

  function bookOnBooking(name) {
    window.open(
      `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(name)}`,
      "_blank",
    );
  }

  async function handleSearch() {
    if (!searchQuery.trim()) return;
    isSearching = true;
    errorMsg = "";
    try {
      const locations = searchQuery
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const res = await fetch("https://api.466marys.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locations, budget: searchBudget }),
      });
      const data = await res.json();
      if (data && data.data) {
        searchResults = data.data;
      } else {
        errorMsg = "Invalid data format received from API.";
      }
    } catch (e) {
      console.error("Search failed:", e);
      errorMsg = e.message || "Failed to fetch data. Please try again.";
    } finally {
      isSearching = false;
    }
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
    <h1 style="padding-top: 15%;">Create Your Own Tour Packages</h1>
    <p class="hero-label">AI-Powered Trip Planner</p>
    <p
      style="color:rgba(255,255,255,.7); margin-bottom: 24px; font-size: 0.95rem;"
    >
      Enter destinations and your budget — our AI builds the perfect package for
      you.
    </p>
    <form class="search-bar" on:submit|preventDefault={handleSearch}>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Destinations (e.g. Delhi, Agra, Jaipur)..."
        style="flex:2;"
        required
      />
      <input
        type="number"
        bind:value={searchBudget}
        placeholder="Budget ($)"
        min="100"
        style="flex:1; border-left: 1px solid rgba(255,255,255,0.1);"
        required
      />
      <button class="btn btn-primary" type="submit" disabled={isSearching}>
        {#if isSearching}
          <i class="ri-loader-4-line spin"></i>
        {:else}
          <i class="ri-magic-line"></i>
        {/if}
      </button>
    </form>
    {#if errorMsg}
      <div
        class="error-toast"
        style="margin-top:16px;padding:12px 20px;background:rgba(255,90,54,.15);color:#ff5a36;border:1px solid rgba(255,90,54,.3);border-radius:14px;font-size:.85rem;display:inline-flex;align-items:center;gap:8px;"
      >
        <i class="ri-error-warning-line"></i>
        {errorMsg}
      </div>
    {/if}
  </div>
</section>

<!-- Results -->
<section class="section section-dark">
  <div class="container">
    {#if searchResults}
      <!-- AI Package Card -->
      <div
        class="ai-pkg"
        on:click={() => openTimeline(searchResults)}
        data-reveal
      >
        <div class="ai-pkg-bg">
          <img
            src={searchResults.locations[0]?.image ||
              "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80"}
            alt="Package"
          />
          <div class="ai-pkg-overlay"></div>
        </div>
        <div class="ai-pkg-body">
          <span
            class="pkg-badge"
            style="position:relative;display:inline-block;margin-bottom:16px;"
            >AI Generated Package</span
          >
          <h2>
            The {searchResults.locations.map((l) => l.name).join(" → ")} Journey
          </h2>
          <p class="ai-pkg-meta">
            {searchResults.locations.length} Destinations • Budget:
            <strong>${searchResults.total_cost}</strong>
          </p>
          <div class="ai-pkg-tags">
            {#each searchResults.locations as loc}
              <span class="route-tag"
                ><i class="ri-map-pin-2-fill"></i> {loc.name}</span
              >
            {/each}
            {#if searchResults.travel}
              {#each searchResults.travel as t}
                <span class="route-tag"
                  ><i class="ri-route-line"></i>
                  {t.from} → {t.to} ({t.type})</span
                >
              {/each}
            {/if}
          </div>
          <div style="display:flex;gap:14px;margin-top:28px;flex-wrap:wrap;">
            <button
              class="btn btn-primary"
              on:click|stopPropagation={() => openTimeline(searchResults)}
            >
              <i class="ri-time-line"></i> View Timeline
            </button>
            <button
              class="btn btn-ghost"
              on:click|stopPropagation={() =>
                bookOnBooking(searchResults.locations[0]?.name || "")}
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
        {#each [{ img: "photo-1512343879784-a960bf40e7f2", name: "Goa Beach Retreat", days: 5, loc: "Goa", rating: 4.9, price: "₹18,999", badge: "Best Seller" }, { img: "photo-1626621341517-bbf3d9990a23", name: "Leh-Ladakh Expedition", days: 7, loc: "Ladakh", rating: 4.8, price: "₹32,499", badge: "Popular" }, { img: "photo-1599661046289-e31897846e41", name: "Rajasthan Heritage Tour", days: 6, loc: "Rajasthan", rating: 4.7, price: "₹24,999", badge: "New" }, { img: "photo-1564507592333-c60657eea523", name: "Taj Mahal & Agra Discovery", days: 4, loc: "Agra", rating: 4.9, price: "₹12,999", badge: "" }, { img: "photo-1602216056096-3b40cc0c9944", name: "Kerala Backwater Bliss", days: 8, loc: "Kerala", rating: 4.8, price: "₹21,499", badge: "Trending" }, { img: "photo-1477587458883-47145ed94245", name: "Himalayan Adventure Trek", days: 10, loc: "Himachal Pradesh", rating: 4.9, price: "₹28,999", badge: "" }] as pkg}
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
                class="btn btn-primary btn-sm"
                style="width:100%;justify-content:center"
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
      {#each [{ img: "photo-1602216056096-3b40cc0c9944", name: "Munnar", price: "₹14,999" }, { img: "photo-1599661046289-e31897846e41", name: "Udaipur", price: "₹16,499" }, { img: "photo-1477587458883-47145ed94245", name: "Rishikesh", price: "₹11,999" }] as t}
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
        <div class="tl-cost">Total: ${timelineData.total_cost}</div>
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
                    {loc.stay?.name || "Hotel"} (${loc.stay?.price || 0}/night)
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
                    class="btn btn-sm btn-outline"
                    style="padding:6px 12px;font-size:.75rem;margin-top:8px;"
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
                  {timelineData.travel[i].type} (${timelineData.travel[i]
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

<style>
  .spin {
    animation: spin 1s linear infinite;
    display: inline-block;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  /* AI Package Card */
  .ai-pkg {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    min-height: 340px;
    display: flex;
    align-items: flex-end;
    padding: 48px;
    cursor: pointer;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .ai-pkg:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
  }
  .ai-pkg-bg {
    position: absolute;
    inset: 0;
  }
  .ai-pkg-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ai-pkg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.4) 55%,
      rgba(0, 0, 0, 0.15) 100%
    );
  }
  .ai-pkg-body {
    position: relative;
    z-index: 1;
    width: 100%;
  }
  .ai-pkg-body h2 {
    font-size: clamp(1.6rem, 3.5vw, 2.5rem);
    color: #fff;
    font-family: "Outfit";
    font-weight: 800;
    margin-bottom: 12px;
  }
  .ai-pkg-meta {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 16px;
  }
  .ai-pkg-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .route-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .route-tag {
    background: rgba(255, 255, 255, 0.06);
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 0.75rem;
    color: var(--text-light);
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .route-tag i {
    color: var(--accent);
  }

  /* Timeline Modal */
  .tl-modal {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .tl-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);
  }
  .tl-box {
    position: relative;
    z-index: 1;
    background: var(--bg2);
    width: 100%;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 40px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  }
  .tl-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 1.4rem;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
  }
  .tl-close:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  .tl-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .tl-header h2 {
    font-size: 1.8rem;
    color: #fff;
    font-family: "Outfit";
    margin-bottom: 6px;
  }
  .tl-cost {
    color: var(--accent);
    font-weight: 700;
    font-size: 1.1rem;
  }
  .tl-step {
    display: flex;
    gap: 20px;
  }
  .tl-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20px;
  }
  .tl-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--accent);
    border: 3px solid var(--bg2);
    outline: 2px solid var(--accent);
    flex-shrink: 0;
    margin-top: 6px;
  }
  .tl-line {
    width: 2px;
    background: rgba(255, 255, 255, 0.08);
    flex-grow: 1;
    margin-top: 6px;
  }
  .tl-info {
    flex: 1;
    padding-bottom: 32px;
  }
  .tl-info h3 {
    font-size: 1.15rem;
    color: #fff;
    font-family: "Outfit";
    margin-bottom: 14px;
  }
  .tl-card {
    display: flex;
    gap: 14px;
    background: rgba(255, 255, 255, 0.03);
    padding: 14px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .tl-img {
    width: 90px;
    height: 90px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
  }
  .tl-details {
    flex: 1;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .tl-details strong {
    color: #fff;
  }
  .tl-travel {
    margin-top: 14px;
    padding: 10px 14px;
    background: rgba(255, 90, 54, 0.08);
    border-left: 3px solid var(--accent);
    border-radius: 0 8px 8px 0;
    font-size: 0.82rem;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  @media (max-width: 768px) {
    .ai-pkg {
      padding: 24px;
      min-height: 280px;
    }
    .ai-pkg-body h2 {
      font-size: 1.4rem;
    }
    .tl-box {
      padding: 24px;
    }
    .tl-card {
      flex-direction: column;
    }
    .tl-img {
      width: 100%;
      height: 140px;
    }
  }
</style>

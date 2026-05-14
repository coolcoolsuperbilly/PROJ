<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { teamMembers } from "../../public/data.js";

  onMount(() => {
    if (window.ScrollReveal) window.ScrollReveal().sync();
  });
</script>

<svelte:head>
  <title>About Us - Where Next</title>
  <meta name="description" content="Meet the team behind Where Next, your trusted partner for extraordinary travel experiences across incredible India." />
</svelte:head>

<section class="explore-hero" in:fade={{ duration: 600 }}>
  <img
    class="explore-hero-bg"
    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80"
    alt="Udaipur Palace"
  />
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title" style="padding-top: 15%;">About Us</h1>
    <p class="hero-label">The team behind Where Next</p>
  </div>
</section>

<section class="section" id="team">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="section-label">Our Team</div>
      <h2 class="section-title">We are the Developers</h2>
      <p class="section-subtitle">
        A passionate team of 5 developers dedicated to bringing you the best
        travel experiences across India.
      </p>
    </div>

    <div class="team-grid" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; margin-top: 50px;">
      {#each teamMembers as member}
        <div class="team-member" style="text-align: center; width: 200px;">
          <img
            src={member.img}
            alt={member.name}
            style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 3px solid var(--primary);"
          />
          <h3 style="font-size: 1.2rem; margin-bottom: 5px;">{member.name}</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">
            {member.role}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

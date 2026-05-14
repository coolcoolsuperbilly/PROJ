<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { teamMembers } from "../../public/data.js";
  import "./about.css";

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

    <div class="team-grid">
      {#each teamMembers as member}
        <div class="team-member">
          <img
            src={member.img}
            alt={member.name}
            class="team-member-img"
          />
          <h3 class="team-member-name">{member.name}</h3>
          <p class="team-member-role">
            {member.role}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  onMount(() => {
    if (window.ScrollReveal) window.ScrollReveal().sync();
  });
</script>

<section class="explore-hero" in:fade={{ duration: 600 }}>
  <img
    class="explore-hero-bg"
    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80"
    alt="Udaipur Palace"
  />
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 style="padding-top: 15%;">About Us</h1>
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

    <div
      style="display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; margin-top: 50px;"
    >
      {#each [{ name: "Aarav Sharma", role: "Lead Developer", img: "https://i.pravatar.cc/150?img=11" }, { name: "Priya Patel", role: "Frontend Engineer", img: "https://i.pravatar.cc/150?img=5" }, { name: "Rohan Verma", role: "Backend Developer", img: "https://i.pravatar.cc/150?img=13" }, { name: "Neha Singh", role: "UI/UX Designer", img: "https://i.pravatar.cc/150?img=9" }, { name: "Vikram Reddy", role: "Full Stack Developer", img: "https://i.pravatar.cc/150?img=15" }] as member}
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

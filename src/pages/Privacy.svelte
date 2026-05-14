<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  onMount(() => {
    if (window.ScrollReveal) window.ScrollReveal().sync();
  });
</script>

<svelte:head>
  <title>Privacy Policy - Where Next</title>
  <meta
    name="description"
    content="Privacy Policy for Where Next detailing how we handle your data."
  />
</svelte:head>

<section
  class="explore-hero"
  style="height: 40vh; min-height: 300px;"
  in:fade={{ duration: 600 }}
>
  <div class="hero-overlay" style="background: rgba(0,0,0,0.7)"></div>
  <div class="hero-content">
    <h1 class="hero-title" style="padding-top: 10%;">Privacy Policy</h1>
    <p class="hero-label">How we handle your data</p>
  </div>
</section>

<section class="section">
  <div
    class="container"
    style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: var(--text-muted);"
  >
    <h2 style="color: var(--text); margin-bottom: 20px;">
      1. Information We Collect
    </h2>
    <p style="margin-bottom: 20px;">
      We Dont collect information you provide directly to us, such as when you
      create or modify your account, request on-demand services, contact
      customer support, or otherwise communicate with us. This information may
      include: name, email, phone number, postal address, profile picture,
      payment method, items requested, delivery notes, and other information you
      choose to provide.
    </p>

    <h2 style="color: var(--text); margin-bottom: 20px;">2. Contact Us</h2>
    <p>
      If you have any questions about this Privacy Statement, please contact us.
    </p>
  </div>
</section>

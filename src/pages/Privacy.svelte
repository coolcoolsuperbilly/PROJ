<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import "./document.css";

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
  class="explore-hero document-hero"
  in:fade={{ duration: 600 }}
>
  <div class="hero-overlay document-hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title document-hero-title">Privacy Policy</h1>
    <p class="hero-label">How we handle your data</p>
  </div>
</section>

<section class="section">
  <div class="container document-container">
    <h2 class="document-heading">
      1. Information We Collect
    </h2>
    <p class="document-paragraph">
      We Dont collect information you provide directly to us, such as when you
      create or modify your account, request on-demand services, contact
      customer support, or otherwise communicate with us. This information may
      include: name, email, phone number, postal address, profile picture,
      payment method, items requested, delivery notes, and other information you
      choose to provide.
    </p>

    <h2 class="document-heading">2. Contact Us</h2>
    <p class="document-paragraph">
      If you have any questions about this Privacy Statement, please contact us.
    </p>
  </div>
</section>

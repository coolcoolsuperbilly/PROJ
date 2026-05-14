<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  onMount(() => {
    if (window.ScrollReveal) window.ScrollReveal().sync();
  });
</script>

<svelte:head>
  <title>Terms of Service - Where Next</title>
  <meta
    name="description"
    content="Terms of Service and conditions for using the Where Next platform."
  />
</svelte:head>

<section
  class="explore-hero"
  style="height: 40vh; min-height: 300px;"
  in:fade={{ duration: 600 }}
>
  <div class="hero-overlay" style="background: rgba(0,0,0,0.7)"></div>
  <div class="hero-content">
    <h1 class="hero-title" style="padding-top: 10%;">Terms of Service</h1>
    <p class="hero-label">The rules of the Site</p>
  </div>
</section>

<section class="section">
  <div
    class="container"
    style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: var(--text-muted);"
  >
    <h2 style="color: var(--text); margin-bottom: 20px;">
      1. Acceptance of Terms
    </h2>
    <p style="margin-bottom: 20px;">
      By accessing and using the Where Next website, you accept and agree to be
      bound by the terms and provision of this agreement. In addition, when
      using these particular services, you shall be subject to any posted
      guidelines or rules applicable to such services.
    </p>

    <h2 style="color: var(--text); margin-bottom: 20px;">2. Governing Law</h2>
    <p>
      This agreement shall be governed by the laws of India. Any disputes
      arising out of or related to these terms shall be subject to the exclusive
      jurisdiction of the courts located in New Delhi, India.
    </p>
  </div>
</section>

<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import "./document.css";

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
  class="explore-hero document-hero"
  in:fade={{ duration: 600 }}
>
  <div class="hero-overlay document-hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title document-hero-title">Terms of Service</h1>
    <p class="hero-label">The rules of the Site</p>
  </div>
</section>

<section class="section">
  <div class="container document-container">
    <h2 class="document-heading">
      1. Acceptance of Terms
    </h2>
    <p class="document-paragraph">
      By accessing and using the Where Next website, you accept and agree to be
      bound by the terms and provision of this agreement. In addition, when
      using these particular services, you shall be subject to any posted
      guidelines or rules applicable to such services.
    </p>

    <h2 class="document-heading">2. Governing Law</h2>
    <p class="document-paragraph">
      This agreement shall be governed by the laws of India. Any disputes
      arising out of or related to these terms shall be subject to the exclusive
      jurisdiction of the courts located in New Delhi, India.
    </p>
  </div>
</section>

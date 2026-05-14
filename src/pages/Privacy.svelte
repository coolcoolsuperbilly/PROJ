<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  onMount(() => {
    if (window.ScrollReveal) window.ScrollReveal().sync();
  });
</script>

<section class="explore-hero" style="height: 40vh; min-height: 300px;" in:fade={{ duration: 600 }}>
  <div class="hero-overlay" style="background: rgba(0,0,0,0.7)"></div>
  <div class="hero-content">
    <h1 style="padding-top: 10%;">Privacy Policy</h1>
    <p class="hero-label">How we handle your data</p>
  </div>
</section>

<section class="section">
  <div class="container" style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: var(--text-muted);">
    <h2 style="color: var(--text); margin-bottom: 20px;">1. Information We Collect</h2>
    <p style="margin-bottom: 20px;">We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested, delivery notes, and other information you choose to provide.</p>
    
    <h2 style="color: var(--text); margin-bottom: 20px;">2. Use of Information</h2>
    <p style="margin-bottom: 20px;">We may use the information we collect about you to provide, maintain, and improve our services, including, for example, to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.</p>
    
    <h2 style="color: var(--text); margin-bottom: 20px;">3. Sharing of Information</h2>
    <p style="margin-bottom: 20px;">We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: with third parties to provide you a service you requested through a partnership or promotional offering made by a third party or us; with the general public if you submit content in a public forum, such as blog comments, social media posts, or other features of our Services that are viewable by the general public.</p>

    <h2 style="color: var(--text); margin-bottom: 20px;">4. Data Security</h2>
    <p style="margin-bottom: 20px;">We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>

    <h2 style="color: var(--text); margin-bottom: 20px;">5. Contact Us</h2>
    <p>If you have any questions about this Privacy Statement, please contact us at privacy@wherenext.in.</p>
  </div>
</section>

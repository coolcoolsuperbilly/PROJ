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
    <h1 style="padding-top: 10%;">Terms of Service</h1>
    <p class="hero-label">The rules of the road</p>
  </div>
</section>

<section class="section">
  <div class="container" style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: var(--text-muted);">
    <h2 style="color: var(--text); margin-bottom: 20px;">1. Acceptance of Terms</h2>
    <p style="margin-bottom: 20px;">By accessing and using the Where Next website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
    
    <h2 style="color: var(--text); margin-bottom: 20px;">2. Description of Service</h2>
    <p style="margin-bottom: 20px;">Where Next provides users with access to a rich collection of travel resources, including trip planning tools, personalized itineraries, and booking services (the "Service"). You understand and agree that the Service may include advertisements and that these advertisements are necessary for Where Next to provide the Service.</p>
    
    <h2 style="color: var(--text); margin-bottom: 20px;">3. User Conduct</h2>
    <p style="margin-bottom: 20px;">You understand that all information, data, text, software, music, sound, photographs, graphics, video, messages or other materials, whether publicly posted or privately transmitted, are the sole responsibility of the person from which such content originated.</p>

    <h2 style="color: var(--text); margin-bottom: 20px;">4. Modifications to Service</h2>
    <p style="margin-bottom: 20px;">Where Next reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Where Next shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.</p>

    <h2 style="color: var(--text); margin-bottom: 20px;">5. Governing Law</h2>
    <p>This agreement shall be governed by the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.</p>
  </div>
</section>

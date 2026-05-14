<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import "./contact.css";

  onMount(() => {
    if (window.ScrollReveal) window.ScrollReveal().sync();
  });
</script>

<svelte:head>
  <title>Contact Us - Where Next</title>
  <meta
    name="description"
    content="Contact the Where Next team for any inquiries about your Indian travel adventure."
  />
</svelte:head>

<section class="explore-hero" in:fade={{ duration: 600 }}>
  <img
    class="explore-hero-bg"
    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80"
    alt="Jodhpur Blue City"
  />
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title" style="padding-top: 15%;">Contact Us</h1>
    <p class="hero-label">We'd love your response</p>
  </div>
</section>

<section class="section" id="contact-form">
  <div class="container contact-container">
    <div class="login-card contact-card">
      <h2>Send us a message</h2>
      <form
        action="mailto:contact@wherenext.in"
        method="POST"
        enctype="text/plain"
      >
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Your Name" required />
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" placeholder="you@mail.com" required />
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input
            type="text"
            id="subject"
            placeholder="Inquiry about trips"
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            rows="5"
            placeholder="How can we help you?"
            required
            class="contact-textarea"
          ></textarea>
        </div>
        <button
          type="submit"
          class="login-btn"
          style="width: 100%; margin-top: 20px;">Send Message</button
        >
      </form>
    </div>
  </div>
</section>

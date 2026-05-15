<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Home from "./pages/Home.svelte";
  import Explore from "./pages/Explore.svelte";
  import Login from "./pages/Login.svelte";
  import About from "./pages/About.svelte";
  import Contact from "./pages/Contact.svelte";
  import Privacy from "./pages/Privacy.svelte";
  import Terms from "./pages/Terms.svelte";

  let currentPath = window.location.pathname;

  let user = "";

  function getCookie(name) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");

      if (key === name) {
        return decodeURIComponent(value);
      }
    }

    return null;
  }

  // Normalize trailing slashes
  function normalizePath(p) {
    return p === "/" ? "/" : p.replace(/\/$/, "");
  }

  function navigate(path) {
    window.scrollTo(0, 0);
    history.pushState({}, "", path);
    currentPath = normalizePath(path);
  }

  onMount(() => {
    currentPath = normalizePath(window.location.pathname);

    user = getCookie("user") || "";

    window.addEventListener("popstate", () => {
      currentPath = normalizePath(window.location.pathname);
    });

    // Intercept all internal <a> clicks for client-side navigation
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a || !a.href) return;

      // If the link has data-reload, let the browser handle it (force reload)
      if (a.hasAttribute("data-reload")) return;

      const url = new URL(a.href);
      if (url.origin !== window.location.origin) return;
      if (url.hash && normalizePath(url.pathname) === currentPath) return; // same-page hash scroll
      if (url.hash) navigate(url.pathname + url.hash);

      // Internal page link — navigate client-side
      if (
        [
          "/explore",
          "/login",
          "/",
          "/about",
          "/contact",
          "/privacy",
          "/terms",
        ].includes(normalizePath(url.pathname))
      ) {
        e.preventDefault();
        navigate(url.pathname + url.hash);
      }
    });
  });

  // Determine which page to show
  $: isLogin = currentPath === "/login";
  $: isExplore = currentPath === "/explore";
  $: isAbout = currentPath === "/about";
  $: isContact = currentPath === "/contact";
  $: isPrivacy = currentPath === "/privacy";
  $: isTerms = currentPath === "/terms";
  $: isHome =
    !isLogin && !isExplore && !isAbout && !isContact && !isPrivacy && !isTerms;

  // Active nav link
  $: activeNav = isExplore
    ? "explore"
    : isAbout
      ? "about"
      : isContact
        ? "contact"
        : isPrivacy
          ? "privacy"
          : isTerms
            ? "terms"
            : isHome
              ? "home"
              : "";

  // Navbar scroll state
  let scrolled = false;
  onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 60;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  // Mobile menu
  let menuOpen = false;
  function toggleMenu() {
    menuOpen = !menuOpen;
  }
  function closeMenu() {
    menuOpen = false;
  }
</script>

{#if !isLogin}
  <!-- Navbar -->
  <nav class="navbar" class:scrolled={scrolled || isExplore} id="navbar">
    <div class="nav-container">
      <a href="/" class="logo">where<span>next</span></a>
      <ul class="nav-menu" class:open={menuOpen} id="navMenu">
        <li>
          <a href="/" class:active={activeNav === "home"} on:click={closeMenu}
            >Home</a
          >
        </li>
        <li>
          <a
            href="/explore"
            class:active={activeNav === "explore"}
            on:click={closeMenu}>Explore</a
          >
        </li>
        <li>
          <a
            href="/about"
            class:active={activeNav === "about"}
            on:click={closeMenu}>About Us</a
          >
        </li>
        <li>
          <a
            href="/contact"
            class:active={activeNav === "contact"}
            on:click={closeMenu}>Contact</a
          >
        </li>
      </ul>
      <div class="nav-right">
        {#if user}
          <span class="nav-cta">{user}</span>
        {:else}
          <a href="/login" class="nav-cta">Sign In</a>
        {/if}

        <button class="mobile-toggle" on:click={toggleMenu}>
          <i class={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>
    </div>
  </nav>
{/if}

<!-- Page content -->
{#key currentPath}
  <div>
    {#if isLogin}
      <Login />
    {:else if isExplore}
      <Explore />
    {:else if isAbout}
      <About />
    {:else if isContact}
      <Contact />
    {:else if isPrivacy}
      <Privacy />
    {:else if isTerms}
      <Terms />
    {:else}
      <Home />
    {/if}
  </div>
{/key}

{#if !isLogin}
  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="logo">where<span>next</span></a>
          <p>
            Your trusted partner for extraordinary travel experiences across
            incredible India. Let us take you places.
          </p>
        </div>
        <div>
          <h4>Company</h4>
          <ul class="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/explore">Explore</a></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul class="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="https://www.instagram.com/wherenext">Instagram</a></li>
            <li><a href="https://www.youtube.com/@wherenext">YouTube</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul class="footer-links">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">© 2026 Where Next. All rights reserved.</div>
    </div>
  </footer>
{/if}

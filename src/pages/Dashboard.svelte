<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import "./dashboard.css";
    let user = "";
    function logout() {
        document.cookie = "user=;path=/;";
    }
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

    onMount(() => {
        if (window.ScrollReveal) window.ScrollReveal().sync();
        if (!getCookie("user") || getCookie("user") === "") {
            window.location.href = "/login";
        } else {
            user = getCookie("user");
        }
    });
</script>

<svelte:head>
    <title>Dashboard - Where Next</title>
    <meta name="description" content="Dashboard" />
</svelte:head>

<section class="explore-hero" in:fade={{ duration: 600 }}>
    <img
        class="explore-hero-bg"
        src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80"
        alt="Jodhpur Blue City"
    />
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <h1 class="hero-title" style="padding-top: 15%;">
            Welcome {user} !
        </h1>
        <p class="hero-label">DASHBOARD</p>
    </div>
</section>
<section class="section section-dark">
    <div class="container">
        <h2>Dashboard</h2>
        Explore Our Custom Made Packages :<a
            href="/explore"
            class="btn btn-primary btn-sm explore-link">Explore Packages</a
        ><br />
        Logout From The Site:
        <a
            href="/login"
            on:click={logout}
            class="btn btn-primary btn-sm explore-link"
            >Logout
        </a>
    </div>
</section>

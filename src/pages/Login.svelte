<script>
  const API_BASE = "https://tripadvisorjsonapi.val.run";

  let isLogin = true;

  let loginData = {
    email: "",
    password: "",
  };

  let signupData = {
    name: "",
    email: "",
    password: "",
  };

  let loading = false;
  let error = "";
  let success = "";

  async function handleLogin(e) {
    e.preventDefault();

    error = "";
    success = "";
    loading = true;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      document.cookie = `user=${encodeURIComponent(data.user.name || data.user)}; path=/; max-age=604800`;

      success = "Login successful!";

      console.log("Logged in user:", data.user);

      // window.location.href = "/dashboard";
      window.location.href = "/";
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function handleSignup(e) {
    e.preventDefault();

    error = "";
    success = "";
    loading = true;

    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      document.cookie = `user=${encodeURIComponent(data.user.name || data.user)}; path=/; max-age=604800`;

      success = "Account created successfully!";

      signupData = {
        name: "",
        email: "",
        password: "",
      };

      isLogin = true;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="login-page">
  <!-- Left -->
  <div class="login-visual">
    <img
      src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80"
      alt="Taj Mahal at sunrise"
    />

    <div class="login-visual-overlay"></div>

    <div class="login-visual-text">
      <h2>Your next Indian<br />adventure awaits.</h2>
      <p>Join 12,000+ travelers exploring incredible India with Where Next.</p>
    </div>
  </div>

  <!-- Right -->
  <div class="login-form-side">
    <div class="login-card">
      <a
        href="/"
        class="logo"
        style="color:var(--text);margin-bottom:40px;display:inline-block;font-size:1.6rem"
      >
        where<span>next</span>
      </a>

      <h1>{isLogin ? "Welcome back" : "Create account"}</h1>

      <p class="subtitle">
        {#if isLogin}
          Sign in to continue planning your trips.
        {:else}
          Start planning your next adventure.
        {/if}
      </p>

      {#if error}
        <div class="message error">{error}</div>
      {/if}

      {#if success}
        <div class="message success">{success}</div>
      {/if}

      {#if isLogin}
        <!-- LOGIN -->
        <form on:submit={handleLogin}>
          <div class="form-group">
            <label for="login-email">Email Address</label>
            <input
              type="email"
              id="login-email"
              bind:value={loginData.email}
              placeholder="you@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              bind:value={loginData.password}
              placeholder="••••••••"
              required
            />
          </div>

          <div class="form-row">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" class="login-btn" disabled={loading}>
            {#if loading}
              Signing In...
            {:else}
              Sign In
            {/if}
          </button>
        </form>
      {:else}
        <!-- SIGNUP -->
        <form on:submit={handleSignup}>
          <div class="form-group">
            <label for="signup-name">Full Name</label>
            <input
              type="text"
              id="signup-name"
              bind:value={signupData.name}
              placeholder="John Doe"
              required
            />
          </div>

          <div class="form-group">
            <label for="signup-email">Email Address</label>
            <input
              type="email"
              id="signup-email"
              bind:value={signupData.email}
              placeholder="you@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="signup-password">Password</label>
            <input
              type="password"
              id="signup-password"
              bind:value={signupData.password}
              placeholder="Create password"
              required
            />
          </div>

          <button type="submit" class="login-btn" disabled={loading}>
            {#if loading}
              Creating Account...
            {:else}
              Create Account
            {/if}
          </button>
        </form>
      {/if}

      <div class="login-footer">
        {#if isLogin}
          Don't have an account?
          <button
            type="button"
            class="switch-btn"
            on:click={() => {
              error = "";
              success = "";
              isLogin = false;
            }}
          >
            Sign up free
          </button>
        {:else}
          Already have an account?
          <button
            type="button"
            class="switch-btn"
            on:click={() => {
              error = "";
              success = "";
              isLogin = true;
            }}
          >
            Sign In
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .message {
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 18px;
    font-size: 0.95rem;
  }

  .error {
    background: rgba(255, 0, 0, 0.08);
    color: #d11a2a;
  }

  .success {
    background: rgba(0, 180, 80, 0.1);
    color: #008f4c;
  }

  .switch-btn {
    background: none;
    border: none;
    color: #0b63f6;
    cursor: pointer;
    font-weight: 600;
    padding: 0;
    margin-left: 4px;
  }

  .switch-btn:hover {
    text-decoration: underline;
  }

  .login-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
</style>

<script>
import { defineComponent, reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { authState, authenticated, logout } from './services/user.service'
import router from './router'

export default{
  name: 'App',
  data() {
    return {
      auth: false,
    }
  },
  beforeMount() {
    authState.getState().subscribe((state) => {
      this.auth = state;
    });
    authenticated();
  },
  methods: {
    handleLogout() {
      const token = JSON.parse(localStorage.getItem('user')).token;
      logout(token);
      localStorage.removeItem('user');
      router.push('/');
    }
  },
}
</script>

<template>
  <header style="display: flex; justify-content: center;">
    <div class="wrapper">
      <nav style="display: flex;">
        <RouterLink v-show="auth" to="/profile">Profile</RouterLink>
        <RouterLink v-show="auth" to="/play">Play</RouterLink>
        <RouterLink v-show="auth" to="/high-scores">High Scores</RouterLink>
        <button v-show="auth" v-on:click="handleLogout()" class="btn btn-primary">Log out</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

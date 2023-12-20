<script setup lang="ts">
import SignUpForm from '../components/SignUpForm.vue'
import LoginForm from '../components/Login.vue'
</script>

<template>
  <main class="flex gap-16 main">
    <SignUpForm />
    <LoginForm />
  </main>
</template>

<style scoped>

.main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
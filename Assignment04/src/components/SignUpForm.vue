<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'SignUpForm',
  setup() {
    const formFields = reactive({
      username: '',
      password: ''
    })

    const handleSignUp = async () => {
      console.log('Sign up successful: ', formFields.username, formFields.password)
    }

    return {
      formFields,
      handleSignUp
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-xl font-semibold">Sign Up</h2>
    <form class="flex flex-col gap-4" @submit.prevent="handleSignUp">
      <div>
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          type="text"
          class="input input-bordered"
          name="username"
          v-model="formFields.username"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          v-model="formFields.password"
          class="input input-bordered"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign up</button>
    </form>
  </div>
</template>

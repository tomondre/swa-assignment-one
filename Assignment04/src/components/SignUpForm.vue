<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { signUp } from '../services/user.service'
import { login } from '../services/user.service'
import router from '../router'

export default defineComponent({
  name: 'SignUpForm',
  setup() {
    const formFields = reactive({
      username: '',
      password: ''
    })

    const handleSignUp = async () => {
      if(formFields.username && formFields.password){
        const response = await signUp(formFields.username, formFields.password);
        if(response){
          const authenticated = await login(formFields.username, formFields.password);
          if(authenticated){
            router.push('/profile');
          }
        }
        else{
          console.log("Sign up failed");
        }
        console.log(response);
      }
      else{
        console.log("Please enter a username and password");
      }
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

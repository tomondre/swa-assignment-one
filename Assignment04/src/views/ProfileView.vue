<script>
import { defineComponent, reactive } from 'vue'
import { signUp } from '../services/user.service'
import { login } from '../services/user.service'

export default defineComponent({
  name: 'ProfileForm',
  setup() {
    const formFields = reactive({
      username: '',
      password: ''
    })

    const handleUpdate = async () => {
      if(formFields.username && formFields.password){
        const response = await updateProfile(formFields.username, formFields.password);
        console.log(response);
      }
      else{
        console.log("Please enter a username and password");
      }
    }

    return {
      formFields,
      handleUpdate
    }
  }
})
</script>

<template>
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-semibold">Profile</h2>
      <form class="flex flex-col gap-4" @submit.prevent="handleUpdate">
        <div>
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input
            type="text"
            class="input input-bordered"
            name="username"
            v-model="formFields.username"
            disabled={true}
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
        <button type="submit" class="btn btn-primary w-fit">Update</button>
      </form>
    </div>
</template>

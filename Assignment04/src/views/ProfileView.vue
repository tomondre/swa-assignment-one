<script>
import { defineComponent, reactive } from 'vue'
import { signUp, login, getProfile, updateProfile } from '../services/user.service'

export default defineComponent({
  name: 'ProfileForm',
  setup() {
    const formFields = reactive({
      username: '',
      password: ''
    })

    const handleUpdate = async () => {
      if(formFields.username && formFields.password){
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await updateProfile(user.token, user.userId, {username : formFields.username, password: formFields.password});
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
  },
  async beforeMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await getProfile(user.token, user.userId);
    if(response){
      this.formFields.username = response.username;
      this.formFields.password = response.password;
    }
  },
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

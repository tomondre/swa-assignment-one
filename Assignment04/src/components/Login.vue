    <script lang="ts">
      import { defineComponent, reactive } from 'vue';
      import { login } from '../services/user.service'

      export default defineComponent({
        name: 'LoginForm',
        setup() {
          const formFields = reactive({
            username: '',
            password: ''
          })

          const handleLogin = async() => {
            if(formFields.username && formFields.password){
              const response = await login(formFields.username, formFields.password);
              if(response){
                // this.$router.push('/profile');
              }
            }
          }

          return {
            formFields,
            handleLogin
          }
        }
      })
    </script>

  <template>
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-semibold">Log In</h2>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div>
          <label class="label">
              <span class="label-text">Username</span>
            </label>
          <input 
            type="text" 
            class="input input-bordered"
            placeholder="Enter your username"
            name="username"
            v-model="formFields.username" 
          />
        </div>
        <div>
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            type="password"
            class="input input-bordered"
            placeholder="Enter your username"
            name="password"
            v-model="formFields.password" 
          />
        </div>
        <button type="submit" class="btn btn-primary">Log In</button>
      </form>
    </div>
  </template>

    <script setup lang="ts">
      import { ref } from 'vue';
      const username = ref('');
      const password = ref('');

      async function submit() {
        console.log("Logging in... ", username.value, password.value);
      }


    </script>

  <template>
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Log In</h2>
      <form @submit.prevent="submit" className="flex flex-col gap-4">
        <div>
          <label className="label">
              <span className="label-text">Username</span>
            </label>
          <input 
            type="text" 
            className="input input-bordered"
            placeholder="Enter your username"
            name="username"
            v-model="username" 
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            placeholder="Enter your username"
            name="password"
            v-model="password" 
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  </template>

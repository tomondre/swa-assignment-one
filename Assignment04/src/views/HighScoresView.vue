<script>
import {defineComponent} from "vue";
import { getPersonalBestGames, getOverallBestGames } from '../services/game.service'

export default defineComponent({
  name: 'PlayView',
  data() {
    return {
      personalBestGames: [],
      overallBestGames: []
    }
  },
  async beforeMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    this.personalBestGames = await getPersonalBestGames(currentUser.userId, currentUser.token);
    this.overallBestGames = await getOverallBestGames(currentUser.token);
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-xl font-semibold">High scores</h1>
    <div>
      <h2 class="text-lg">Personal best scores:</h2>
      <ul>
        <li v-for="game in personalBestGames" :key="game.id">
          <span>
            {{ game.score }} (game id: {{ game.id }})
          </span>
        </li>
      </ul>
    </div>
    <div>
      <h2 class="text-lg">All high scores:</h2>
      <ul>
        <li v-for="game in overallBestGames" :key="game.id">
          <span>
            {{ game.score }} (game id: {{ game.id }})
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

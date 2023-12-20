<script>
import { defineComponent, reactive, ref } from 'vue'
import { startGame, getGame } from '../services/game.service'
import { create } from '../model/board.utils'
import { CyclicGenerator } from '../model/board'

export default defineComponent({
  name: 'PlayView',
  data() {
    return {
      board: [6][6],
      numberOfMoves: 10,
      score: 0
    }
  },
  async beforeMount() {
    const lastGame = JSON.parse(localStorage.getItem('game'))
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (lastGame) {
      const response = await getGame(lastGame.id, currentUser.token)

      if (response) {
        this.board = response.board
        this.numberOfMoves = response.numberOfMoves
        this.score = response.score
      } else {
        //Create new game
        this.board = await this.createNewGame()
        this.numberOfMoves = 10
        this.score = 0
      }
    } else {
      //Create new game
      this.board = await this.createNewGame()
      this.numberOfMoves = 10
      this.score = 0
    }
  },
  methods: {
    async createNewGame() {
      const generator = new CyclicGenerator('ABCDA')
      const board = create(generator, 6, 6)
      // start new game
      const currentUser = JSON.parse(localStorage.getItem('user'))

      const response = await startGame({
        user: currentUser.userId,
        board,
        score: 0,
        numberOfMoves: 10,
        completed: false,
        token: currentUser.token
      })

      console.log('startgame response: ', response)
      // localStorage.setItem('game', JSON.stringify(response))

      return board.grid
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h2 class="text-xl font-semibold">Match3 Game</h2>
    <div class="text-lg">Score: {{ score }}</div>
    <div class="text-lg">Number of moves left: {{ numberOfMoves }}</div>
    <div class="flex flex-col gap-2">
      <button v-if="numberOfMoves === 0" class="btn btn-primary" v-on:click="startNewGame()">
        Start new game!
      </button>
      <div v-if="board">
        <div v-for="(row, rowIndex) in board" :key="rowIndex" class="flex flex-row gap-2">
          <div
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :data-row-id="rowIndex"
            :data-id="cellIndex"
            :class="[
              'w-12 h-12 bg-base-300 rounded-md',
              cell === 'A'
                ? 'bg-red-400'
                : cell === 'B'
                  ? 'bg-green-400'
                  : cell === 'C'
                    ? 'bg-blue-400'
                    : 'bg-yellow-400'
            ]"
            draggable="true"
            @dragstart="dragStart"
            @dragover.prevent
            @dragenter.prevent
            @dragleave.prevent
            @drop="dragDrop"
          >
            <!-- {{ cell }} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

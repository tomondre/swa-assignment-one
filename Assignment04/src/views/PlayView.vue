<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { startGame, getGame, updateGame } from '../services/game.service'
import { type UserData } from '../types/user-data'
import { create, move } from '../model/board.utils'
import { CyclicGenerator, type Board, type Position } from '../model/board'
import type { GameDataWithToken } from '@/types/game-data'

type TData = {
  currentGame: GameDataWithToken | null
  board: Board<string> | null
  numberOfMoves: number
  score: number
  initialPosition: Position | null
  generator: CyclicGenerator
  user: UserData
}

export default defineComponent({
  name: 'PlayView',
  data() {
    return {
      currentGame: null,
      board: { width: 6, height: 6, grid: [...Array(6)].map(() => Array(6)) } as Board<string>,
      numberOfMoves: 10,
      score: 0,
      initialPosition: null,
      generator: new CyclicGenerator('ABCDA'),
      user: JSON.parse(localStorage.getItem('user')!)
    } as TData
  },
  async beforeMount() {
    const lastGame = JSON.parse(localStorage.getItem('game')!)
    const currentUser = JSON.parse(localStorage.getItem('user')!)
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
      const board = create(this.generator, 6, 6)
      // start new game

      const newBoard = {
        user: this.user.userId,
        board,
        score: 0,
        numberOfMoves: 10,
        completed: false,
        token: this.user.token
      } as GameDataWithToken

      const response = await startGame(newBoard)

      console.log('new game: ', response)

      this.currentGame = {
        board: newBoard.board,
        id: response.id,
        completed: response.completed,
        score: response.score,
        user: response.user,
        numberOfMoves: this.numberOfMoves,
        token: this.user.token!
      }

      this.board = newBoard.board

      localStorage.setItem('game', JSON.stringify(this.currentGame))

      return board
    },

    async startNewGame() {
      const generatedBoard = create(this.generator, 6, 6)
      this.board = generatedBoard

      if (this.generator && this.user.userId && this.user.token) {
        await startGame({
          user: this.user.userId,
          score: this.score,
          completed: false,
          token: this.user.token,
          board: generatedBoard,
          numberOfMoves: 10
        })
        this.score = 0
        this.numberOfMoves = 10
      }
    },

    dragStart(event: DragEvent) {
      const targetElement = event.currentTarget as HTMLElement
      this.initialPosition = {
        row: +targetElement.getAttribute('data-row-id')!,
        col: +targetElement.getAttribute('data-id')!
      }
    },

    async dragDrop(event: DragEvent) {
      if (this.board && this.initialPosition) {
        const targetElement = event.currentTarget as HTMLElement
        const finalPosition: Position = {
          row: +targetElement.getAttribute('data-row-id')!,
          col: +targetElement.getAttribute('data-id')!
        }

        const moveResult = move(this.generator, this.board, this.initialPosition, finalPosition)

        if (moveResult.effects.length > 0 && this.numberOfMoves > 0) {
          let amountOfPoints = 0
          moveResult.effects.forEach((effect) => {
            if (effect && effect.match && effect.kind === 'Match') {
              amountOfPoints += effect.match.positions.length
            }
          })

          this.score = this.score + amountOfPoints
          this.board = moveResult.board
          this.numberOfMoves = this.numberOfMoves - 1
          if(this.numberOfMoves === 0){
            this.currentGame.completed = true
          }
          if (this.user.token) {
            await updateGame({
              ...this.currentGame,
              board: moveResult.board,
              score: this.score,
              token: this.user.token,
              numberOfMoves: this.numberOfMoves,
              completed: this.currentGame.completed,
              user: this.user.userId
            } as GameDataWithToken)
          }
        }
      }
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
      <button v-if="numberOfMoves === 0" class="btn btn-primary" v-on:click="startNewGame">
        Start new game!
      </button>
      <div v-if="board">
        <div v-for="(row, rowIndex) in board.grid" :key="rowIndex" class="flex flex-row gap-2">
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

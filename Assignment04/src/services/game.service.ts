import axios from 'axios'
import type { GameData, GameDataWithToken } from '@/types/game-data'
import { Subject } from 'rxjs'

export async function getGame(gameId: number, token: string) {
  try {
    const response = await axios.get(`http://localhost:9090/games/${gameId}?token=${token}`)
    console.log('Response for getGame: ', response)
    return response.data
  } catch (error) {
    //
  }
}

export async function startGame(game: GameDataWithToken) {
  try {
    const newGameData: GameData = {
      id: game.id,
      user: game.user,
      score: game.score,
      completed: game.completed,
      board: game.board,
      numberOfMoves: game.numberOfMoves
    }

    console.log('pass to server: ', newGameData)

    const response = await axios.post(
      `http://localhost:9090/games?token=${game.token}`,
      newGameData
    )
    console.log('Response for startGame: ', response)
    return response.data
  } catch (error) {
    //
  }
}

export async function updateGame(game: GameDataWithToken) {
  try {
    const newGameData: GameData = {
      id: game.id,
      user: game.user,
      score: game.score,
      completed: game.completed,
      board: game.board,
      numberOfMoves: game.numberOfMoves
    }
    const response = await axios.patch(
      `http://localhost:9090/games/${game.id}?token=${game.token}`,
      newGameData
    )
    console.log('Response for updateGame: ', JSON.parse(response.config.data))
    const gameData: GameData = JSON.parse(response.config.data)
    return gameData
  } catch (error) {
    // toast.error('Failed to update game!');
    console.log('Failed to update game!', error)
  }
}

import type { Board } from '@/model/board'

export type GameData = {
  id?: number
  user: number
  score: number
  numberOfMoves: number
  completed: boolean
  board: Board<string>
}

export type GameDataWithToken = {
  token: string
} & GameData

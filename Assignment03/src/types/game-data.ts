import { Board } from "./board";

export type GameData = {
  id?: number;
  user: number;
  score: number;
  completed: boolean;
  board: Board<string>;
};

export type GameDataWithToken = {
  token: string;
} & GameData;

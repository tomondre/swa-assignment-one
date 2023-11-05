export type GameData = {
  id?: number;
  user: number;
  score: number;
  completed: boolean;
};

export type GameDataWithToken = {
  token: string;
} & GameData;

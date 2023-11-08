import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../store/game/game.action';
import { AppDispatch, RootState } from '../store/store';

import { UserData } from '../types/user-data';
import { GameData } from '../types/game-data';

const HighScores = () => {
  // 10 highest scores of anyone and 3 highest scores of the logged in user
  const user: UserData = useSelector(
    (state: RootState) => state.user.currentUser
  );
  const [highScores, setHighScores] = useState<GameData[]>([]);
  const [personalHighScores, setPersonalHighScores] = useState<GameData[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchData(token: string) {
      const action = await dispatch(getGames(token));
      const response: GameData[] = action.payload;
      if (response) {
        const completedGames = response.filter((game) => game.completed);

        const personal = completedGames
          .filter((game) => game.user === user.userId)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);

        const all = completedGames
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        setHighScores(all);
        setPersonalHighScores(personal);
      }
    }
    if (user && user.token) {
      fetchData(user.token);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-xl font-semibold">High scores</h1>
      <div>
        <h2 className="text-lg">Personal best scores:</h2>
        <ul>
          {personalHighScores.map((game) => (
            <li key={game.id}>
              <span>
                {game.score} (game id: {game.id})
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-lg">All high scores:</h2>
        <ul>
          {highScores.map((game) => (
            <li key={game.id}>
              <span>
                {game.score} (game id: {game.id})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HighScores;

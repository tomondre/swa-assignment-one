import { useEffect, useState, DragEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Board, Generator, CyclicGenerator, Position } from '../types/board';
import { GameData, GameDataWithToken } from '../types/game-data';
import { create, move } from '../utils/board.utils';
import { startGame, updateGame } from '../store/game/game.action';
import { AppDispatch, RootState } from '../store/store';
import { UserData } from '../types/user-data';

const Play = () => {
  const [board, setBoard] = useState<Board<string> | null>(null);
  const [generator] = useState<Generator<string>>(new CyclicGenerator('ABA'));
  const [initialPosition, setInitialPosition] = useState<Position | null>(null);
  const [score, setScore] = useState<number>(0);
  const [numberOfMoves, setNumberOfMoves] = useState<number>(0);
  const user: UserData = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const currentGame: GameData = useSelector(
    (state: RootState) => state.game.game
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function start(game: GameDataWithToken) {
      await dispatch(startGame(game));
    }
    if (generator && user.userId && user.token) {
      const generatedBoard = create(generator, 8, 7);
      setBoard(generatedBoard);
      if(!currentGame){
        start({
          user: user.userId,
          score,
          completed: false,
          token: user.token,
          board: generatedBoard,
        });
      }
    }
  }, [generator]);

  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setInitialPosition({
      row: +event.currentTarget.getAttribute('data-row-id')!,
      col: +event.currentTarget.getAttribute('data-id')!,
    });
  };

  const dragDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    if (board && initialPosition) {
      const finalPosition: Position = {
        row: +event.currentTarget.getAttribute('data-row-id')!,
        col: +event.currentTarget.getAttribute('data-id')!,
      };

      const moveResult = move(generator, board, initialPosition, finalPosition);

      console.log('move result: ', moveResult);

      if (moveResult.effects.length > 0) {
        const matched = moveResult.effects[0].match;
        if (matched) {
          setScore(score + matched.positions.length + 1);
          setBoard(moveResult.board);
          if(user.token){
            await dispatch(updateGame({...currentGame, board: moveResult.board, score: score + matched.positions.length + 1, token: user.token}));
          }
        }
      }
    }
  };

  const dragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('dragEnd: ', {
      row: event.currentTarget.getAttribute('data-row-id'),
      col: event.currentTarget.getAttribute('data-id'),
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-xl font-semibold">Match3 Game</h2>
      <div className="text-lg">Score: {score}</div>
      <div className="flex flex-col gap-2">
        {board &&
          board.grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row gap-2">
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  data-row-id={rowIndex}
                  data-id={cellIndex}
                  className={`w-12 h-12 bg-base-300 rounded-md ${
                    cell === 'A'
                      ? 'bg-red-400'
                      : cell === 'B'
                      ? 'bg-green-400'
                      : 'bg-blue-400'
                  }`}
                  draggable={true}
                  onDragStart={dragStart}
                  onDragOver={(e: DragEvent<HTMLDivElement>) =>
                    e.preventDefault()
                  }
                  onDragEnter={(e: DragEvent<HTMLDivElement>) =>
                    e.preventDefault()
                  }
                  onDragLeave={(e: DragEvent<HTMLDivElement>) =>
                    e.preventDefault()
                  }
                  onDrop={dragDrop}
                  onDragEnd={dragEnd}>
                  {/* {cell} */}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Play;

import { useEffect, useState, DragEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Board, Generator, CyclicGenerator, Position } from '../types/board';
import { GameData, GameDataWithToken } from '../types/game-data';
import { create, move } from '../utils/board.utils';
import { startGame, updateGame, getGame } from '../store/game/game.action';
import { AppDispatch, RootState } from '../store/store';
import { UserData } from '../types/user-data';
import toast from 'react-hot-toast';

const Play = () => {
  const [board, setBoard] = useState<Board<string> | null>(null);
  const [generator] = useState<Generator<string>>(new CyclicGenerator('ABCD'));
  const [initialPosition, setInitialPosition] = useState<Position | null>(null);
  const [score, setScore] = useState<number>(0);
  const [numberOfMoves, setNumberOfMoves] = useState<number>(9);
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

    async function retrieveGame(game: GameDataWithToken) {
      const action = await dispatch(getGame(game));
      const response = action.payload as GameDataWithToken;
      setBoard(response.board);
      setScore(response.score);
      setNumberOfMoves(response.numberOfMoves);
    }
    if (generator && user.userId && user.token) {
      const generatedBoard = create(generator, 8, 7);
      setBoard(generatedBoard);
      if(!currentGame || currentGame.completed){
        start({
          user: user.userId,
          score,
          completed: false,
          token: user.token,
          board: generatedBoard,
          numberOfMoves: 9,
        });
      }
      else if(currentGame && !currentGame.completed){
        //Get game from server
        const gameToRetrieve: GameDataWithToken = {
          user: user.userId,
          id: currentGame.id,
          score,
          completed: false,
          token: user.token,
          board: generatedBoard,
          numberOfMoves: 9,
        }
        retrieveGame(gameToRetrieve);
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

      if (moveResult.effects.length > 0 && numberOfMoves > 0) {
        let amountOfPoints = 0;
        moveResult.effects.forEach((effect) => {
          if(effect && effect.match && effect.kind === 'Match'){
            amountOfPoints += effect.match.positions.length;
          }
        })
        setScore(score + amountOfPoints);
        setBoard(moveResult.board);
        setNumberOfMoves(numberOfMoves - 1);
        if(user.token){
          await dispatch(updateGame({...currentGame, board: moveResult.board, score: score + amountOfPoints, token: user.token, numberOfMoves: numberOfMoves - 1}));
        }
      }
      else{
        if(user.token){
          toast.error('Game Over! Start a new game by pressing "PLAY"');
          await dispatch(updateGame({...currentGame, board: moveResult.board, score: score, token: user.token, completed: true, numberOfMoves: numberOfMoves}));
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-xl font-semibold">Match3 Game</h2>
      <div className="text-lg">Score: {score}</div>
      <div className="text-lg">Number of moves left: {numberOfMoves}</div>
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
                      : cell === 'C' ? 'bg-blue-400' : 'bg-yellow-400'
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
                  onDrop={dragDrop}>
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

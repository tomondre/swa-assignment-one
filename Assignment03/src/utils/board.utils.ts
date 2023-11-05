import { Board, Generator, Position, MoveResult, Match } from '../types/board';

export function create<T>(
  generator: Generator<T>,
  width: number,
  height: number
): Board<T> {
  const grid: T[][] = [];
  for (let h = 0; h < height; h++) {
    const row: T[] = [];
    for (let w = 0; w < width; w++) {
      row.push(generator.next());
    }
    grid.push(row);
  }
  return {
    height,
    width,
    grid,
  };
}

export function piece<T>(board: Board<T>, p: Position): T | undefined {
  if (isPositionOutsideOfGrid(board, p)) return undefined;
  return board.grid[p.row][p.col];
}

export function canMove<T>(
  board: Board<T>,
  first: Position,
  second: Position
): boolean {
  if (
    isPositionOutsideOfGrid(board, first) ||
    isPositionOutsideOfGrid(board, second)
  )
    return false;
  if (!(areSameRow(first, second) || areSameColumn(first, second)))
    return false;
  return switchAndGetMatches(board, first, second).length > 0;
}

/* Steps
    1. Find Matches
    2. Remove all matches
    3. Drop all the fields from top to bottom
    4. Refill all the positions from left to right, from bottom to top
*/
export function move<T>(
  generator: Generator<T>,
  board: Board<T>,
  first: Position,
  second: Position
): MoveResult<T> {
  const copiedBoard = copyBoard<T>(board);

  if (!canMove<T>(copiedBoard, first, second)) {
    console.log('CANT MOVE ');

    return {
      board: copiedBoard,
      effects: [],
    };
  }

  const switchedBoard = switchBoardPositions<T>(copiedBoard, first, second);

  const moveResults: MoveResult<T> = {
    board: switchedBoard,
    effects: [],
  };

  checkAndHandleMatch<T>(switchedBoard, generator, moveResults);
  return moveResults;
}

// // // // // // // // // // // // Private Functions // // // // // // // // // // // // // //

// Private functions
function isPositionOutsideOfGrid<T>(board: Board<T>, p: Position) {
  const result =
    p.col < 0 || p.col >= board.width || p.row < 0 || p.row >= board.height;
  console.log('result outside of grid: ', result);

  return result;
}

function areSameColumn(first: Position, second: Position) {
  return first.col === second.col;
}

function areSameRow(first: Position, second: Position) {
  return first.row === second.row;
}

export function positions<T>(board: Board<T>): Position[] {
  const positions: Position[] = [];
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      positions.push({ row: r, col: c });
    }
  }
  return positions;
}

function switchAndGetMatches<T>(
  board: Board<T>,
  first: Position,
  second: Position
): Match<T>[] {
  const newBoard = switchBoardPositions(board, first, second);

  return getMatches(newBoard);
}

function copyBoard<T>(board: Board<T>): Board<T> {
  return {
    grid: copyGrid<T>(board.grid),
    height: board.height,
    width: board.width,
  };
}

function copyGrid<T>(grid: T[][]): T[][] {
  const newGrid = [];
  for (let h = 0; h < grid.length; h++) {
    const row: T[] = [];
    for (let w = 0; w < grid[0].length; w++) {
      row.push(grid[h][w]);
    }
    newGrid.push(row);
  }
  return newGrid;
}

function switchBoardPositions<T>(
  board: Board<T>,
  first: Position,
  second: Position
): Board<T> {
  const copiedBoard = copyBoard<T>(board);
  const firstPiece = copiedBoard.grid[first.row][first.col];
  const secondPiece = copiedBoard.grid[second.row][second.col];
  copiedBoard.grid[first.row][first.col] = secondPiece;
  copiedBoard.grid[second.row][second.col] = firstPiece;
  return copiedBoard;
}

function getMatches<T>(board: Board<T>): Match<T>[] {
  const matches = [];

  // In row
  for (let h = 0; h < board.height; h++) {
    let positions: Position[] = [];
    for (let w = 0; w < board.width - 1; w++) {
      if (board.grid[h][w] === board.grid[h][w + 1]) {
        // First iteration
        if (positions.length === 0) positions.push({ row: h, col: w });
        positions.push({ row: h, col: w + 1 });
        if (positions.length === 3) {
          matches.push({
            matched: piece(board, positions[0]),
            positions: positions,
          });
          positions = [];
        }
      } else {
        positions = [];
      }
    }
  }

  // In column
  for (let w = 0; w < board.width; w++) {
    let positions: Position[] = [];
    for (let h = 0; h < board.height - 1; h++) {
      if (board.grid[h][w] === board.grid[h + 1][w]) {
        // First Iteration
        if (positions.length === 0) positions.push({ row: h, col: w });
        positions.push({ row: h + 1, col: w });
        if (positions.length === 3) {
          matches.push({
            matched: piece(board, positions[0]),
            positions,
          });
          positions = [];
        }
      } else {
        positions = [];
      }
    }
  }
  return matches;
}

function checkAndHandleMatch<T>(
  board: Board<T>,
  generator: Generator<T>,
  moveResult: MoveResult<T>
): MoveResult<T> | undefined {
  const matches = getMatches(board);
  if (matches.length === 0) return moveResult;

  for (const match of matches) {
    moveResult.effects.push({
      kind: 'Match',
      match,
    });
    removePositions(board.grid, match.positions);
  }

  refreshPositions(board, generator);
  moveResult.effects.push({
    kind: 'Refill',
  });

  checkAndHandleMatch(board, generator, moveResult);
}

function removePositions<T>(grid: T[][], positions: Position[]) {
  for (const position of positions) {
    grid[position.row][position.col] = null;
  }
}

function refreshPositions<T>(board: Board<T>, generator: Generator<T>) {
  // Make all existing items drop
  for (let h = board.height - 1; h >= 0; h--) {
    for (let w = 0; w < board.width; w++) {
      if (!piece(board, { row: h, col: w }))
        board.grid[h][w] = takeNumberAbove(board, { row: h, col: w });
    }
  }

  // Fill by row and column all null values, starting from the bottom
  for (let h = board.height - 1; h >= 0; h--) {
    for (let w = 0; w < board.width; w++) {
      const pieceValue = piece(board, { row: h, col: w });
      if (!pieceValue) board.grid[h][w] = generator.next();
    }
  }
}

function takeNumberAbove<T>(board: Board<T>, position: Position): T | null {
  for (let r = position.row - 1; r >= 0; r--) {
    const value = board.grid[r][position.col];
    if (value) {
      board.grid[r][position.col] = null;
      return value;
    }
  }
  return null;
}

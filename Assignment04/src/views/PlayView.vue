<template>
  <div className="flex flex-col gap-4 items-center">
    <h2 className="text-xl font-semibold">Match3 Game</h2>
    <div className="text-lg">Score: {score}</div>
    <div className="text-lg">Number of moves left: {numberOfMoves}</div>
    <div className="flex flex-col gap-2">
      <!-- {numberOfMoves === 0 && <button className='btn btn-primary' onClick={startNewGame}>Start new game!</button>}
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
          ))} -->
    </div>
  </div>
</template>

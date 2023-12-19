<template>
  <div className="flex flex-col gap-4 items-center">
    <h1 className="text-xl font-semibold">High scores</h1>
    <div>
      <h2 className="text-lg">Personal best scores:</h2>
      <ul>
        <!-- {personalHighScores.map((game) => (
            <li key={game.id}>
              <span>
                {game.score} (game id: {game.id})
              </span>
            </li>
          ))} -->
      </ul>
    </div>
    <div>
      <h2 className="text-lg">All high scores:</h2>
      <ul>
        <!-- {highScores.map((game) => (
            <li key={game.id}>
              <span>
                {game.score} (game id: {game.id})
              </span>
            </li>
          ))} -->
      </ul>
    </div>
  </div>
</template>

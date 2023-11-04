export const gameConstants = {
  games: {
    sumAddict: "Sum Addict",
  },
  multiPlayer: {
    events: {
      createSession: "createSession",
      playerJoined: "playerJoined",
      gameStarted: "gameStarted",
      gameScored: "gameScored",
    },
    eventMessageType: {
      gameStartedMsg: "gameStartedMsg",
      playerJoinedMsg: "playerJoinedMsg",
      gameScoredMsg: "gameScoredMsg",
    },
    step: {
      Waitingplayers: "Waitingplayers",
      Started: "Started",
      Stopped: "Stopped",
    },
  },
} as const;

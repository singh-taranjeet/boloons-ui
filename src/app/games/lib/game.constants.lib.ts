export const gameConstants = {
  games: {
    SumAddict: "SumAddict",
    Sharp: "Sharp",
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

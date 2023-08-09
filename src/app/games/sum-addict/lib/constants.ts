export const gameConstants = {
  name: "Sum Addict",
  gameUrl: "sum-addict",
  joinUrl: "/games/sum-addict/join",
  createUrl: "/games/sum-addict/create",
  playUrl: "/games/sum-addict/play",
  multiPlayer: {
    events: {
      createSesion: "createSession",
      playerJoined: "playerJoined",
      gameStarted: "gameStarted",
    },
    eventMessageType: {
      gameStartedMsg: "GameStartedMsg",
      playerJoinedMsg: "PlayerjoinedMsg",
    },
  },
};

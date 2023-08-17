import { SoundType } from "./game.types.lib";

export const gameConstants = {
  games: {
    sumAddict: "Sum Addict",
  },
  multiPlayer: {
    events: {
      createSesion: "createSession",
      playerJoined: "playerJoined",
      gameStarted: "gameStarted",
      gameScored: "gameScored",
    },
    eventMessageType: {
      gameStartedMsg: "GameStartedMsg",
      playerJoinedMsg: "PlayerjoinedMsg",
      GameScoredMsg: "GameScoredMsg",
    },
  },
};

type Audio = keyof SoundType;
export const audios: Audio[] = [
  "gameBackgroundMusic",
  "renderScoreBackgroundMusic",
];

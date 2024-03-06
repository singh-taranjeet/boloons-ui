import { gameConstants } from "./game.constants.lib";

export interface QuestionType {
  options: number[];
  answers: number[];
  correctAnswer: number;
}

export interface SoundType {
  gameBackgroundMusic: HTMLAudioElement;
  renderScoreBackgroundMusic: HTMLAudioElement;
}

const AudioTracksName = {
  gameBackgroundMusic: "gameBackgroundMusic",
  renderScoreBackgroundMusic: "renderScoreBackgroundMusic",
} as const;
export type AudioTracksKey = keyof typeof AudioTracksName;

export type GameStep = keyof typeof gameConstants.multiPlayer.step;

export interface GameProps {
  currentQuestion: number;
  learningMode?: boolean;
  attempts: number[];
  onAttempt?(number: number): void;
  options: number[];
  numbers: number[];
}

export interface MainAudioType {
  manageMainAudio: (action: boolean) => void;
  mainAudioAllowed: boolean;
}

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

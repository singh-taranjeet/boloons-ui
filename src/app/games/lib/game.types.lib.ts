export interface QuestionType {
  options: number[];
  answers: number[];
  correctAnswer: number;
}

export interface SoundType {
  gameBackgroundMusic: HTMLAudioElement;
  renderScoreBackgroundMusic: HTMLAudioElement;
}

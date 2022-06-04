export interface Example {
  id: number;
  text: string;
}

export interface Picture {
  id: number;
  url: string;
  file?: any;
}
export interface Pronounciation {
  url: string;
  file?: any;
}

export interface QuestionCard {
  id?: number;
  question?: string;
  answer?: string;
  synonym?: string;
  pictures?: Picture[];
  pot?: number;
  examples?: Example[];
}

export interface AnswerChoice {
  text: string;
  isCorrect: boolean;
}

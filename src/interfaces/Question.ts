import type { Answer } from '@/interfaces/Answer';

export interface Question {
  questionText: string;
  answers: Answer[];
}

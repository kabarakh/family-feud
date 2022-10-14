import type { Question } from '@/interfaces/Question';
import type { Team } from '@/interfaces/Team';

export interface Game {
  questionList: Question[];
  currentQuestion?: Question;
  teams: Team[];
  currentTeam?: number;
  currentMultiplier: number;
}

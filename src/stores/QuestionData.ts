import { defineStore } from 'pinia';
import type { Game } from '@/interfaces/Game';
import type { Question } from '@/interfaces/Question';
import type { Answer } from '@/interfaces/Answer';
import { cloneDeep, each } from 'lodash';
import type { Team } from '@/interfaces/Team';

export const useStore = defineStore({
  id: 'questions',
  state: (): { game: Game } => ({
    game: {
      currentMultiplier: 1,
      teams: [
        {
          crosses: 0,
          currentPlayer: '',
          players: [],
          points: 0
        },
        {
          crosses: 0,
          currentPlayer: '',
          players: [],
          points: 0
        }
      ],
      questionList: [
        {
          questionText: 'What is a common thing to do when first logging in to FFXIV?',
          answers: [
            {answerText: 'Check Retainers', count: 52, revealed: false},
            {answerText: 'Queue for duty/roulettes', count: 8, revealed: false},
            {answerText: 'Check/Interact with people', count: 7, revealed: false},
            {answerText: 'Gold Saucer', count: 7, revealed: false},
            {answerText: 'Close UI element', count: 5, revealed: false},
            {answerText: 'Gardening/Housing', count: 5, revealed: false},
          ]
        },
        {
          questionText: 'Name a FFXIV character you never want your child to bring home',
          answers: [
            {answerText: 'Zenos', count: 32, revealed: false},
            {answerText: 'Asahi', count: 8, revealed: false},
            {answerText: 'Thancred', count: 8, revealed: false},
            {answerText: 'G\'raha Tia', count: 5, revealed: false},
            {answerText: 'Nero', count: 5, revealed: false},
            {answerText: 'Lahabrea', count: 4, revealed: false},
            {answerText: 'Vauthry', count: 4, revealed: false}
          ]
        },
        {
          questionText: 'Name a method of levelling',
          answers: [
            {answerText: 'Roulettes', count: 41, revealed: false},
            {answerText: 'Highest level dungeon spam', count: 15, revealed: false},
            {answerText: 'PotD/HoH/Bozja', count: 11, revealed: false},
            {answerText: 'PVP', count: 7, revealed: false},
            {answerText: 'FATEs', count: 6, revealed: false},
            {answerText: 'MSQ/Story ', count: 4, revealed: false},
          ]
        }


      ]
    }
  }),
  actions: {
    selectQuestion(question: Question) {
      this.game.currentQuestion = cloneDeep(question);
    },
    revealAnswer(answer: Answer) {
      answer.revealed = true;
    },
    addPlayer(teamIndex: number, name: string) {
      const newTeam = cloneDeep(this.game.teams[teamIndex]);
      newTeam.players.push(name);
      this.game.teams[teamIndex] = newTeam;
    },
    selectTeam(teamIndex?: number) {
      this.game.currentTeam = teamIndex;
    },
    addCross(teamIndex: number) {
      this.game.teams[teamIndex].crosses++;
    },
    finishRound(earningTeam: number) {
      const earnedScoreForQuestion = this.game.currentQuestion?.answers.reduce((previousScore, currentAnswer) => {
        if (currentAnswer.revealed) {
          return previousScore + currentAnswer.count;
        }
        return previousScore;
      }, 0) as number;
      this.game.teams[earningTeam].points += earnedScoreForQuestion * this.game.currentMultiplier;
      this.game.currentTeam = undefined;
      each(this.game.teams, (team: Team) => {
        team.crosses = 0;
      });
    },
    increaseMultiplier() {
      this.game.currentMultiplier++;
    },
    resetMultiplier() {
      this.game.currentMultiplier = 1;
    }
  },
});

import {defineStore} from 'pinia';
import type {Game} from '@/interfaces/Game';
import type {Question} from '@/interfaces/Question';
import type {Answer} from '@/interfaces/Answer';
import {cloneDeep, each} from 'lodash';
import type {Team} from '@/interfaces/Team';

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
          questionText: 'Name a method of levelling',
          answers: [
            {answerText: 'Roulettes', count: 41, revealed: false},
            {answerText: 'Highest level dungeon spam', count: 15, revealed: false},
            {answerText: 'PotD/HoH/Bozja', count: 11, revealed: false},
            {answerText: 'PVP', count: 7, revealed: false},
            {answerText: 'FATEs', count: 6, revealed: false},
            {answerText: 'MSQ/Story ', count: 4, revealed: false},
          ]
        },

        {
          questionText: 'Name something you need when raiding',
          answers: [
            {answerText: 'Food', count: 35, revealed: false},
            {answerText: 'Equipment of specific iLevel', count: 7, revealed: false},
            {answerText: 'Patience', count: 7, revealed: false},
            {answerText: 'Skill', count: 7, revealed: false},
            {answerText: 'Other Players/a Static', count: 6, revealed: false},
            {answerText: 'Pots', count: 5, revealed: false},
          ]
        },
        {
          questionText: 'Name an activity you can do in end game',
          answers: [
            {answerText: "Raiding", count: 25, revealed: false},
            {answerText: "Glamour", count: 19, revealed: false},
            {answerText: "(E)RP", count: 7, revealed: false},
            {answerText: "Housing", count: 7, revealed: false},
            {answerText: "afk", count: 7, revealed: false},
          ]

        }
        ,
        {
          questionText: 'Name an MSQ Character',
          answers: [
            {answerText: 'G\'raha Tia', count: 17, revealed: false},
            {answerText: 'Y\'shtola', count: 9, revealed: false},
            {answerText: 'Emet-Selch', count: 8, revealed: false},
            {answerText: 'Thancred', count: 8, revealed: false},
            {answerText: 'Alphinaud', count: 7, revealed: false},
          ]

        },
        {
          questionText: 'Something your retainer can bring back from ventures',
          answers: [
            {answerText: 'Crystal(s)', count: 15, revealed: false},
            {answerText: 'Stuffed Alpha', count: 11, revealed: false},
            {answerText: 'Venture Coffer', count: 11, revealed: false},
            {answerText: 'Bom Boko', count: 9, revealed: false},
            {answerText: 'Housing Items', count: 8, revealed: false},
          ]

        },
        {
          questionText: 'The name of a Primal',
          answers: [
            {answerText: 'Ifrit', count: 25, revealed: false},
            {answerText: 'Shiva', count: 17, revealed: false},
            {answerText: 'Titan', count: 12, revealed: false},
            {answerText: 'Garuda', count: 8, revealed: false},
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

<script setup lang="ts">
import { useStore } from '@/stores/QuestionData';
import type { Question } from '@/interfaces/Question';
import type { Answer } from '@/interfaces/Answer';
import TeamList from '@/components/TeamList.vue';

const store = useStore();
const selectQuestion = (question: Question) => {
  store.selectQuestion(question)
}

const revealAnswer = (answer: Answer) => {
  store.revealAnswer(answer)
}

const deselectTeam = () => {
  store.selectTeam(undefined);
}

const increaseMultiplier = () => {
  store.increaseMultiplier();
}

const resetMultiplier = () => {
  store.resetMultiplier();
}

const nextPlayersBuzzering = () => {
  store.nextPlayersBuzzering();
}

const displayPossibilities = () => {
  store.game.displayPossibilities = true;
}
</script>

<template>
  <h1>Admin View</h1>
  <h2>Question List</h2>
  Multiplier: {{store.game.currentMultiplier}}
  <button @click.prevent="increaseMultiplier">Increase</button>
  <button @click.prevent="resetMultiplier">Reset</button>
  <div v-for="(question, index) in store.game.questionList" :key="index">
    {{ question.questionText }} <button @click.prevent="selectQuestion(question)">Select</button>
  </div>
  <h2>Current Question <span v-if="store.game.currentQuestion">({{store.game.currentQuestion.answers.length}} possibilities)</span></h2>
  <div>
    <div v-if="store.game.currentQuestion">
      {{store.game.currentQuestion.questionText}}
        <button v-if="!store.game.displayPossibilities" @click.prevent="displayPossibilities">Display possibilities</button>
      <ul>
        <li v-for="(answer, index) in store.game.currentQuestion.answers" :key="index">
          {{answer.answerText}} ({{answer.count}}) <button @click.prevent="revealAnswer(answer)" v-if="store.game.displayPossibilities && !answer.revealed">Reveal</button>
        </li>
      </ul>
    </div>
    <div v-else>Non selected</div>
  </div>
  <h2>Groups</h2>
  <button @click.prevent="deselectTeam">Deselect Team</button>
    <button @click.prevent="nextPlayersBuzzering">Next player buzzering</button>
  <div class="flex-cols">
    <TeamList v-for="(team, index) in store.game.teams" :key="team.players.join()" mode="Admin" :team-index="index"/>
  </div>
</template>

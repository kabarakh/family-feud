<script setup lang="ts">
import { useStore } from '@/stores/QuestionData';
import TeamList from '@/components/TeamList.vue';

const store = useStore();
</script>

<template>
  <div v-if="store.game.currentQuestion">
    {{ store.game.currentQuestion.questionText }}
    <ul v-if="store.game.displayPossibilities">
      <li v-for="(answer, answerIndex) in store.game.currentQuestion.answers" :key="answerIndex">
        <span v-if="answer.revealed">{{ answer.answerText }} ({{ answer.count }})</span>
        <span v-else>???</span>
      </li>
    </ul>
  </div>
  <div class="flex-cols">
    <TeamList v-for="(team, index) in store.game.teams" :key="team.players.join()" mode="Public" :team-index="index"/>
  </div>
</template>

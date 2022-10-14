<script setup lang="ts">
import { useStore } from '@/stores/QuestionData';
import { computed, ref } from 'vue';

const store = useStore();
const props = defineProps<{
  teamIndex: number,
  mode: 'Public' | 'Admin'
}>();

const team = computed(() => {
  return store.game.teams[props.teamIndex];
});

const newName = ref('');

const addPlayer = (name: string) => {
  store.addPlayer(props.teamIndex, name);
};

const addCross = () => {
  store.addCross(props.teamIndex);
}

const isAdmin = props.mode === 'Admin';

const selectTeam = () => {
  store.selectTeam(props.teamIndex);
};

const finishRound = () => {
  store.finishRound(props.teamIndex);
}
</script>

<style scoped lang="scss">
.crosses {
  color: red;
}

.team {
  padding: 1rem;
}

.selected {
  background: rgba(0, 0, 0, .2);
  border: 1px solid gray;
  padding: 0.875rem;
}
</style>

<template>
  <div :class="{selected: props.teamIndex === store.game.currentTeam, team: true}">
    <h3>Team {{ teamIndex + 1 }}
      <span v-if="isAdmin">
        <button @click.prevent="selectTeam">Select</button>
        <button @click.prevent="addCross">Cross</button>
        <button @click.prevent="finishRound">Finish</button>
      </span>
    </h3>
    <ul>
      <li v-for="player in team.players" :key="player">
        <span v-if="team.currentPlayer === player">-></span>{{ player }}
      </li>
    </ul>
    <p><b>Punkte:</b> {{ team.points }}</p>
    <div class="crosses">
      <span v-for="(cross, index) in [...Array(team.crosses).keys()]" :key="index">X</span>
    </div>
    <form v-if="isAdmin" @submit.prevent="addPlayer(newName)">
      <input type="text" v-model="newName"/>
      <input type="submit" value="Add Player"/>
    </form>
  </div>
</template>

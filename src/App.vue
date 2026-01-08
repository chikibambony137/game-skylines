<template>
  <div class="game">
    <div class="game__bar bar">
      <h2 class="bar__level-title">Level:</h2>
      <input
        class="bar__level-input"
        type="number"
        min="1"
        max="3"
        v-model="level"
        @input="switchPreset" />

        <button>Check</button>
    </div>

    <GameGrid
      class="game__grid"
      :maxTowerValue="maxTowerValue"
      :preset="currentPreset"
      :level></GameGrid>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref, watch } from "vue";

import GameGrid from "./components/GameGrid.vue";
import type { numberList } from "./types/numberList";
import { getRandomPreset } from "./data/presets";

const level: Ref<number> = ref(1);
let maxTowerValue = level.value + 2;

let gridSize: string = (maxTowerValue + 2).toString();
document.documentElement.style.setProperty("--gridSize", gridSize);

watch(level, () => {
  maxTowerValue = level.value + 2;
  gridSize = (maxTowerValue + 2).toString();
  document.documentElement.style.setProperty("--gridSize", gridSize);
});

const currentPreset: Ref<Array<numberList>> = ref(getRandomPreset(1));

const switchPreset = () => {
  switch (level.value) {
    case 1:
      currentPreset.value = getRandomPreset(1);
      break;
    case 2:
      currentPreset.value = getRandomPreset(2);
      break;
    case 3:
      currentPreset.value = getRandomPreset(3);
      break;
    default:
      currentPreset.value = getRandomPreset(1);
  }
};
// tests
</script>

<style scoped>
.game {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  box-sizing: border-box;
  padding: 20px;
  min-height: 90dvh;
}

.bar {
  display: flex;
}

.bar__level-title {
  margin: 5px 10px;
}

.game__grid {
  display: grid;
  grid-template-columns: repeat(var(--gridSize), 100px);
  grid-template-rows: repeat(var(--gridSize), 100px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  border: 4px solid black;
}
</style>

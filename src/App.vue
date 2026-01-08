<template>
  <div class="game">
    <div class="game__bar bar">
      <button class="bar__button" @click="isResetLevel = !isResetLevel">
        Reset
      </button>
      <button class="bar__button" @click="switchPreset">Update</button>

      <div class="bar__level" @click="changeLevel">
        <h2 class="bar__level-title">Level: {{ level }}</h2>
      </div>

      <button class="bar__button" @click="isCheckTowers = !isCheckTowers">
        Check
      </button>
      <button class="bar__button" @click="changeLevel">Next level</button>
    </div>

    <GameGrid
      class="game__grid"
      :maxTowerValue="maxTowerValue"
      :preset="currentPreset"
      :level
      :isCheckTowers
      :isResetLevel></GameGrid>
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

  switchPreset();
});

const currentPreset: Ref<Array<numberList>> = ref(getRandomPreset(1));

const changeLevel = () => {
  if (level.value < 3) level.value += 1;
  else level.value = 1;
};

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

const isCheckTowers: Ref<boolean> = ref(false);
const isResetLevel: Ref<boolean> = ref(false);
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
  margin-bottom: 15px;
  user-select: none;
}

.bar__button {
  width: 100px;
  font-size: 16px;
  cursor: pointer;
}

.bar__level {
  font-size: 16px;
  cursor: pointer;
  margin: 0px 20px;
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

  border: 4px solid rgba(0, 0, 0, 0.173);
}
</style>

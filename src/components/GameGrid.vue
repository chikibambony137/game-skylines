<template>
  <div class="grid">
    <button @click="checkTowers">Check</button>
    <span v-for="p in preset[0]?.[1]">{{ p }}</span>
    <span>Level {{ level }}</span>

    <template v-for="(row, rowIndex) in maxTowerValue" :key="rowIndex">
      <span>{{ preset[row]?.[0] }}</span>

      <input
        class="game__input"
        v-for="(col, colIndex) in preset[row]?.[1]"
        :key="colIndex"
        v-model.number="res[rowIndex + 1]![1][colIndex]"
        :name="col.toString()"
        type="number"
        min="0"
        :max="maxTowerValue" />

      <span>{{ preset[row]?.[2] }}</span>
    </template>

    <span>Level {{ level }}</span>
    <span v-for="p in preset[maxTowerValue + 1]?.[1]">{{ p }}</span>
    <span>Level {{ level }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { ref, watch } from "vue";

import type { numberList } from "../types/numberList";
import { useCheckSkylines } from "../composables/useCheckSkylines";

const props = defineProps({
  maxTowerValue: {
    type: Number,
    required: true,
  },

  level: {
    type: Number,
    required: true,
  },

  preset: {
    type: Array<numberList>,
    required: true,
  },
});

const res: Ref<numberList[]> = ref(JSON.parse(JSON.stringify(props.preset)));

watch(
  () => props.preset,
  (newPreset) => {
    // Обновляем значение внутри ref, а не пересоздаем ref!
    res.value = JSON.parse(JSON.stringify(newPreset));
  },
  { deep: true, immediate: true }
);

const checkTowers = () => {
  if (useCheckSkylines(res.value, props.maxTowerValue)) alert('УРААААААААААААА!');
  else alert("ХУЙНЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯ!");
};
</script>

<style scoped>
  input {
    background-color: #1b1c1e;
  }
</style>

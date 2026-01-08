<template>
  <div class="grid">
    <span class="grid__level"></span>
    <span class="grid__hint grid__hint_top" v-for="p in preset[0]?.[1]">{{ p }}</span>
    <span class="grid__level"></span>

    <template v-for="(row, rowIndex) in maxTowerValue" :key="rowIndex">
      <span class="grid__hint grid__hint_left">{{ preset[row]?.[0] }}</span>

      <input
        class="grid__input"
        v-for="(col, colIndex) in preset[row]?.[1]"
        :key="colIndex"
        v-model.number="res[rowIndex + 1]![1][colIndex]"
        :name="col.toString()"
        type="number"
        readonly
        @click="buildTower(rowIndex, colIndex)" />

      <span class="grid__hint grid__hint_right">{{ preset[row]?.[2] }}</span>
    </template>

    <span class="grid__level"></span>
    <span class="grid__hint grid__hint_bottom" v-for="p in preset[maxTowerValue + 1]?.[1]">{{
      p
    }}</span>
    <span class="grid__level"></span>
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

  isCheckTowers: {
    type: Boolean,
    required: true,
  },

  isResetLevel: {
    type: Boolean,
    required: true,
  },
});

const res: Ref<numberList[]> = ref(JSON.parse(JSON.stringify(props.preset)));

const buildTower = (rowIndex: number, colIndex: number) => {
  if (res.value[rowIndex + 1]![1][colIndex]! < props.maxTowerValue)
    res.value[rowIndex + 1]![1][colIndex]! += 1;
  else res.value[rowIndex + 1]![1][colIndex]! = 0;
};

watch(
  () => props.preset,
  (newPreset) => {
    // Обновляем значение внутри ref, а не пересоздаем ref!
    res.value = JSON.parse(JSON.stringify(newPreset));
  },
  { deep: true, immediate: true }
);

watch(
  () => props.isCheckTowers,
  () => {
    if (useCheckSkylines(res.value, props.maxTowerValue))
      alert("УРААААААААААААА!");
    else alert("ХУЙНЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯЯ!");
  }
);

watch(
  () => props.isResetLevel,
  () => {
    res.value = JSON.parse(JSON.stringify(props.preset));
  }
);
</script>

<style scoped>
.grid {
  justify-items: center;
  align-items: center;

  font-size: 24px;
}

.grid__input {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 24px;

  border: 2px solid rgb(23, 22, 22);
  cursor: pointer;
  user-select: none;
}

.grid__hint_top {
  align-self: self-end;
}
.grid__hint_left {
  justify-self: self-end;
}
.grid__hint_right {
  justify-self: self-start;
}
.grid__hint_bottom {
  align-self: self-start;
}
</style>

<template>
  <div class="grid">
    <span class="grid__level"></span>
    <span class="grid__hint grid__hint_top" v-for="p in preset[0]?.[1]">{{
      p
    }}</span>
    <span class="grid__level"></span>

    <template v-for="(row, rowIndex) in maxTowerValue" :key="rowIndex">
      <span class="grid__hint grid__hint_left">{{ preset[row]?.[0] }}</span>

      <div
        class="grid__tower"
        :style="{color: colorByValue(res[rowIndex + 1]![1][colIndex]!)}"
        v-for="(col, colIndex) in preset[row]?.[1]"
        :key="colIndex"
        
        :name="col.toString()"
        type="number"
        readonly
        @click="buildTower(rowIndex, colIndex)">
        <p class="grid__tower-value">{{ res[rowIndex + 1]![1][colIndex] }}</p>
      </div>

      <span class="grid__hint grid__hint_right">{{ preset[row]?.[2] }}</span>
    </template>

    <span class="grid__level"></span>
    <span
      class="grid__hint grid__hint_bottom"
      v-for="p in preset[maxTowerValue + 1]?.[1]"
      >{{ p }}</span
    >
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

const colorByValue = (value: number) => {
  switch (value) {
    case 0:
      return "white";
    case 1:
      return "green";
    case 2:
      return "blue";
    case 3:
      return "yellow";
    case 4:
      return "orange";
    case 5:
      return "red";
    default:
      return "white";
  }
};
</script>

<style scoped>
.grid {
  justify-items: center;
  align-items: center;

  font-size: 24px;
  user-select: none;
}

.grid__tower {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  
  justify-items: center;
  align-content: center;

  font-size: 30px;
  font-weight: 700;
  border: 2px solid rgb(23, 22, 22);
  cursor: pointer;
  user-select: none;
  background-color: rgba(28, 28, 28, 0.815);
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

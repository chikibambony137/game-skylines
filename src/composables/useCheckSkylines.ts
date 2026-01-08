import type { numberList } from "../types/numberList";

export function useCheckSkylines(
  grid: Array<numberList>,
  maxTowerValue: number
) {
  if (rowCheck(grid, maxTowerValue) && colCheck(grid, maxTowerValue))
    return true;
  else return false;
}

const rowCheck = (grid: Array<numberList>, maxTowerValue: number): boolean => {
  for (let i = 1; i < grid.length - 1; i += 1) {
    // from left to right check
    if (grid[i]![0] !== 0)
      if (!lineCheck(grid[i]![0], grid[i]![1], maxTowerValue)) return false;
    // from right to left check
    if (grid[i]![2] !== 0)
      if (!lineCheck(grid[i]![2], [...grid[i]![1]].reverse(), maxTowerValue))
        return false;
  }
  return true;
};

const colCheck = (grid: Array<numberList>, maxTowerValue: number) => {
  for (let i = 0; i < maxTowerValue; i += 1) {
    // init towers in column by i
    let towers: Array<number> = [];
    for (let j = 1; j < grid.length - 1; j += 1) {
      towers.push(grid[j]![1][i]!);
    }

    // from top to bottom check
    if (grid[0]![1][i]! !== 0)
      if (!lineCheck(grid[0]![1][i]!, towers, maxTowerValue)) return false;

    // from bottom to top check
    // @ts-ignore - arr.at(-1) ????
    if (grid.at(-1)[1][i]! !== 0) {
      // @ts-ignore - arr.at(-1) ????
      if (!lineCheck(grid.at(-1)[1][i]!, [...towers].reverse(), maxTowerValue))
        return false;
    }
  }
  return true;
};

const lineCheck = (
  visibleTowers: number,
  towers: Array<number>,
  maxTowerValue: number
) => {
  // 1) dublicate check
  if (!dublicateCheck(towers)) return false;
  // 2) null check
  if (!nullCheck(towers)) return false;

  // 3) first tower check
  if (firstTowerCheck(towers, maxTowerValue, visibleTowers)) return true;

  // default check (full row)
  return fullLineCheck(towers, visibleTowers);
};

// проверка на дубликаты
const dublicateCheck = (towers: Array<number>): boolean => {
  let uniqueTowers = new Set(towers);

  if (uniqueTowers.size !== towers.length) {
    console.log("Dublicate error");
    return false;
  }
  return true;
};

// проверка на нули
const nullCheck = (towers: Array<number>): boolean => {
  for (let i = 0; i < towers.length; i += 1) {
    if (towers[i] === 0) {
      console.log("null error");
      return false;
    }
  }
  return true;
};

/* Для экономии времени:
 если первая башня равна максимальному значению и мы видим 1 башню, 
 то смысла проверять всю строку нет **/
const firstTowerCheck = (
  towers: Array<number>,
  maxTowerValue: number,
  visibleTowers: number
): boolean => {
  if (towers[0] === maxTowerValue && visibleTowers === 1) {
    console.log("first tower = max, skip full check");
    return true;
  }
  return false;
};

/* полная проверка строки: подсчитывается количество видимых башен и возвращает,
 равно ли оно необходимому количеству**/
const fullLineCheck = (
  towers: Array<number>,
  visibleTowers: number
): boolean => {
  let count: number = 1;
  let maxTower: number | undefined = towers[0];

  for (let i = 1; i < towers.length; i += 1) {
    if (maxTower! <= towers[i]!) {
      count += 1;
      maxTower = towers[i]!;
    }
  }

  console.log("full line check");
  return visibleTowers === count;
};

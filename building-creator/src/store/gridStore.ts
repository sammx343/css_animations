import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Grid } from "@/types/grid";

export const useGridStore = defineStore('row', () => {
  const selectedGrid = ref<Grid>();
  
  const getSelectedGrid = computed(() => selectedGrid);

  function setSelectedGrid(grid: Grid) {
    selectedGrid.value = grid;
  }

  return { setSelectedGrid, getSelectedGrid, selectedGrid };
})
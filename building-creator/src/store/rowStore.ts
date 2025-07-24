import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Row } from "@/types/row";

export const useRowStore = defineStore('row', () => {
  const selectedRow = ref<Row | undefined>();
  
  const getSelectedRow = computed(() => selectedRow);

  function setSelectedRow(row: Row) {
    selectedRow.value = row;
  }

  return { setSelectedRow, getSelectedRow, selectedRow };
})
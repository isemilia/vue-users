<template>
  <div class="table-container">
    <table class="table-root">
      <thead class="table-head">
      <tr>
        <th v-for="header in props.headers">
          <component v-if="isVNode(header.label)" :is="header.label" />
          <span v-else>{{header.label}}</span>
        </th>
      </tr>
      </thead>
      <tbody class="table-body">
      <tr v-for="row in props.rows">
        <td v-for="header in props.headers">
          <component v-if="isVNode(row[header.name])" :is="row[header.name]"/>
          <span v-else>{{row[header.name]}}</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="hasFooter" class="table-footer">
      <div>Page {{page + 1}}</div>
      <div class="table-pagination">
        <button :disabled="page === 0" @click="decreasePage"> < </button>
        <button @click="increasePage"> > </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, VNode, watch} from "vue";
  import isVNode from "../../utils/functions/isVNode";

  const props = defineProps<{
    rows: any[];
    headers: {
      name: string;
      label: VNode | string;
    }[]
    hasFooter?: boolean
  }>()

  const emit = defineEmits(['page-change'])

  const page = ref(0)

  const increasePage = () => {
    page.value = page.value + 1;
  }

  const decreasePage = () => {
    if (page.value > 0) {
      page.value = page.value - 1;
    }
  }

  watch(page, (prevPage, currentPage) => {
    if (prevPage !== currentPage) {
      emit('page-change', page.value);
    }
  })

</script>

<style scoped>
  .table-container {
    display: grid;
  }
  .table-root {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    display: grid;
    grid-auto-rows: auto;
    max-height: 85vh;
  }
  .table-head, .table-body {
    display: grid;
    grid-auto-rows: auto;
  }
  .table-footer, .table-head {
    position: sticky;
    z-index: 10;
    background: #f8f8f8;
  }
  .table-head {
    top: 0;
  }
  .table-footer {
    bottom: 0;
  }
  .table-body {
    height: 100%;
    overflow: auto;
  }
  tr {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
  }
  th {
    text-align: left;
  }
  td, th {
    border-bottom: 1px solid #000;
    padding: 6px 10px;
  }
  .table-footer {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .table-pagination { }
</style>
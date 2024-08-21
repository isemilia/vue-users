<template>
  <div class="table-container">
    <table class="table-root">
      <thead class="table-head">
      <tr>
        <th v-for="header in props.headers" class="table-column">
          <component v-if="isVNode(header.label)" :is="header.label" />
          <span v-else>{{header.label}}</span>
        </th>
      </tr>
      </thead>
      <tbody class="table-body">
      <tr v-for="row in props.rows">
        <td v-for="header in props.headers" class="table-cell">
          <component v-if="isVNode(row[header.name])" :is="row[header.name]"/>
          <span v-else>{{row[header.name]}}</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="hasFooter" class="table-footer">
      <div class="table-footer-side">
        <div class="table-page">
          Page
          {{page + 1}}
        </div>
        <div v-if="isLoading">Loading...</div>
      </div>

      <div class="table-footer-side">
        <div class="table-pagination">
          <button :disabled="page === 0 || isLoading" @click="decreasePage" class="table-pagination-button">
            <img :src="arrowLeft" alt="previous page"/>
          </button>
          <button :disabled="isLoading"  @click="increasePage" class="table-pagination-button">
            <img :src="arrowRight" alt="next page"/>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, VNode, watch } from "vue";
  import isVNode from "../../utils/functions/isVNode";
  import arrowRight from './icons/right-arrow.png';
  import arrowLeft from './icons/left-arrow.png';

  const props = defineProps<{
    rows: any[];
    headers: {
      name: string;
      label: VNode | string;
    }[]
    hasFooter?: boolean
    isLoading?: boolean
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

<style scoped lang="scss">
  .table-container {
    --border-color: #ffe2c1;
    --nav-bg-color: #fffbf6;

    display: grid;
    align-content: space-between;
    border: 1px solid var(--border-color);
    border-radius: 16px;
    overflow: hidden;
    height: 100%;
    max-height: 70vh;
  }
  .table-root {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    display: grid;
    grid-auto-rows: auto;
    max-height: 70vh;
  }
  .table-head, .table-body {
    display: grid;
    grid-auto-rows: auto;
  }
  .table-footer, .table-head {
    position: sticky;
    z-index: 10;
    background: var(--nav-bg-color);
    padding-right: 5px;
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
    &::-webkit-scrollbar-track
    {
      border-radius: 10px;
      background-color: #fafafa;
    }
    &::-webkit-scrollbar
    {
      width: 5px;
      background-color: #fafafa;
    }
    &::-webkit-scrollbar-thumb
    {
      border-radius: 10px;
      background-color: #ffe2c1;
    }
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
    padding: 10px 14px;
  }
  td {
    border-bottom: 1px solid var(--border-color);
  }
  .table-footer {
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-side {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  .table-pagination {
    display: flex;
    gap: 8px;
    &-button {
      width: 18px;
      height: 18px;
      padding: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: opacity .3s;
      &:disabled {
        cursor: auto;
        opacity: .4;
      }
      img {
        height: 100%;
        max-width: 100%;
      }
    }
  }
</style>
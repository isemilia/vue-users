<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in props.headers">
          <component v-if="isVNode(header.label)" :is="header.label" />
          <span v-else>{{header.label}}</span>
        </th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="row in props.rows">
      <td v-for="header in props.headers">
        <component v-if="isVNode(row[header.name])" :is="row[header.name]"/>
        <span v-else>{{row[header.name]}}</span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
  import {VNode} from "vue";
  import isVNode from "../../utils/functions/isVNode";

  const props = defineProps<{
    rows: any[];
    headers: {
      name: string;
      label: VNode | string;
    }[]
  }>()

  console.log(props.rows)
  console.log(props.headers)

</script>

<style scoped>
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }
  th {
    text-align: left;
  }
  td, th {
    border-bottom: 1px solid #000;
    padding: 6px 10px;
  }
</style>
<template>
  <div class="main">
    <Table :rows="users" :headers="headers"/>
  </div>
</template>

<script lang="tsx" setup>
  import Table from "./components/table/base-table.vue";

  const users = [
    {id: 1, name: 'Anna', email: 'anna@gmail.com' }
  ]

  const headers = [
    {name: 'name', label: 'Client'},
    {name: 'email', label: 'Email'},
  ]
</script>

<style scoped lang="scss">
  .main {
    height: 100%;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  }
</style>

<template>
  <div class="main">
    <Table :rows="userInfo.rows" :headers="headers" :hasFooter="true" @page-change="handlePageChange"/>
  </div>
</template>

<script lang="tsx" setup>
  import Table from "./components/table/base-table.vue";
  import {onMounted, ref} from "vue";

  const url = 'https://dummyjson.com/users/?limit=15&skip=0';

  const userInfo = ref<{
    rows: any[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({ rows: [], isLoading: true, isSuccess: false, isError: false })

  const handlePageChange = (page: number) => {
    console.log(page)
  }

  const fetchUsers = () => {
    userInfo.value.isLoading = true;

    fetch(url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          // console.log(data)
          userInfo.value.rows = data.users.map(user => ({
            id: user.id,
            name: user.firstName,
            email: user.email,
          }))
          userInfo.value.isSuccess = true
        })
        .catch(() => {
          userInfo.value.isError = true;
          userInfo.value.isSuccess = false;
        })
        .finally(() => {
          userInfo.value.isLoading = false;
        })
  }

  onMounted(() => {
    fetchUsers()
  })

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

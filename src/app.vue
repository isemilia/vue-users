<template>
  <div class="main">
    <Table :rows="userInfo.rows" :isLoading="userInfo.isLoading" :headers="headers" :hasFooter="true" @page-change="handlePageChange"/>
  </div>
</template>

<script lang="tsx" setup>
  import Table from "./components/table/base-table.vue";
  import {onMounted, ref, watch} from "vue";

  const limit = 15;
  const url = 'https://dummyjson.com/users'; // ?limit=15&skip=0

  const userInfo = ref<{
    rows: any[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({ rows: [], isLoading: true, isSuccess: false, isError: false })

  const page = ref(0)

  const handlePageChange = (currentPage: number) => {
    page.value = (currentPage)
  }

  const fetchUsers = ({limit, offset}: {limit: number, offset: number}) => {
    userInfo.value.isLoading = true;

    const urlWithParams = `${url}/?limit=${limit}&skip=${offset}`

    fetch(urlWithParams)
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
    fetchUsers({limit, offset: 0})
  })

  watch(page, (prev, current) => {
    if (prev !== current) {
      fetchUsers({limit, offset: page.value * limit})
    }
  })

  const headers = [
    {name: 'name', label: 'Client'},
    {name: 'email', label: 'Email'},
  ]
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    display: grid;
    place-content: center;
    height: 100vh;
  }
</style>

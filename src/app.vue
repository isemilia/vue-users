<template>
  <div class="main">
    <Table :rows="formattedRows" :isLoading="userInfo.isLoading" :headers="headers" :hasFooter="true" @page-change="handlePageChange"/>
  </div>
</template>

<script lang="tsx" setup>
  import Table from "./components/table/base-table.vue";
  import {computed, onMounted, ref, watch} from "vue";

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
            username: user.username,
            gender: user.gender
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

  const formattedRows = computed(() =>
      userInfo.value.rows.map((row) => ({
        ...row,
        name: (
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <div style={{
                marginTop: '2px',
                background: row.gender === 'male' ? '#d3f2ff' : '#ffe4ea',
                borderRadius: '16px',
                width: '16px',
                height: '16px',
              }}></div>
              {row.name}
            </div>

        ),
      }))
  );

  const headers = [
    {name: 'name', label: 'Client'},
    {name: 'username', label: 'Username'},
  ]
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    align-items: center;
    height: 100vh;
  }
</style>

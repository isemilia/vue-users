<template>
  <BaseTable :rows="formattedRows" :isLoading="userInfo.isLoading" :headers="headers" :hasFooter="true" @page-change="handlePageChange"/>
</template>

<script lang="ts" setup>

import {computed, h, onMounted, ref, watch} from "vue";
import UserLabel from "../../components/user-label/user-label.vue";
import PhoneDropdown from "../../components/phone-dropdown/phone-dropdown.vue";
import BaseTable from "../../components/table/base-table.vue";

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
        userInfo.value.rows = data.users.map((user: any) => ({
          id: user.id,
          name: user.firstName,
          username: user.username,
          phone: user.phone,
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
      name: h(UserLabel, {label: row.name, gender: row.gender, id: row.id}),
      phone: h(PhoneDropdown, {phone: row.phone}),
    }))
);

const headers = [
  {name: 'name', label: 'Client'},
  {name: 'username', label: 'Username'},
  {name: 'phone', label: 'Phone'},
]
</script>
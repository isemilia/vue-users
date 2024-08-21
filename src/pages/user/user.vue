<template>
  <div v-if="user" class="root">
    <div>
      <img :src="user.img" :alt="`Photo of ${user.name}`">
    </div>
    <div>
      <h1 class="title">{{user.name}} {{user.lastName}}</h1>
      <div>{{user.birthDate.day}}.{{user.birthDate.month}}.{{user.birthDate.year}}</div>
      <div>{{user.phone}}</div>
      <div>{{user.email}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {useRoute} from "vue-router";
  import {onMounted, onUnmounted, ref, watch} from "vue";

  const route = useRoute()

  const url = 'https://dummyjson.com/users';

  // const userID = ref(route.params.id)
  const user = ref<{
    name: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: {
      day: string;
      month: string;
      year: string;
    };
    img: string;
  } | null>(null)

  const fetchUser = ({id}) => {
    fetch(`${url}/${id}`)
        .then(res => res.json())
        .then(data => {
          // console.log(data)

          const birthDate = data.birthDate.split('-')

          user.value = {
            name: data.firstName,
            lastName: data.lastName,
            img: data.image,
            email: data.email,
            phone: data.phone,
            birthDate: {
              day: birthDate[2].padStart(2, '0'),
              month: birthDate[1].padStart(2, '0'),
              year: birthDate[0],
            }
          }
        })
  }

  watch(
    () => route.params.id,
    (newId, oldId) => {
      fetchUser({id: newId})
    }
  )

  onMounted(() => {
    if (route.params.id) {
      fetchUser({id: route.params.id});
    }
  });

  onUnmounted(() => {
    user.value = null
  })
</script>

<style lang="scss" scoped>
  .root {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 16px;
  }
  .title {
    margin: 0;
    font-size: 26px;
  }
</style>
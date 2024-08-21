<template>
  User {{userID}}
</template>

<script lang="ts" setup>
  import {useRoute} from "vue-router";
  import {ref, watch} from "vue";

  const route = useRoute()

  const userID = ref(route.params.id)

  watch(
    () => route.params.id,
    (newId, oldId) => {
      userID.value = (newId)
    }
  )


  console.log(userID.value)
</script>
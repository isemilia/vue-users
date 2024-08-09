<template>
  <table></table>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    rows: any[];
    headers: {
      name: string;
      label: InstanceType<any> | string;
    }[]
  }>()

  console.log(props.rows)
  console.log(props.headers)

</script>

<style></style>
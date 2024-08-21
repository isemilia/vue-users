<template>
  <div class="user">
    <span class="user-gender" :class="props.gender || 'unspecified'"></span>
    <RouterLink :to="`/users/${props.id}`" class="user-label">{{props.label}}</RouterLink>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    gender?: 'male' | 'female';
    label: string;
    id: number
  }>()
</script>

<style lang="scss">
.user {
  display: flex;
  align-items: center;
  gap: 8px;
  &-label {
    color: inherit;
    cursor: pointer;
  }
  &-gender {
    margin-top: 2px;
    background: #ccc;
    border-radius: 16px;
    width: 16px;
    height: 16px;
    &.male {
      background: #d3f2ff;
    }
    &.female {
      background: #ffe4ea;
    }
  }
}
</style>
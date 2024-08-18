<template>
  <div class="user">
    <span class="user-gender" :class="props.gender || 'unspecified'"></span>
    <span class="user-label">{{props.label}}</span>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    gender?: 'male' | 'female';
    label: string;
  }>()
</script>

<style lang="scss">
.user {
  display: flex;
  align-items: center;
  gap: 8px;
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
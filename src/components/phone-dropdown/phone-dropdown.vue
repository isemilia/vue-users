<template>
  <div class="root" :class="{hovered: isHovered}" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <span>{{props.phone}}</span>
    <div class="dropdown">
      <ul>
        <li>
          <a :href="`tel:+${formattedPhone}`">
            <span class="icon">
              <img :src="phoneIcon" alt="Phone">
            </span>
            Call
          </a>
        </li>
        <li>
          <a :href="`https://wa.me/+${formattedPhone}`">
            <span class="icon">
              <img :src="whatsappIcon" alt="Whatsapp">
            </span>
            Whatsapp
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {ref} from "vue";
  import phoneIcon from './icons/phone.png';
  import whatsappIcon from './icons/whatsapp.png';

  const props = defineProps<{
    phone: string
  }>()

  const formattedPhone = +props.phone.replace(/[^0-9]/ig, '');

  const isHovered = ref(false);

  const handleMouseEnter = () => {
    isHovered.value = true;
  }

  const handleMouseLeave = () => {
    isHovered.value = false;
  }
</script>

<style scoped>
  .root {
    position: relative;
    width: fit-content;
    &.hovered {
      .dropdown {
        visibility: visible;
      }
    }
  }
  .dropdown {
    width: 100%;
    position: absolute;
    background: var(--beige-light);
    border: 1px solid var(--beige-dark);
    padding: 6px 10px;
    visibility: hidden;
    z-index: 10;
    border-radius: 6px;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: inherit;
    text-decoration: none;
  }
  .icon {
    width: 20px;
    height: 20px;
    display: block;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
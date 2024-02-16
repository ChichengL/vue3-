<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting.ts'
defineOptions({
  name: 'Logo',
})
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    margin-left: 12px;
    font-size: $base-logo-title-fontSize;
  }
}
</style>

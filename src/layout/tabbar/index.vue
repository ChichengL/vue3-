<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <!-- 面包屑 -->
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'

defineOptions({ name: 'Tabbar' })
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  background-image: linear-gradient(to right, white, rgb(194, 186, 186));
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 30px;
  }
}
</style>

<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{ fold: fold }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#0755af"
          text-color="white"
          :default-active="route.path"
          :collapse="fold ? true : false"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{ fold: fold }">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ fold: fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useuserStore from '@/store/modules/user.ts'
import useLayoutStore from '@/store/modules/layout'
const userStore = useuserStore()
const route = useRoute()
const LayoutStore = useLayoutStore()
const { fold } = toRefs(LayoutStore)
defineOptions({
  name: 'Layout',
})
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  position: absolute; // 或 fixed / relative 根据你的布局需求
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .layout_slider {
    width: $base-menu-width;
    height: 100%;
    background-color: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    height: $base-tabbar-height;
    position: fixed;
    width: calc(100% - $base-menu-width);
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>

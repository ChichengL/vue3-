<template>
  <el-button
    icon="Refresh"
    circle
    @click="
      () => {
        layoutStore.refresh = !layoutStore.refresh
      }
    "
  ></el-button>
  <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 32px; height: 32px; margin: 0 10px; border-radius: 50%"
  />
  <el-dropdown>
    {{ userStore.username }}
    <el-icon>
      <ArrowDown></ArrowDown>
    </el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutStore from '@/store/modules/layout'
import useuserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

defineOptions({ name: 'Setting' })

const layoutStore = useLayoutStore()
const userStore = useuserStore()
const router = useRouter()
const route = useRoute()
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const logout = () => {
  userStore.userLogout()
  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<style scoped></style>

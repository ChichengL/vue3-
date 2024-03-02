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
  <el-popover
    title="主题设置"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @change="changeColor"
          :teleported="false"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" circle></el-button>
    </template>
  </el-popover>
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
import { ref } from 'vue'
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

const logout = async () => {
  await userStore.userLogout()
  router.push({ path: '/login', query: { redirect: route.path } })
}

//颜色相关
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const dark = ref(false)
const changeDark = () => {
  let HTML = document.documentElement
  console.log(HTML)
  dark.value ? (HTML.className = 'dark') : (HTML.className = '')
}
const changeColor = () => {
  const HTML = document.documentElement
  HTML.style.setProperty('--el-color-primary', color.value)
}
</script>

<style scoped></style>

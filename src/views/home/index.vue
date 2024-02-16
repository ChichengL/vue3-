<template>
  <div>
    <h1>登陆成功</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useuserStore from '@/store/modules/user.ts'
const userStore = useuserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>

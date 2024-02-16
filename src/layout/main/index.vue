<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import  useLayoutStore  from '@/store/modules/layout'
defineOptions({ name: 'Main' })
const flag = ref(true)
const layoutStore = useLayoutStore()
watch(
  () => layoutStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>

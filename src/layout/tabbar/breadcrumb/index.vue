<template>
  <el-icon @click="changeFold">
    <component :is="Icon"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="item in route.matched"
      :key="item.path"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="margin: 0 5px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import useLayoutStore from '@/store/modules/layout.ts'
import { useRoute } from 'vue-router'

const LayoutStore = useLayoutStore()
const { fold } = toRefs(LayoutStore)
const { changeFold } = LayoutStore

const Icon = computed(() => (fold.value ? 'Fold' : 'Expand'))

const route = useRoute()

defineOptions({ name: 'Breadcrumb' })
</script>

<style scoped></style>

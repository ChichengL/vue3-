<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="getC2"
          :disabled="isAddOrUpdate"
        >
          <el-option
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          @change="getC3"
          :disabled="isAddOrUpdate"
        >
          <el-option
            v-for="item in categoryStore.c2Arr"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="isAddOrUpdate">
          <el-option
            v-for="item in categoryStore.c3Arr"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { onMounted } from 'vue'
defineProps(['isAddOrUpdate'])
const categoryStore = useCategoryStore()

onMounted(async () => {
  getC1()
})
const getC1 = () => {
  categoryStore.getc1()
}
const getC2 = () => {
  categoryStore.getc2()
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
}
const getC3 = () => {
  categoryStore.getc3()
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
}
</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>

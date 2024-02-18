<template>
  <div>
    <Category :isAddOrUpdate="isAddOrUpdate"></Category>
    <el-card style="margin: 10px 0">
      <div v-show="!isAddOrUpdate">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrList">
          <el-table-column
            label="序列"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="250px"
            prop="attrName"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px" align="center">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                icon="Edit"
                @click="updateAttr"
              ></el-button>
              <el-button type="primary" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="isAddOrUpdate">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus">添加属性</el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table border style="margin: 12px; 0">
          <el-table-column
            width="100px"
            type="index"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column label="属性值名称"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { requestAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import { watch, ref } from 'vue'
import type { AttrList, AttrResponseData } from '@/api/product/attr/type'
const categoryStore = useCategoryStore()
const attrList = ref<AttrList>([])
const isAddOrUpdate = ref(true)

const addAttr = () => {
  isAddOrUpdate.value = true
}
const updateAttr = () => {
  isAddOrUpdate.value = true
}
const cancel = () => {
  isAddOrUpdate.value = false
}
watch(
  () => categoryStore.c3Id,
  async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    attrList.value = []
    if (!c3Id) return void 0

    const res: AttrResponseData = await requestAttr({ c1Id, c2Id, c3Id })
    console.log(res)
    if (res.code === 200) {
      attrList.value = res.data
    }
  },
)
</script>

<style scoped></style>

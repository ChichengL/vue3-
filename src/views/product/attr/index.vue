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
          v-has="'btn.Attr.add'"
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
                @click="updateAttr(row)"
                v-has="'btn.Attr.update'"
              ></el-button>
              <el-popconfirm title="确定删除吗?" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="primary" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="isAddOrUpdate">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="attrParams.attrName ? false : true"
          @click="addAttrValue"
        >
          添加属性
        </el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table
          border
          style="margin: 12px; 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            width="100px"
            type="index"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputs[$index] = vc)"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                v-if="flags[$index]"
                @blur="toLook(row, $index)"
              ></el-input>
              <div v-else @click="toEdit($index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  requestAddOrUpdateAttr,
  requestAttr,
  requestDeleteAttr,
} from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import { watch, ref, nextTick, onBeforeMount } from 'vue'
import type {
  AttrList,
  AttrResponseData,
  Attr,
  AttrValue,
} from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
const attrList = ref<AttrList>([])
const isAddOrUpdate = ref(false)

const attrParams = ref<Attr>({
  attrName: '', //新增属性的名字
  attrValueList: [], //新增属性值数组
  categoryId: '', //三级分类ID
  categoryLevel: 3,
})
const flags = ref<boolean[]>([]) //标识是否展示
const inputs = ref<any>([]) //标识是否聚焦
const toLook = (row: AttrValue, index: number) => {
  if (row.valueName.trim() === '') {
    attrParams.value.attrValueList.splice(index, 1)
    ElMessage({
      type: 'warning',
      message: '属性值不能为空',
    })
    return
  }
  const repeat = attrParams.value.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.value.attrValueList.splice(index, 1)

    ElMessage({ type: 'error', message: '属性值不能重复' })
    return
  }
  flags.value[index] = !flags.value[index]
}
const toEdit = (index: number) => {
  flags.value[index] = !flags.value[index]
  nextTick(() => {
    inputs.value[index].focus()
  })
}

const deleteAttr = async (id: number) => {
  const res = await requestDeleteAttr(id)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getAttr()
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
const addAttr = () => {
  isAddOrUpdate.value = true
  attrParams.value.categoryId = categoryStore.c3Id
}
const updateAttr = (row: Attr) => {
  isAddOrUpdate.value = true
  Object.assign(attrParams.value, JSON.parse(JSON.stringify(row)))
}
const cancel = () => {
  isAddOrUpdate.value = false
}

const addAttrValue = () => {
  attrParams.value.attrValueList.push({
    valueName: '',
  })
  flags.value.push(true)
  nextTick(() => {
    inputs.value[attrParams.value.attrValueList.length - 1].focus()
  })
}

const save = async () => {
  const res = await requestAddOrUpdateAttr(attrParams.value)
  console.log(res)
  if (res.code === 200) {
    isAddOrUpdate.value = false
    ElMessage({
      type: 'success',
      message: attrParams.value.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.value.id ? '修改失败' : '添加是失败',
    })
  }
}
watch(
  () => categoryStore.c3Id,
  async () => {
    attrList.value = []

    getAttr()
  },
)
//获取对应id的详细信息
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  if (!c3Id) return void 0
  const res: AttrResponseData = await requestAttr({ c1Id, c2Id, c3Id })
  console.log(res)
  if (res.code === 200) {
    attrList.value = res.data
  }
}

onBeforeMount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>

<template>
  <div>
    <el-table :border="true" style="width: 100%" row-key="id" :data="tableData">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="addItem(row)">
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 1 ? true : false"
            @click="updateItem(row)"
          >
            编辑
          </el-button>

          <el-popconfirm title="你确定删除这个吗?" @confirm="removeItem(row)">
            <template #reference>
              <el-button
                type="primary"
                size="small"
                :disabled="row.level === 1 ? true : false"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      width="450px"
      :title="menuData.id ? '更新菜单' : '添加菜单'"
    >
      <el-form v-model="menuData">
        <el-form-item label="昵称">
          <el-input placeholder="请输入昵称" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input
            placeholder="请输入权限值"
            v-model="menuData.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="save" type="primary">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BaseData, Params, responsePermissionData } from '@/api/acl/menu/type'

const tableData = ref<BaseData[]>([])
import {
  requestAddOrUpdatePermission,
  requestAllPermission,
  requestDeletePermission,
} from '@/api/acl/menu/index'
import { ElMessage } from 'element-plus'
onMounted(() => {
  getHasPermission()
})
const getHasPermission = async () => {
  const res: responsePermissionData = await requestAllPermission()
  if (res.code === 200) {
    tableData.value = res.data
  }
}

// 模态框的显示和隐藏
const dialogVisible = ref(false)
const menuData = ref<Params>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
const addItem = (row: BaseData) => {
  Object.assign(menuData.value, {
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  dialogVisible.value = true
  menuData.value.level = row.level + 1
  menuData.value.pid = row.id as number
}
const updateItem = (row: BaseData) => {
  dialogVisible.value = true
  Object.assign(menuData.value, row)
}

const removeItem = async (row: BaseData) => {
  const res = await requestDeletePermission(row.id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasPermission()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
const save = async () => {
  dialogVisible.value = false
  const res: any = await requestAddOrUpdatePermission(menuData.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: menuData.value.id === 0 ? '添加成功' : '更新成功',
    })
    getHasPermission()
  } else {
    ElMessage({
      type: 'error',
      message: menuData.value.id === 0 ? '添加失败' : '更新失败',
    })
  }
}
</script>

<style scoped></style>

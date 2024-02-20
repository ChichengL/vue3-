<template>
  <el-card class="card">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名称">
        <el-input placeholder="请输入用户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary">添加用户</el-button>
    <el-button type="primary">批量删除</el-button>
    <el-table border style="margin: 10px 0" :data="users">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="id" align="center" prop="id"></el-table-column>
      <el-table-column
        label="用户名字"
        align="center"
        prop="username"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        show-overflow-tooltip
        prop="name"
      ></el-table-column>
      <el-table-column
        label="绑定角色"
        align="center"
        show-overflow-tooltip
        prop="roleName"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        show-overflow-tooltip
        prop="createTime"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        show-overflow-tooltip
        prop="updateTime"
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row, $index }">
          <el-button type="primary" icon="User" size="small">
            分配角色
          </el-button>
          <el-button type="primary" icon="Edit" size="small">编辑</el-button>
          <el-button type="primary" icon="Delete" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @size-change="getHasUsers(1)"
      @current-change="getHasUsers"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { requestUsers } from '@/api/acl/user/index.ts'
import { User } from '@/api/acl/user/type'
const currentPage = ref(1)
const pageSize = ref<number>(5)
const users = ref<User[]>([])
const total = ref(1)
onMounted(async () => {
  getHasUsers()
})
const getHasUsers = async (pager = 1) => {
  currentPage.value = pager
  const res = await requestUsers(currentPage.value, pageSize.value)
  console.log(res)
  if (res.code === 200) {
    users.value = res.data.records
    total.value = res.data.total
  }
}
</script>

<style scoped>
.form {
  display: flex;
  align-items: center;
}
.card {
  height: 130px;
}
</style>

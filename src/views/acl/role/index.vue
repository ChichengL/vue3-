<template>
  <div>
    <el-card class="card">
      <el-form :inline="true" class="form">
        <el-form-item label="角色搜索">
          <el-input placeholder="请输入角色关键字" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="keyword.length > 0 ? false : true"
            @click="serachRolename"
          >
            搜索
          </el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus">添加角色</el-button>
      <el-table :data="roleArr">
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="id" prop="id" align="center"></el-table-column>
        <el-table-column
          label="角色名称"
          show-overflow-tooltip
          prop="roleName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          show-overflow-tooltip
          prop="createTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          show-overflow-tooltip
          prop="updateTime"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="360px">
          <template #="{ row, $index }">
            <el-button type="primary" icon="User">分配权限</el-button>
            <el-button type="primary" icon="Edit">编辑</el-button>
            <el-button type="primary" icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @size-change="getHasRoles(1)"
      @current-change="getHasRoles"
    />
  </div>
</template>

<script setup lang="ts">
import { requestRoleList } from '@/api/acl/role'
import { RoleData, RoleResponseData } from '@/api/acl/role/type'
import { ref, onMounted } from 'vue'

onMounted(() => {
  getHasRoles()
})

const keyword = ref('')
const serachRolename = () => {
  getHasRoles()
  keyword.value = ''
}
const reset = () => {
  getHasRoles()
}

const currentPage = ref<number>(1)
const pageSize = ref(10)
const total = ref<number>(1)
const roleArr = ref<RoleData[]>([])

const getHasRoles = async (pager = 1) => {
  currentPage.value = pager
  const res: RoleResponseData = await requestRoleList(
    currentPage.value,
    pageSize.value,
    keyword.value,
  )
  if (res.code === 200) {
    roleArr.value = res.data.records
    total.value = res.data.total
  }
}
</script>

<style scoped>
.card {
  height: 130px;
}
</style>

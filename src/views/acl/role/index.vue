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
      <el-button type="primary" icon="Plus" @click="addRole">
        添加角色
      </el-button>
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
            <el-button type="primary" icon="User" @click="setPermission(row)">
              分配权限
            </el-button>
            <el-button type="primary" icon="Edit" @click="updateRole(row)">
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定删除${row.roleName}?`"
              @confirm="deleteRole(row)"
              width="240px"
            >
              <template #reference>
                <el-button type="primary" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
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
    <el-dialog
      v-model="dialogVisiable"
      title="添加"
      width="600px"
      @close="closeDialog"
    >
      <el-form :model="roleParams" :rules="rules" ref="formRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            placeholder="请输入角色名称"
            v-model="roleParams.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisiable = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer">
      <template #title>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="treeRef"
          show-checkbox
          default-expand-all
          :data="menuArr"
          :props="defaultProps"
          :default-checked-keys="defaultArr"
          node-key="id"
        ></el-tree>
      </template>
      <template #footer>
        <el-button @click="drawer = false">取消</el-button>
        <el-button @click="savePermission">保存</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import {
  requestRoleList,
  requestAddOrUpdateRole,
  requestAllPermission,
  requestSerPermission,
  requestDeleteRole,
} from '@/api/acl/role'
import {
  MenuData,
  MenuResponseData,
  RoleData,
  RoleResponseData,
} from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'
import { ref, onMounted, nextTick } from 'vue'

onMounted(() => {
  getHasRoles()
})

//删除角色
const deleteRole = async (row: RoleData) => {
  const res = await requestDeleteRole(row.id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasRoles(
      roleArr.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//分配权限 && 权限管理
const defaultProps = {
  children: 'children',
  label: 'name',
}
const drawer = ref(false)
const menuArr = ref<MenuData[]>([])
const defaultArr = ref<number[]>([])
const treeRef = ref(null)
const setPermission = async (row: RoleData) => {
  drawer.value = true

  Object.assign(roleParams.value, row)
  const res: MenuResponseData = await requestAllPermission(
    roleParams.value.id as number,
  )
  if (res.code === 200) {
    menuArr.value = res.data
    defaultArr.value = filterSelectArr(menuArr.value, [])
  } else {
    ElMessage({
      message: res.message,
      type: 'error',
    })
  }
}
const filterSelectArr = (data: any, initArr: any) => {
  data.forEach((item: any) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}
const savePermission = async () => {
  let nodearr = treeRef.value.getCheckedKeys()
  let halfnodearr1 = treeRef.value.getHalfCheckedKeys()
  const res = await requestSerPermission(
    roleParams.value.id as number,
    nodearr.concat(halfnodearr1),
  )
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '权限分配成功',
    })
    drawer.value = false
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '权限分配失败',
    })
  }
}

watch(
  () => drawer.value === false,
  () => {
    defaultArr.value = []
  },
)
//表单校验
const formRef = ref<HTMLFormElement>()
const validatorRoleName = (_rule: any, value: any, cb: any) => {
  if (value.length >= 2) {
    cb()
  } else {
    cb(new Error('长度至少为2位'))
  }
}
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
//更新角色

const roleParams = ref<RoleData>({
  roleName: '',
})
const updateRole = (row: RoleData) => {
  dialogVisiable.value = true
  Object.assign(roleParams.value, row)
}
const closeDialog = () => {
  roleParams.value = {
    roleName: '',
  }
  nextTick(() => {
    ;(formRef.value as HTMLFormElement).clearValidate('roleName')
  })
}

//添加角色相关
const dialogVisiable = ref(false)
const addRole = () => {
  dialogVisiable.value = true
}

const save = async () => {
  await (formRef.value as HTMLFormElement).validate()
  const res = await requestAddOrUpdateRole(roleParams.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParams.value.id ? '更新成功' : '新增成功',
    })
    getHasRoles(roleParams.value.id ? currentPage.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.value.id ? '更新失败' : '新增失败',
    })
  }
  dialogVisiable.value = false
}

//获取角色相关
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

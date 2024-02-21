<template>
  <el-card class="card">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名称">
        <el-input placeholder="请输入用户名称" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="keyword.length > 0 ? false : true"
          @click="serachUsername"
        >
          搜索
        </el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button
      type="primary"
      :disabled="selectIdArr.length ? false : true"
      @click="deleteUserSelected"
    >
      批量删除
    </el-button>
    <el-table
      border
      style="margin: 10px 0"
      :data="users"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="id" align="center" prop="id"></el-table-column>
      <el-table-column
        label="用户名"
        align="center"
        prop="username"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户昵称"
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
          <el-button
            type="primary"
            icon="User"
            size="small"
            @click="setRole(row)"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="editUser(row)"
          >
            编辑
          </el-button>

          <el-popconfirm
            :title="`你确定要删除${row.username}?`"
            width="200px"
            @confirm="deleteUser(row.id)"
          >
            <template #reference>
              <el-button type="primary" icon="Delete" size="small">
                删除
              </el-button>
            </template>
          </el-popconfirm>
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
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '修改用户' : '新增用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            placeholder="请输入用户昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input
            placeholder="请输入密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = !drawer">取消</el-button>
        <el-button type="primary" @click="save">提交</el-button>
      </div>
    </template>
  </el-drawer>
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>用户角色分配</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户名">
          <el-input :disabled="true" v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item label="角色表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="userRoles"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(item, index) in allRoles"
              :key="index"
              :label="item"
            >
              {{ item.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = !drawer">取消</el-button>
        <el-button type="primary" @click="confirmRole">提交</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import {
  requestAddOrUpdateUser,
  requestAllRoles,
  requestRemoveUser,
  requestRemoveUserList,
  requestSetRole,
  requestUsers,
} from '@/api/acl/user/index.ts'
import {
  RoleData,
  RoleResponseData,
  SetRoleData,
  User,
} from '@/api/acl/user/type'
import { CheckboxValueType, ElMessage } from 'element-plus'
import useuserStore from '@/store/modules/user'

onMounted(async () => {
  getHasUsers()
})

//搜索相关
const keyword = ref('')
const serachUsername = () => {
  getHasUsers()
  keyword.value = ''
}
const reset = () => {
  getHasUsers()
}

//删除相关
const selectIdArr = ref<User[]>([])
const deleteUser = async (id: number | undefined) => {
  const res = await requestRemoveUser(id as number)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUsers(users.value.length > 1 ? currentPage.value : 1)
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
const deleteUserSelected = async () => {
  const list = selectIdArr.value.map((item) => item.id)
  const res = await requestRemoveUserList(list as number[])
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUsers(users.value.length - list.length > 0 ? currentPage.value : 1)
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
const selectChange = (value: any[]) => {
  selectIdArr.value = value
}

const userStore = useuserStore()
//分配角色相关
const drawer1 = ref(false)
const checkAll = ref(false)
const allRoles = ref<RoleData[]>([])
const userRoles = ref<RoleData[]>([])
const isIndeterminate = ref(false)
const setRole = async (row: User) => {
  drawer1.value = true
  Object.assign(userParams.value, row)
  const res: RoleResponseData = await requestAllRoles(
    userParams.value.id as number,
  )
  if (res.code === 200) {
    allRoles.value = res.data.allRolesList
    userRoles.value = res.data.assignRoles
  }
}
const handleCheckAllChange = (val: CheckboxValueType) => {
  userRoles.value = val ? allRoles.value : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: CheckboxValueType[]): any => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRoles.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoles.value.length
}
const confirmRole = async () => {
  let data: SetRoleData = {
    userId: userParams.value.id as number,
    roleIdList: userRoles.value.map((item) => item.id as number),
  }
  const res: any = await requestSetRole(data)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '分配角色成功' })
    getHasUsers()
  } else {
    ElMessage({ type: 'error', message: '分配角色失败' })
  }
  drawer1.value = false
  checkAll.value = false
}

//校验表单相关
const validateUsername = (_rule: any, value: any, cb: any) => {
  if (value.trim().length >= 5) {
    cb()
  } else {
    cb(new Error('用户名字至少五位'))
  }
}
const validateName = (_rule: any, value: any, cb: any) => {
  if (value.trim().length >= 5) {
    cb()
  } else {
    cb(new Error('名字至少五位'))
  }
}
const validatePassword = (_rule: any, value: any, cb: any) => {
  if (value.trim().length >= 6) {
    cb()
  } else {
    cb(new Error('密码至少六位'))
  }
}
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  name: [{ required: true, trigger: 'blur', validator: validateName }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
}

//分页器相关
const currentPage = ref(1)
const pageSize = ref<number>(5)
const users = ref<User[]>([])
const total = ref(1)

const getHasUsers = async (pager = 1) => {
  currentPage.value = pager
  const res = await requestUsers(
    currentPage.value,
    pageSize.value,
    keyword.value,
  )
  if (res.code === 200) {
    users.value = res.data.records
    total.value = res.data.total
  }
}
//用户信息相关
const drawer = ref(false)
const userParams = ref<User>({
  username: '',
  name: '',
  password: '',
})
const formRef = ref(null)

const addUser = () => {
  drawer.value = !drawer.value
  userParams.value = {
    username: '',
    name: '',
    password: '',
  }
  nextTick(() => {
    ;(formRef.value as unknown as HTMLFormElement).clearValidate([
      'username',
      'name',
      'password',
    ])
  })
}
const editUser = (row: User) => {
  drawer.value = !drawer.value
  Object.assign(userParams.value, JSON.parse(JSON.stringify(row)))
  nextTick(() => {
    ;(formRef.value as unknown as HTMLFormElement).clearValidate([
      'username',
      'name',
      'password',
    ])
  })
}
const save = async () => {
  try {
    await (formRef.value as unknown as HTMLFormElement).validate()
    const res = await requestAddOrUpdateUser(userParams.value)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: userParams.value.id ? '修改成功' : '添加成功',
      })

      getHasUsers(userParams.value.id ? currentPage.value : 1)
      //保证修改自己的就刷新
      userStore.username === userParams.value.username
        ? window.location.reload()
        : ''
    } else {
      ElMessage({
        type: 'error',
        message: userParams.value.id ? '修改失败' : '添加失败',
      })
    }
    drawer.value = false
  } catch (error) {
    ElMessage({ type: 'error', message: '请保证表单符合要求' })
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

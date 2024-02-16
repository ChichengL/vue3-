<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="userForm"
          :rules="rules"
          ref="loginForm"
        >
          <h1>欢迎</h1>
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="userForm.username"
            ></el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="userForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="default"
              class="login_button"
              @click="login"
              :loading="loading"
            >
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useuserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time.ts'
const userForm = ref({ username: 'admin', password: '111111' })
const userStore = useuserStore()
const route = useRoute()

const router = useRouter()
const loading = ref(false)
const loginForm = ref(null)

const login = async () => {
  loading.value = true
  await loginForm.value.validate()
  console.log(loginForm.value)

  try {
    await userStore.userLogin(userForm.value)
    let redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: `${getTime()}好`,
    })
    loading.value = false
  } catch (error: any) {
    ElNotification({
      type: 'error',
      message: error.message,
    })
    loading.value = false
  }
}
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度至少为5'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少为6'))
  }
}
const rules = {
  username: [{ trigger: 'change', validator: validatorUsername }],
  password: [{ trigger: 'change', validator: validatorPassword }],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  // 确保其父元素也填充整个屏幕
  position: absolute; // 或 fixed / relative 根据你的布局需求
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .login_form {
    position: relative;
    width: 50%;
    top: 40vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      font-size: 40px;
      color: white;
    }
    .login_button {
      width: 100%;
    }
  }
}
</style>

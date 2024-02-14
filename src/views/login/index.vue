<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" v-model="userForm">
          <h1>欢迎</h1>
          <el-item>
            <el-input
              :prefix-icon="User"
              v-model="userForm.username"
            ></el-input>
          </el-item>
          <el-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="userForm.password"
              show-password
            ></el-input>
          </el-item>
          <el-item>
            <el-button
              type="primary"
              size="default"
              class="login_button"
              @click="login"
              :loading="loading"
            >
              登陆
            </el-button>
          </el-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useuserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
const userForm = ref({ username: 'admin', password: '111111' })
const userStore = useuserStore()
const $router = useRouter()
const loading = ref(false)
const login = async () => {
  loading.value = true

  try {
    await userStore.userLogin(userForm.value)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登陆成功',
    })
    loading.value = false
  } catch (error) {
    ElNotification({
      type: 'error',
      message: error.message,
    })
    loading.value = false
  }
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
    :deep('el-item') {
      margin: 10px;
    }
  }
}
</style>

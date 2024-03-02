<template>
  <div>
    <el-card class="card_container">
      <el-avatar :src="avatar" :size="100" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好{{ username }}</h3>
        <span class="comments">CC</span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from 'vue'
import useuserStore from '@/store/modules/user.ts'
import { getTime } from '@/utils/time'
const userStore = useuserStore()
onMounted(() => {
  userStore.userInfo()
})
const { avatar, username } = toRefs(userStore)
</script>

<style scoped>
:deep(.el-card__body) {
  display: flex;
  width: 100%;
  align-items: center;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-left: 20px;
    .title {
      font-size: 28px;
      margin-bottom: 20px;
    }
    .comments {
      color: rgb(189, 184, 184)
    }
  }
}
</style>

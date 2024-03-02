<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goRoute">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onBeforeUnmount } from 'vue'
import moment from 'moment'
const router = useRouter()
const time = ref(moment('YYYY-MM-DD:hh-mm-ss'))
let timer = setInterval(() => {
  time.value = moment().format('YYYY年MM月DD日   hh:mm:ss')
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
const goRoute = () => {
  router.push('/home')
}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .right {
    display: flex;
    justify-content: space-between;
    flex: 1;
    color: #29fcff;
    align-items: center;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    .rbtn {
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      width: 150px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
    }
    .time {
    }
  }
  .left {
    display: flex;
    justify-content: flex-end; // 将子元素靠右对齐
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    .lbtn {
      color: #29fcff;

      width: 150px;
      height: 40px;
      margin-left: auto;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
    }
    .lbtn:hover {
      cursor: pointer; // 添加此行，使得鼠标悬停在该元素上时变为小手形状
    }
  }
  .center {
    flex: 3;
    .title {
      width: 100%;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      color: red;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }
}
</style>

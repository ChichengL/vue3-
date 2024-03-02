<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>999999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const people = ref('219998人')
const charts = ref()
onMounted(() => {
  const mycharts = echarts.init(charts.value)
  mycharts.setOption({
    title: {
      text: '水球图',
    },
    series: {
      type: 'liquidFill',
      data: [0.5, 0.45, 0.53],
      itemStyle: {
        opacity: 0.6,
      },
      emphasis: {
        itemStyle: {
          opacity: 0.9,
        },
      },
      waveAnimation: true,
      animationDuration: 3,
      radius: '100%',
    },
  })
})
</script>

<style scoped>
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    color: aliceblue;
    margin-left: 20px;

    .title {
      font-size: 20px;
    }
    .bg {
      background: url(../../images/dataScreen-title.png) no-repeat;
      width: 68px;
      height: 7px;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      margin-right: 5px;
    }
  }
  .number {
    margin-top: 60px;
    display: flex;
    span {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>

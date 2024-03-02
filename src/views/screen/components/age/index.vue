<template>
  <div class="box">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const charts = ref<HTMLElement>()
onMounted(() => {
  const mycharts = echarts.init(charts.value)
  mycharts.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 40,
      right: 20,
      orient: 'vertical',
      itemStyle: {},
      textStyle: {
        color: 'white',
        fontSize: 18,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
          fontSize: 14,
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'AAAA' },
          { value: 735, name: 'BBBB' },
          { value: 580, name: 'CCCC' },
          { value: 484, name: 'DDDD' },
          { value: 300, name: 'EEEE' },
        ],
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    width: 100%;
    height: 260px;
  }
}
</style>

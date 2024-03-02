<template>
  <div class="box">
    <div class="title">
      <p>未来7天游客趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const line = ref()
onMounted(() => {
  const mycharts = echarts.init(line.value)
  mycharts.setOption({
    title: {
      text: '游客量',
      right: 0,
      top: '10',
      textStyle: {
        color: '#29fcff',
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: { show: false },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
    },
    yAxis: {
      splitLine: { show: false },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      top: 0,
      right: 0,
      bottom: 20,
    },
    series: [
      {
        type: 'line',
        data: [100, 300, 651, 21, 63, 788, 592],
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'orange', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })
})
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 40px);
  }
}
</style>

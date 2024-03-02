<template>
  <div class="box">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const charts = ref()
onMounted(() => {
  const mycharts = echarts.init(charts.value)
  mycharts.setOption({
    xAxis: {},
    yAxis: {
      type: 'category',
      title: {
        show: true,
      },
    },
    series: [
      {
        type: 'bar',
        data: [99, 163, 999, 15, 123],
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 10px;
  .title {
    margin-left: 10px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 30px);
  }
}
</style>

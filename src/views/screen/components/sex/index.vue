<template>
  <div class="box">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man"><img src="../../images/man.png" alt="" /></div>
      <div class="woman"><img src="../../images/woman.png" alt="" /></div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const charts = ref()
onMounted(() => {
  if (charts.value) {
    const mycharts = echarts.init(charts.value)
    mycharts.setOption({
      title: '',
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: 'category',
      },
      series: [
        {
          type: 'bar',
          data: [58],
          itemStyle: { normal: { barBorderRadius: [25, 25, 25, 25] } },
          barWidth: 20,
          z: 100,
        },
        {
          type: 'bar',
          data: [100],
          barWidth: 20,
          barGap: '-100%',
          itemStyle: {
            normal: { color: 'red', barBorderRadius: [25, 25, 25, 25] },
          },
        },
      ],
      grid: {
        left: '20%',
        top: '20%',
        right: '20%',
        bottom: '20%',
      },
    })
  }
})
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .sex {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .man {
      width: 111px;
      height: 115px;
      margin: 16px;
      background: url(../../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .woman {
      width: 111px;
      height: 115px;
      margin: 16px;
      background: url(../../images/woman-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    p {
      color: white;
      margin: 0 60px;
    }
  }
  .charts {
    width: 100%;
    height: 100px;
  }
}
</style>

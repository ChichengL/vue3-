<template>
  <div class="box" ref="map"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import china from './map.json'
const map = ref()
echarts.registerMap('china', china)
onMounted(() => {
  let mycharts = echarts.init(map.value)
  mycharts.setOption({
    geo: {
      map: 'china',
      roam: true,
      label: {
        show: true,
      },
      itemStyle: {},
      emphasis: {
        itemStyle: {
          color: 'red',
        },
        label: {
          fontSize: 30,
        },
      },
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989], //起点
              [104.065735, 30.659462], //终点
            ],
            lineStyle: {
              color: 'blue',
              width: 2,
              curveness: 0.2,
            },
          },
          {
            coords: [
              [104.065735, 30.659462],

              [116.405285, 39.904989],
            ],
            lineStyle: {
              color: 'blue',
              width: 2,
              curveness: 0.2,
            },
          },
          {
            coords: [
              [104.065735, 30.659462],

              [121.472644, 31.231706],
            ],
            lineStyle: {
              color: 'blue',
              width: 2,
              curveness: 0.2,
            },
          },
        ],
        effect: {
          show: true,
          symbol: 'image:///飞机.svg',
          color: 'orange',
          symbolSize: 20,
        },
      },
    ],
  })
})
</script>

<style scoped></style>

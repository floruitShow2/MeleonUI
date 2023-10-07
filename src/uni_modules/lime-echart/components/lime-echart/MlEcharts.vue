<template>
  <view class="ml-echarts">
    <l-echart ref="chartRef" @finished="init"></l-echart>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  // nvue 不需要引入
  // #ifdef VUE2
  import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
  // #endif
  // #ifdef VUE3
  // #ifdef MP
  // 由于vue3 使用vite 不支持umd格式的包，小程序依然可以使用，但需要使用require
  const echarts = require('../../static/echarts.min')
  // #endif
  // #ifndef MP
  // 由于 vue3 使用 vite 不支持umd格式的包，故引入npm的包
  import * as echarts from 'echarts/dist/echarts.esm'
  // #endif
  // #endif

  const props = defineProps({
    option: {
      type: Object,
      required: true
    }
  })
  const chartRef = ref()
  const init = () => {
    chartRef.value.init(echarts, (chart: any) => {
      chart.setOption(props.option)
    })
  }
</script>

<style lang="less">
  .ml-echarts {
    width: 100%;
    height: 100%;
  }
</style>

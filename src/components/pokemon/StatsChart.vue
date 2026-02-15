<template>
  <view class="mb-6">
    <text class="text-xl font-bold text-gray-800 mb-4">能力值</text>
    <canvas canvas-id="stats-chart" class="h-64 w-full"></canvas>
  </view>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chart = ref(null)
    
    const initChart = () => {
      const ctx = uni.createCanvasContext('stats-chart')
      
      // 这里应该使用实际的图表库，如echarts或基于Canvas的实现
      // 由于uni-app环境限制，需要使用uni-app提供的Canvas API
      
      // 简化实现，仅作示例
      console.log('初始化能力值图表', props.stats)
      
      // 实际项目中应该根据props.stats绘制雷达图
    }
    
    onMounted(() => {
      initChart()
    })
    
    return {
      chart
    }
  }
}
</script>

<style scoped>
</style>    
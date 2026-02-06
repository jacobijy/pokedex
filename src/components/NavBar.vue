<template>
  <view class="nav-bar bg-red-500 text-white shadow-md fixed top-0 left-0 right-0 z-50">
    <view class="container mx-auto px-4 flex items-center justify-between py-2.5">
      <!-- Logo和标题 (左侧) -->
      <view class="flex items-center space-x-2 flex-shrink-0">
        <image 
          src="/static/icons/pokemon-logo.png" 
          mode="aspectFit" 
          class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        ></image>
        <text class="text-lg sm:text-xl font-bold whitespace-nowrap">宝可梦图鉴</text>
      </view>

      <!-- 搜索框 (中间) -->
      <view class="flex-grow mx-4 relative max-w-md">
        <input 
          type="text" 
          placeholder="搜索宝可梦..." 
          class="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none"
          v-model="searchText"
          @input="onSearch"
        />
        <image 
          src="/static/icons/search.png" 
          mode="aspectFit" 
          class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
        ></image>
      </view>

      <!-- 筛选按钮 (右侧) -->
      <button 
        class="p-1.5 rounded-full hover:bg-red-600 transition-colors flex-shrink-0"
        @click="toggleFilter"
      >
        <image src="/static/icons/filter.png" mode="aspectFit" class="w-6 h-6"></image>
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 定义响应式数据
const searchText = ref('')
const filterVisible = ref(false)

// 定义方法
const onSearch = () => {
  // 向父组件发送搜索事件
  emit('search', searchText.value)
}

const toggleFilter = () => {
  filterVisible.value = !filterVisible.value
  // 向父组件发送筛选切换事件
  emit('filterToggle', filterVisible.value)
}

// 定义 emit 用于向父组件传递事件
const emit = defineEmits(['search', 'filterToggle'])
</script>

<style lang="scss" scoped>
.nav-bar {
  height: calc(var(--status-bar-height) + 50px); /* 适配状态栏高度 */
  padding-top: var(--status-bar-height); /* 避免内容被状态栏遮挡 */

  .container {
    height: 100%;
  }
}
</style>
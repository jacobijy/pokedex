<template>
  <view class="nav-bar bg-red-500 text-white shadow-md sticky top-0 z-50">
    <view class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- Logo和标题 -->
      <view class="flex items-center space-x-2">
        <image src="/static/icons/pokemon-logo.png" mode="aspectFit" class="w-8 h-8"></image>
        <text class="text-xl font-bold">宝可梦图鉴</text>
      </view>
      
      <!-- 搜索和筛选 -->
      <view class="flex items-center space-x-4">
        <!-- 搜索框 -->
        <view class="relative w-48 md:w-64">
          <input 
            type="text" 
            placeholder="搜索宝可梦..." 
            class="px-4 py-2 rounded-full text-gray-800 w-full focus:outline-none"
            v-model="searchText"
            @input="onSearch"
          />
          <image src="/static/icons/search.png" mode="aspectFit" class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"></image>
        </view>
        
        <!-- 筛选按钮 -->
        <button class="p-2 rounded-full hover:bg-red-600 transition-colors" @click="toggleFilter">
          <image src="/static/icons/filter.png" mode="aspectFit" class="w-5 h-5"></image>
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      filterVisible: false
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchText)
    },
    toggleFilter() {
      this.filterVisible = !this.filterVisible
      this.$emit('filterToggle', this.filterVisible)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  @apply bg-red-500 text-white shadow-md sticky top-0 z-50;
}
</style>
    
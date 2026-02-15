<template>
  <view class="mt-8 flex justify-center">
    <view class="flex items-center space-x-1">
      <button class="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <button v-for="page in pagesToShow" :key="page" :class="page === currentPage ? 'px-3 py-2 rounded-md border border-gray-300 bg-red-500 text-sm font-medium text-white' : 'px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'" @click="goToPage(page)">{{page}}</button>
      <button class="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    pageRange: {
      type: Number,
      default: 3
    }
  },
  computed: {
    pagesToShow() {
      let start = Math.max(1, this.currentPage - this.pageRange)
      let end = Math.min(this.totalPages, this.currentPage + this.pageRange)
      
      // 确保显示的页数不超过pageRange的2倍加1
      if (end - start + 1 < this.pageRange * 2 + 1) {
        if (start === 1) {
          end = Math.min(this.totalPages, start + this.pageRange * 2)
        } else if (end === this.totalPages) {
          start = Math.max(1, end - this.pageRange * 2)
        }
      }
      
      const pages = []
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // 添加省略号
      if (start > 1) {
        pages.unshift('...')
        pages.unshift(1)
      }
      
      if (end < this.totalPages) {
        pages.push('...')
        pages.push(this.totalPages)
      }
      
      return pages
    }
  },
  methods: {
    goToPage(page) {
      if (page === '...' || page === this.currentPage) return
      this.$emit('pageChange', page)
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('pageChange', this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('pageChange', this.currentPage + 1)
      }
    }
  }
}
</script>

<style scoped>
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>    
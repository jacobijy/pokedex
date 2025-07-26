<template>
  <view class="mb-6">
    <text class="text-xl font-bold text-gray-800 mb-4">进化链</text>
    <view class="evolution-chain">
      <view v-for="(stage, index) in evolutionChain" :key="index" class="text-center flex-1">
        <view class="w-20 h-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center">
          <image :src="stage.imageUrl" mode="aspectFit" class="w-16 h-16 object-contain"></image>
        </view>
        <text class="text-sm font-medium mt-1">{{stage.name}}</text>
        <text class="text-xs text-gray-500" v-if="stage.level">{{`Lv.${stage.level}`}}</text>
        <view v-if="index < evolutionChain.length - 1" class="evolution-arrow">→</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    evolutionChain: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.evolution-chain {
  @apply flex items-center justify-between relative;
}

.evolution-arrow {
  @apply absolute left-1/2 transform -translate-x-1/2 text-2xl;
}
</style>    
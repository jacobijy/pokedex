<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3 flex justify-between items-center">
      <button class="flex items-center" @click="goBack">
        <image src="/static/icons/back.png" mode="aspectFit" class="w-5 h-5 mr-2"></image>
        <text class="font-medium">返回</text>
      </button>
      <text class="font-bold text-lg">{{ pokemon.name || '宝可梦详情' }}</text>
      <button class="p-2">
        <image src="/static/icons/favorite.png" mode="aspectFit" class="w-6 h-6"></image>
      </button>
    </view>
    
    <!-- 内容区域 -->
    <view class="content pt-16 pb-20">
      <!-- 宝可梦基本信息 -->
      <BasicInfo :pokemon="pokemon" />
      
      <!-- 能力值图表 -->
      <StatsChart :stats="pokemon.stats" :types="pokemon.types" />
      
      <!-- 进化链 -->
      <EvolutionChain :chain="pokemon.evolutionChain" />
      
      <!-- 招式列表 -->
      <MovesList :moves="pokemon.moves" />
    </view>
    
    <!-- 底部导航栏 -->
    <view class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center">
      <button class="flex flex-col items-center text-red-500">
        <image src="/static/icons/info-active.png" mode="aspectFit" class="w-6 h-6"></image>
        <text class="text-xs mt-1">详情</text>
      </button>
      <button class="flex flex-col items-center text-gray-400">
        <image src="/static/icons/battle.png" mode="aspectFit" class="w-6 h-6"></image>
        <text class="text-xs mt-1">对战</text>
      </button>
      <button class="flex flex-col items-center text-gray-400">
        <image src="/static/icons/items.png" mode="aspectFit" class="w-6 h-6"></image>
        <text class="text-xs mt-1">道具</text>
      </button>
      <button class="flex flex-col items-center text-gray-400">
        <image src="/static/icons/team.png" mode="aspectFit" class="w-6 h-6"></image>
        <text class="text-xs mt-1">队伍</text>
      </button>
    </view>
  </view>
</template>

<script>
import BasicInfo from '@/components/pokemon/BasicInfo.vue'
import EvolutionChain from '@/components/pokemon/EvolutionChain.vue'
import MovesList from '@/components/pokemon/MovesList.vue'
import PokemonHeader from '@/components/pokemon/PokemonHeader.vue'
import StatsChart from '@/components/pokemon/StatsChart.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    PokemonHeader,
    BasicInfo,
    StatsChart,
    EvolutionChain,
    MovesList
  },
  data() {
    return {
      pokemon: {}
    }
  },
  onLoad(options) {
    this.fetchPokemonDetail(options.id)
  },
  methods: {
    ...mapActions('pokemon', ['fetchPokemonDetail']),
    async fetchPokemonDetail(id) {
      try {
        const res = await this.fetchPokemonDetail(id)
        this.pokemon = { id: 1, name: '妙蛙种子', types: ['草', '毒'], image: 'https://picsum.photos/seed/bulbasaur/200/200', hp: 45 }
      } catch (error) {
        console.error('获取宝可梦详情失败:', error)
        uni.showToast({
          title: '获取详情失败',
          icon: 'none'
        })
      }
    },
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
}

.content {
  padding: 16px;
  padding-top: 70px; /* 为顶部导航栏留出空间 */
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}
</style>
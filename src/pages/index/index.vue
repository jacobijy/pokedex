<template>
  <view class="favorites-container">
    <!-- 顶部标题 -->
    <view class="favorites-header">
      <image src="/static/star.png" class="header-icon" />
      <text class="header-title">我的收藏</text>
    </view>
    
    <!-- 收藏列表 -->
    <scroll-view 
      scroll-y 
      class="pokemon-grid"
      v-if="favoritesList.length > 0"
    >
      <PokemonCard 
        v-for="p in favoritesList" 
        :key="p.id" 
        :pokemon="p" 
        @select="showDetail"
      />
    </scroll-view>
    
    <!-- 空状态 -->
    <view v-else class="empty-state">
      <image src="/static/pokeball.png" class="empty-icon" />
      <text class="empty-text">暂无收藏的宝可梦</text>
      <text class="empty-hint">去宝可梦列表收藏喜欢的宝可梦吧</text>
    </view>
    
    <!-- 详情页弹窗 -->
    <PokemonDetail 
      v-if="selectedPokemon" 
      :pokemon="selectedPokemon" 
      @close="selectedPokemon = null"
    />
    
    <!-- 底部导航栏 -->
    <view class="tab-bar">
      <view 
        class="tab-item"
        :class="{ active: activeTab === 'index' }"
        @click="switchTab('index')"
      >
        <image 
          src="/static/tab-icons/pokemon.png" 
          class="tab-icon"
          :class="{ active: activeTab === 'index' }"
        />
        <text>宝可梦</text>
      </view>
      <view 
        class="tab-item"
        :class="{ active: activeTab === 'favorites' }"
        @click="switchTab('favorites')"
      >
        <image 
          src="/static/tab-icons/star.png" 
          class="tab-icon"
          :class="{ active: activeTab === 'favorites' }"
        />
        <text>收藏</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import PokemonCard from '@/components/PokemonCard.vue';
import PokemonDetail from '@/components/PokemonDetail.vue';
import { usePokemonStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const pokemonStore = usePokemonStore();
const { pokemonList, favorites } = storeToRefs(pokemonStore);

const activeTab = ref('favorites');
const selectedPokemon = ref(null);

// 获取收藏的宝可梦列表
const favoritesList = computed(() => {
  return pokemonList.value.filter(p => favorites.value.includes(p.id));
});

// 显示详情
const showDetail = (pokemon) => {
  selectedPokemon.value = pokemon;
};

// 切换标签页
const switchTab = (tab) => {
  if (tab === 'index') {
    uni.switchTab({
      url: '/pages/index/index'
    });
  } else {
    activeTab.value = tab;
  }
};
</script>

<style scoped>
.favorites-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(to bottom, #1a2a6c, #b21f1f, #fdbb2d);
  padding: 20px 15px 80px 15px;
}

.favorites-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header-icon {
  width: 28px;
  height: 28px;
  margin-right: 10px;
}

.header-title {
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.pokemon-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  padding-bottom: 20px;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  opacity: 0.7;
}

.empty-text {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.empty-hint {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 0 20px;
}

/* 底部导航栏样式（与首页相同） */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  border-top: 1px solid #eee;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #888;
}

.tab-item.active {
  color: #e53935;
}

.tab-icon {
  width: 28px;
  height: 28px;
  margin-bottom: 5px;
  filter: grayscale(1);
  opacity: 0.7;
  transition: all 0.3s;
}

.tab-icon.active {
  filter: grayscale(0);
  opacity: 1;
  transform: scale(1.1);
}
</style>
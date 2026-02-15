<template>
  <view class="pokedex-container">
    <!-- 顶部搜索栏 -->
    <SearchHeader 
      v-model="searchQuery" 
      @favorites="activeTab = 'favorites'"
    />
    
    <!-- 标签切换 -->
    <view class="tabs">
      <view 
        class="tab" 
        :class="{active: activeTab === 'all'}" 
        @click="activeTab = 'all'"
      >
        全部宝可梦
      </view>
      <view 
        class="tab" 
        :class="{active: activeTab === 'favorites'}" 
        @click="activeTab = 'favorites'"
      >
        我的收藏
      </view>
    </view>
    
    <!-- 加载状态 -->
    <view v-if="loading" class="loading">
      <image src="/static/loading.gif" class="loading-icon" />
      <text>加载中...</text>
    </view>
    
    <!-- 宝可梦列表 -->
    <view v-else-if="filteredPokemon.length > 0" class="pokemon-grid">
      <PokemonCard 
        v-for="p in filteredPokemon" 
        :key="p.id" 
        :pokemon="p" 
        @select="showDetail"
      />
    </view>
    
    <!-- 空状态 -->
    <view v-else class="empty-state">
      <image src="/static/pokeball.png" class="empty-icon" />
      <text class="empty-text">没有找到匹配的宝可梦</text>
      <text class="empty-hint">请尝试其他搜索词</text>
    </view>
    
    <!-- 详情页弹窗 -->
    <PokemonDetail 
      v-if="selectedPokemon" 
      :pokemon="selectedPokemon" 
      @close="selectedPokemon = null"
    />
  </view>
</template>

<script setup>
import PokemonCard from '@/components/PokemonCard.vue';
import PokemonDetail from '@/components/PokemonDetail.vue';
import SearchHeader from '@/components/SearchHeader.vue';
import { usePokemonStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

const pokemonStore = usePokemonStore();
const { pokemonList, favorites } = storeToRefs(pokemonStore);
const { fetchPokemon } = pokemonStore;

const searchQuery = ref('');
const activeTab = ref('all');
const selectedPokemon = ref(null);
const loading = ref(true);

// 计算过滤后的宝可梦列表
const filteredPokemon = computed(() => {
  let list = [...pokemonList.value];
  
  // 应用收藏筛选
  if (activeTab.value === 'favorites') {
    list = list.filter(p => favorites.value.includes(p.id));
  }
  
  // 应用搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.id.toString().includes(query) ||
      p.types.some(type => type.toLowerCase().includes(query))
    );
  }
  
  return list;
});

// 显示详情
const showDetail = (pokemon) => {
  selectedPokemon.value = pokemon;
};

onMounted(async () => {
  try {
    await fetchPokemon();
  } catch (error) {
    console.error('加载宝可梦数据失败:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* 样式与之前类似，省略以节省空间 */
</style>
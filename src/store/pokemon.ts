import { fetchPokemonList, type IPokemonModal } from '@/services/pokemon';
import { padId } from '@/utils/helpers';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList: Ref<IPokemonModal[]> = ref([]);
  const favorites = ref(JSON.parse(localStorage.getItem('pokemonFavorites') + '') || []);
  
  // 获取宝可梦数据
  const fetchPokemon = async () => {
    const data = await fetchPokemonList();
    pokemonList.value = data.map(p => ({
      ...p,
      formattedId: padId(p.id)
    }));
  };
  
  // 切换收藏状态
  const toggleFavorite = (id: number) => {
    const index = favorites.value.indexOf(id);
    if (index >= 0) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push(id);
    }
    // 保存到本地存储
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites.value));
  };
  
  // 检查是否收藏
  const isFavorite = (id: number) => {
    return favorites.value.includes(id);
  };
  
  return {
    pokemonList,
    favorites,
    fetchPokemon,
    toggleFavorite,
    isFavorite
  };
});
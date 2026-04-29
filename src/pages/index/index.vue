<template>
    <view 
        class="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] transition-opacity duration-300 flex flex-col" 
        :class="{'opacity-0': transitioning, 'opacity-100': !transitioning}"
        :style="{ paddingTop: 'calc(var(--status-bar-height) + 60px)', paddingBottom: '100px' }"
    >
        <!-- 导航栏 -->
        <NavBar @search="onSearch" @filterToggle="filterToggle" @showFavorites="toggleFavoritesView" />

        <!-- 筛选和排序 -->
        <FilterBar v-show="isShow" @filterToggle="filterToggle" @filterChange="onFilterChange" />

        <!-- 收藏视图提示 -->
        <view v-if="showFavoritesOnly" class="fixed z-[998] bg-gradient-to-r from-yellow-400 to-orange-400 shadow-[0_2px_8px_rgba(0,0,0,0.1)] animate-slideDown" :style="{ top: 'calc(var(--status-bar-height) + 60px)' }">
            <view class="px-5 py-3 flex items-center justify-between">
                <view class="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <text class="text-sm font-semibold text-white">已收藏的宝可梦 ({{ filteredPokemons.length }})</text>
                </view>
                <button class="px-3 py-1.5 bg-white/20 rounded-full text-xs font-semibold text-white hover:bg-white/30 transition-all active:scale-95" @click="toggleFavoritesView">
                    查看全部
                </button>
            </view>
        </view>

        <!-- 宝可梦列表 -->
        <view class="flex-1 overflow-y-auto p-3 custom-scrollbar" @scroll="onScroll">
            <!-- 空状态提示 -->
            <view v-if="showFavoritesOnly && filteredPokemons.length === 0" class="flex flex-col items-center justify-center py-20 gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-20 h-20 text-gray-300">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <text class="text-lg font-semibold text-gray-400">还没有收藏任何宝可梦</text>
                <text class="text-sm text-gray-400">点击卡片右上角的星标即可收藏</text>
                <button class="mt-4 px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-semibold shadow-[0_4px_12px_rgba(255,165,0,0.3)] hover:shadow-[0_6px_16px_rgba(255,165,0,0.4)] transition-all active:scale-95" @click="toggleFavoritesView">
                    浏览全部宝可梦
                </button>
            </view>

            <view v-else class="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-2 max-w-[1400px] mx-auto">
                <PokemonCard 
                    v-for="pokemon in filteredPokemons" 
                    :key="pokemon.id" 
                    :pokemon="pokemon"
                    @click="navigateToDetail(pokemon.id)" 
                />
            </view>
            <view v-if="loadingMore" class="flex flex-col items-center justify-center py-8 gap-3 text-[#666] text-sm">
                <view class="w-8 h-8 border-[3px] border-[rgba(255,107,107,0.2)] border-t-[#FF6B6B] rounded-full animate-spin"></view>
                <text>加载中...</text>
            </view>
            <view v-if="!hasMore && filteredPokemons.length > 0" class="text-center py-8 text-[#999] text-sm">
                <text>已经到底了~</text>
            </view>
        </view>

        <!-- 底部 TabBar -->
        <TabBar v-model="currentTab" @change="onTabChange" />
    </view>
</template>

<script lang="ts" setup>
import FilterBar from "@/components/FilterBar.vue";
import NavBar from "@/components/NavBar.vue";
import PokemonCard from "@/components/pokemon/PokemonCard.vue";
import TabBar from "@/components/TabBar.vue";
import { usePokemonStore } from "@/store/pokemon";
import { debounce } from 'lodash-es';
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

const pokemonStore = usePokemonStore();
const { pokemonList, hasMore } = storeToRefs(pokemonStore);
const { fetchPokemon, loadMore } = pokemonStore;
const loadingMore = ref(false);
const searchQuery = ref("");
const loading = ref(true);
const transitioning = ref(false); // 控制页面切换动画

// 监听页面显示事件，添加淡入动画
onMounted(async () => {
    try {
        await fetchPokemon();
        // 页面加载完成后执行淡入动画
        setTimeout(() => {
            transitioning.value = false;
        }, 100);
    } catch (error) {
        console.error("加载宝可梦数据失败:", error);
    } finally {
        loading.value = false;
    }
});

// 显示详情
const showDetail = (pokemon: IPokemonBaseModel) => {
    // selectedPokemon.value = pokemon;
};

const navigateToDetail = (id: number) => {
    uni.navigateTo({
        url: `/pages/detail/detail?id=${id}`,
    });
};

// 新增响应式变量用于存储当前筛选和排序状态
const currentFilterTypes = ref<string[]>([]); // 选中的类型数组
const currentSort = ref<string>('id'); // 排序方式
const isShow = ref(false);
const currentTab = ref(0); // 当前选中的 tab 索引
const showFavoritesOnly = ref(false); // 是否只显示收藏

// 处理筛选变化
const onFilterChange = (filterData: { types: string[], sort: string }) => {
    currentFilterTypes.value = filterData.types;
    currentSort.value = filterData.sort;
};

// 切换收藏视图
const toggleFavoritesView = () => {
    showFavoritesOnly.value = !showFavoritesOnly.value;
    // 如果切换到收藏视图，关闭筛选栏
    if (showFavoritesOnly.value) {
        isShow.value = false;
    }
};

// 搜索处理
const onSearch = (query: string) => {
    searchQuery.value = query;
};

const filterToggle = (value: boolean) => {
    // 显示或隐藏筛选和排序
    // ...
    // vShow.value = value;
    console.log('filterToggle', value);
    isShow.value = value;
};

// Tab 切换处理
const onTabChange = (index: number) => {
    console.log('Tab changed to:', index);
    
    // 添加页面切换动画
    transitioning.value = true;
    
    // 延迟切换页面，确保动画完成
    setTimeout(() => {
        currentTab.value = index;
    }, 150);
};

// 更新计算属性 filteredPokemons 以应用筛选和排序
const onScroll = debounce((e: Event) => {
    const target = e.target as HTMLElement;
    const { scrollHeight, scrollTop, clientHeight } = target;
    const threshold = 100;

    if (scrollHeight - (scrollTop + clientHeight) < threshold &&
        hasMore.value &&
        !loadingMore.value &&
        !searchQuery.value) {
        loadingMore.value = true;
        loadMore().finally(() => {
            loadingMore.value = false;
        });
    }
}, 200);

const filteredPokemons = computed(() => {
    let list = [...pokemonList.value];

    // 应用收藏筛选
    if (showFavoritesOnly.value) {
        const favoriteIds = pokemonStore.favorites;
        list = list.filter((p) => favoriteIds.includes(p.id));
    }

    // 应用类型筛选
    if (currentFilterTypes.value.length > 0) {
        list = list.filter((p) => 
            currentFilterTypes.value.some(type => p.types.includes(type))
        );
    }

    // 应用排序
    if (currentSort.value === 'id') {
        list.sort((a, b) => a.id - b.id);
    } else if (currentSort.value === 'name') {
        list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort.value === 'hp') {
        list.sort((a, b) => {
            const hpA = a.stats?.find(s => s.name === 'HP')?.value || 0;
            const hpB = b.stats?.find(s => s.name === 'HP')?.value || 0;
            return hpB - hpA;
        });
    } else if (currentSort.value === 'attack') {
        list.sort((a, b) => {
            const atkA = a.stats?.find(s => s.name === '攻击')?.value || 0;
            const atkB = b.stats?.find(s => s.name === '攻击')?.value || 0;
            return atkB - atkA;
        });
    } else if (currentSort.value === 'defense') {
        list.sort((a, b) => {
            const defA = a.stats?.find(s => s.name === '防御')?.value || 0;
            const defB = b.stats?.find(s => s.name === '防御')?.value || 0;
            return defB - defA;
        });
    }

    // 应用搜索筛选
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        list = list.filter(
            (p) =>
                p.name.toLowerCase().includes(query) ||
                p.id.toString().includes(query) ||
                p.types.some((type) => type.toLowerCase().includes(query))
        );
    }

    return list;
});
</script>

<style lang="scss" scoped>
/* 所有样式已迁移至 Tailwind CSS */

.custom-scrollbar {
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        
        &:hover {
            background: rgba(0, 0, 0, 0.2);
        }
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 0.8s linear infinite;
}
</style>
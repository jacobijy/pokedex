<template>
    <view class="container">
        <!-- 导航栏 -->
        <NavBar />

        <!-- 筛选和排序 -->
        <FilterBar v-show="isShow" class="fixed-filter-bar" :types="types" @filterToggle="filterToggle" @sort="onSort" />

        <!-- 宝可梦列表 -->
        <view
            class="flex flex-col gap-2 px-4 py-4"
            @scroll="onScroll"
            :style="{ height: 'calc(100vh - 180px)', overflow: 'auto' }"
        >
            <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.id" :pokemon="pokemon"
                @click="navigateToDetail(pokemon.id)" />
            <view v-if="loadingMore" class="loading-more">
                加载中...
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import FilterBar from "@/components/FilterBar.vue";
import NavBar from "@/components/NavBar.vue";
import PokemonCard from "@/components/pokemon/PokemonCard.vue";
import { usePokemonStore } from "@/store/pokemon";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { debounce } from 'lodash-es';

const pokemonStore = usePokemonStore();
const { pokemonList, hasMore } = storeToRefs(pokemonStore);
const { fetchPokemon, loadMore } = pokemonStore;
const loadingMore = ref(false);
const searchQuery = ref("");
const loading = ref(true);

// 定义类型数组
const types = ref(['一般', '火', '水', '电', '草', '冰', '格斗', '毒', '地面', '飞行', '超能力', '虫', '岩石', '幽灵', '龙', '恶', '钢', '妖精']);

// 显示详情
const showDetail = (pokemon: IPokemonBaseModel) => {
    // selectedPokemon.value = pokemon;
};

const navigateToDetail = (id: number) => {
    uni.navigateTo({
        url: `/pages/detail/detail?id=${id}`,
    });
};

onMounted(async () => {
    try {
        await fetchPokemon();
    } catch (error) {
        console.error("加载宝可梦数据失败:", error);
    } finally {
        loading.value = false;
    }
});

// 新增响应式变量用于存储当前筛选和排序状态
const currentFilter = ref<string | null>(null);
const currentSort = ref<string>('default');
const isShow = ref(false);

// 实现 onFilter 方法
const onFilter = (filterType: string) => {
    currentFilter.value = filterType;
};

// 实现 onSort 方法
const onSort = (sortBy: string) => {
    currentSort.value = sortBy;
};

const filterToggle = (value: boolean) => {
    // 显示或隐藏筛选和排序
    // ...
    // vShow.value = value;
    console.log('filterToggle', value);
    isShow.value = value;
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

    // 应用筛选
    if (currentFilter.value) {
        list = list.filter((p) => p.types.includes(currentFilter.value!));
    }

    // 应用排序
    if (currentSort.value === 'id') {
        list.sort((a, b) => a.id - b.id);
    } else if (currentSort.value === 'name') {
        list.sort((a, b) => a.name.localeCompare(b.name));
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

<style lang="scss">
.container {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-top: 20px;
}

.fixed-filter-bar {
    position: fixed;
    top: 60px; /* 假设 NavBar 高度为 60px */
    left: 0;
    right: 0;
    z-index: 999;
    background-color: white; /* 防止内容穿透 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 可选：增加阴影效果 */
}

.loading-more {
    text-align: center;
    padding: 20px;
    color: #666;
}
</style>

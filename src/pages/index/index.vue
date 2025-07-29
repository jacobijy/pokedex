<template>
    <view class="container">
        <!-- 导航栏 -->
        <NavBar />

        <!-- 筛选和排序 -->
        <!-- <FilterBar :types="types" @filter="onFilter" @sort="onSort" /> -->

        <!-- 宝可梦列表 -->
        <view class="grid grid-cols-1 sm:grid-cols-1 md:grid_cols_1 lg:grid-cols-5 gap-4 px-4 py-6">
            <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.id" :pokemon="pokemon"
                @click="navigateToDetail(pokemon.id)" />
        </view>
    </view>
</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import PokemonCard from "@/components/pokemon/PokemonCard.vue";
import { usePokemonStore } from "@/store/pokemon";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

const pokemonStore = usePokemonStore();
const { pokemonList } = storeToRefs(pokemonStore);
const { fetchPokemon } = pokemonStore;
const searchQuery = ref("");
const loading = ref(true);

// 计算过滤后的宝可梦列表
const filteredPokemons = computed(() => {
    let list = [...pokemonList.value];
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

// export default {
//   components: {
//     NavBar,
//     FilterBar,
//     PokemonCard,
//     Pagination
//   },
//   data() {
//     return {
//       pokemons: [], // 从API获取的全部宝可梦数据
//       filteredPokemons: [], // 过滤后的宝可梦数据
//       currentPage: 1,
//       pageSize: 20,
//       types: ['一般', '火', '水', '电', '草', '冰', '格斗', '毒', '地面', '飞行', '超能力', '虫', '岩石', '幽灵', '龙', '恶', '钢', '妖精'],
//       selectedType: '',
//       sortBy: 'id'
//     }
//   },
//   computed: {
//     totalPages() {
//       return Math.ceil(this.pokemons.length / this.pageSize)
//     }
//   },
//   onLoad() {
//     this.fetchPokemons()
//   },
//   methods: {
//     async fetchPokemons() {
//       // 模拟API请求获取宝可梦数据
//       try {
//         const res = await uni.request({
//           url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
//           method: 'GET'
//         })

//         // 为简化示例，这里使用模拟数据
//         this.pokemons = [
//           // { id: 1, name: '妙蛙种子', types: [Types.Grass, Types.Poison], image: 'https://picsum.photos/seed/bulbasaur/200/200', hp: 45 },
//           // { id: 4, name: '小火龙', types: [Types.Fire], image: 'https://picsum.photos/seed/charmander/200/200', hp: 39 },

//         ]

//         this.filteredPokemons = [...this.pokemons]
//         this.applyFiltersAndSort()
//       } catch (error) {
//         console.error('获取宝可梦数据失败:', error)
//         uni.showToast({
//           title: '获取数据失败',
//           icon: 'none'
//         })
//       }
//     },
//     applyFiltersAndSort() {
//       // 应用筛选和排序
//       let filtered = [...this.pokemons]

//       // 类型筛选
//       if (this.selectedType) {
//         filtered = filtered.filter(pokemon =>
//           pokemon.types.includes(this.selectedType)
//         )
//       }

//       // 排序
//       filtered.sort((a, b) => {
//         if (this.sortBy === 'id') {
//           return a.id - b.id
//         } else if (this.sortBy === 'name') {
//           return a.name.localeCompare(b.name)
//         } else if (this.sortBy === 'hp') {
//           return b.stats.hp - a.stats.hp
//         }
//         return a.id - b.id
//       })

//       this.filteredPokemons = filtered
//     },
//     onFilter(type) {
//       this.selectedType = type
//       this.applyFiltersAndSort()
//     },
//     onSort(sortBy) {
//       this.sortBy = sortBy
//       this.applyFiltersAndSort()
//     },
//     changePage(page) {
//       this.currentPage = page
//     },
//     navigateToDetail(id) {
//       uni.navigateTo({
//         url: `/pages/detail/detail?id=${id}`
//       })
//     }
//   }
// }
</script>

<style lang="scss">
.container {
    min-height: 100vh;
    background-color: #f5f5f5;
}
</style>

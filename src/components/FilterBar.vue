<template>
  <view class="filter-bar bg-white rounded-lg shadow-md p-4 mb-6">
    <view class="flex flex-wrap gap-2 justify-between items-center">
      <!-- 类型筛选 -->
      <view class="flex flex-wrap gap-2 w-full md:w-auto">
        <text class="text-gray-700 font-medium">类型筛选:</text>
        <view class="flex flex-wrap gap-2">
          <button
            v-for="type in types"
            :key="type"
            :class="getTypeClass(type)"
            @click="toggleTypeFilter(type)"
          >
            {{ typeNames[type] || type }}
          </button>
          <view class="relative group">
            <button class="type-badge bg-gray-500">更多</button>
            <view
              class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden group-hover:block"
            >
              <view class="py-1">
                <button
                  v-for="type in moreTypes"
                  :key="type"
                  :class="getTypeClass(type)"
                  @click="toggleTypeFilter(type)"
                >
                  {{ typeNames[type] || type }}
                </button>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 排序选项 -->
      <view class="flex items-center gap-2 mt-3 md:mt-0">
        <text class="text-gray-700 font-medium">排序:</text>
        <picker :range="sortOptions" :range-key="'label'" @change="onSortChange">
          <view class="border border-gray-300 rounded-lg px-3 py-1 bg-white flex items-center gap-2">
            <text>{{ currentSort.label }}</text>
            <image src="/static/icons/arrow-down.png" mode="aspectFit" class="w-4 h-4"></image>
          </view>
        </picker>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 定义类型名称映射
const typeNames = {
  normal: '一般',
  fire: '火',
  water: '水',
  electric: '电',
  grass: '草',
  ice: '冰',
  fighting: '格斗',
  poison: '毒',
  ground: '地面',
  flying: '飞行',
  psychic: '超能力',
  bug: '虫',
  rock: '岩石',
  ghost: '幽灵',
  dragon: '龙',
  dark: '恶',
  steel: '钢',
  fairy: '妖精'
}

// 定义基础类型和扩展类型
const types = ref(['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison'])
const moreTypes = ref(['ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'])

// 定义选中的类型
const selectedTypes = ref([])

// 定义排序选项
const sortOptions = ref([
  { value: 'id', label: '编号' },
  { value: 'name', label: '名称' },
  { value: 'hp', label: 'HP' },
  { value: 'attack', label: '攻击力' },
  { value: 'defense', label: '防御力' }
])

// 当前排序项
const currentSort = ref({ value: 'id', label: '编号' })

// 计算按钮类名
const getTypeClass = (type) => {
  const isSelected = selectedTypes.value.includes(type)
  return `type-badge ${isSelected ? 'opacity-100' : 'opacity-70'} ${type}`
}

// 切换类型筛选
const toggleTypeFilter = (type) => {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter(t => t !== type)
  } else {
    selectedTypes.value.push(type)
  }
  emit('filterChange', {
    types: selectedTypes.value,
    sort: currentSort.value.value
  })
}

// 处理排序变化
const onSortChange = (e) => {
  currentSort.value = sortOptions.value[e.detail.value]
  emit('filterChange', {
    types: selectedTypes.value,
    sort: currentSort.value.value
  })
}

// 定义事件发射器
const emit = defineEmits(['filterChange'])
</script>

<style lang="scss" scoped>
.filter-bar {
  @apply bg-white rounded-lg shadow-md p-4 mb-6;
}

.type-badge {
  @apply px-2 py-1 rounded-full text-xs font-bold text-white cursor-pointer transition-opacity duration-200;
}

.normal {
  @apply bg-normal;
}

.fire {
  @apply bg-fire;
}

.water {
  @apply bg-water;
}

.electric {
  @apply bg-electric;
}

.grass {
  @apply bg-grass;
}

.ice {
  @apply bg-ice;
}

.fighting {
  @apply bg-fighting;
}

.poison {
  @apply bg-poison;
}

.ground {
  @apply bg-ground;
}

.flying {
  @apply bg-flying;
}

.psychic {
  @apply bg-psychic;
}

.bug {
  @apply bg-bug;
}

.rock {
  @apply bg-rock;
}

.ghost {
  @apply bg-ghost;
}

.dragon {
  @apply bg-dragon;
}

.dark {
  @apply bg-dark;
}

.steel {
  @apply bg-steel;
}

.fairy {
  @apply bg-fairy;
}
</style>
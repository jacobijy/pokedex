<template>
  <view class="bg-white rounded-lg shadow-md p-4 mb-6">
    <view class="flex flex-wrap gap-2 justify-between items-center">
      <view class="flex flex-wrap gap-2">
        <text class="text-gray-700 font-medium">类型筛选:</text>
        <view v-for="type in types" :key="type" class="relative">
          <button :class="`type-badge bg-${typeColors[type]}`" @click="toggleType(type)">{{type}}</button>
        </view>
        <view class="relative group">
          <button class="type-badge bg-gray-500">更多</button>
          <view class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden group-hover:block">
            <view class="py-1">
              <button v-for="moreType in moreTypes" :key="moreType" :class="`type-badge bg-${typeColors[moreType]} w-full text-left`" @click="toggleType(moreType)">{{moreType}}</button>
            </view>
          </view>
        </view>
      </view>
      <view class="flex items-center gap-2">
        <text class="text-gray-700 font-medium">排序:</text>
        <picker :range="sortOptions" @change="onSortChange">
          <button class="border border-gray-300 rounded-lg px-3 py-1 bg-white">{{currentSort}}</button>
        </picker>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectedTypes: [],
      currentSort: '编号',
      sortOptions: ['编号', '名称', 'HP', '攻击力', '防御力'],
      types: ['一般', '火', '水', '电', '草', '冰', '格斗', '毒'],
      moreTypes: ['地面', '飞行', '超能力', '虫', '岩石', '幽灵', '龙', '恶', '钢', '妖精'],
      typeColors: {
        normal: 'normal',
        fire: 'fire',
        water: 'water',
        electric: 'electric',
        grass: 'grass',
        ice: 'ice',
        fighting: 'fighting',
        poison: 'poison',
        ground: 'ground',
        flying: 'flying',
        psychic: 'psychic',
        bug: 'bug',
        rock: 'rock',
        ghost: 'ghost',
        dragon: 'dragon',
        dark: 'dark',
        steel: 'steel',
        fairy: 'fairy'
      }
    }
  },
  methods: {
    toggleType(type) {
      const index = this.selectedTypes.indexOf(type)
      if (index > -1) {
        this.selectedTypes.splice(index, 1)
      } else {
        this.selectedTypes.push(type)
      }
      this.$emit('filterChange', this.selectedTypes)
    },
    onSortChange(e) {
      this.currentSort = this.sortOptions[e.detail.value]
      this.$emit('sortChange', this.currentSort)
    }
  }
}
</script>

<style lang="scss" scoped>
.type-badge {
  @apply px-2 py-1 rounded-full text-xs font-bold text-white;
}
</style>    
<template>
  <view class="bg-white rounded-xl shadow-md p-6 mb-6">
    <view class="flex items-center justify-between mb-4">
      <text class="text-xl font-bold text-gray-800">基本信息</text>
      <view class="w-12 h-12 bg-gray-100 overflow-hidden">
        <image 
          :src="pokemon.image || '/static/images/placeholder.png'" 
          mode="aspectFit" 
          class="w-full h-full"
        ></image>
      </view>
    </view>
    
    <view class="grid grid-cols-2 gap-4 mt-4">
      <view class="flex items-center">
        <text class="text-gray-500 w-24">编号:</text>
        <text class="font-medium">#{{ pokemon.id.toString().padStart(3, '0') }}</text>
      </view>
      
      <view class="flex items-center">
        <text class="text-gray-500 w-24">分类:</text>
        <text class="font-medium">{{ pokemon.category || '-' }}</text>
      </view>
      
      <view class="flex items-center">
        <text class="text-gray-500 w-24">身高:</text>
        <text class="font-medium">{{ pokemon.height || 0 }}m</text>
      </view>
      
      <view class="flex items-center">
        <text class="text-gray-500 w-24">体重:</text>
        <text class="font-medium">{{ pokemon.weight || 0 }}kg</text>
      </view>
      
      <view class="flex items-center">
        <text class="text-gray-500 w-24">特性:</text>
        <text class="font-medium">{{ pokemon.ability || '-' }}</text>
      </view>
      
      <view class="flex items-center">
        <text class="text-gray-500 w-24">类型:</text>
        <view class="flex gap-2">
          <text 
            v-for="type in pokemon.types" 
            :key="type" 
            :class="getTypeBadgeClass(type)"
          >
            {{ getTypeName(type) }}
          </text>
        </view>
      </view>
      
      <view class="flex items-center">
        <text class="text-gray-500 w-24">属性相克:</text>
        <view class="flex flex-wrap gap-1">
          <text 
            v-for="(value, type) in pokemon.typeRelations" 
            :key="type" 
            :class="['px-1.5 py-0.5 rounded text-xs font-medium', getRelationTypeClass(value, type)]"
          >
            {{ getTypeName(type) }}{{ getRelationValueText(value) }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Pokemon {
  id: number | string;
  image?: string;
  category?: string;
  height?: number;
  weight?: number;
  ability?: string;
  types: string[];
  typeRelations?: Record<string, number>;
}

defineProps<{
  pokemon: Pokemon;
}>();

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
};

const typeColors = {
  normal: 'bg-normal',
  fire: 'bg-fire',
  water: 'bg-water',
  electric: 'bg-electric',
  grass: 'bg-grass',
  ice: 'bg-ice',
  fighting: 'bg-fighting',
  poison: 'bg-poison',
  ground: 'bg-ground',
  flying: 'bg-flying',
  psychic: 'bg-psychic',
  bug: 'bg-bug',
  rock: 'bg-rock',
  ghost: 'bg-ghost',
  dragon: 'bg-dragon',
  dark: 'bg-dark',
  steel: 'bg-steel',
  fairy: 'bg-fairy'
};

const getTypeName = (type: string): string => {
  return typeNames[type as keyof typeof typeNames] || type;
};

const getTypeColorClass = (type: string): string => {
  return typeColors[type as keyof typeof typeColors] || 'bg-gray-500';
};

const getTypeBadgeClass = (type: string): string => {
  return `type-badge ${getTypeColorClass(type)}`;
};

const getRelationTypeClass = (value: number, type: string): string => {
  if (value > 1) {
    return 'bg-red-500 text-white';
  } else if (value < 1) {
    return 'bg-green-500 text-white';
  } else {
    return 'bg-gray-500 text-white';
  }
};

const getRelationValueText = (value: number): string => {
  if (value > 1) {
    return '2x';
  } else if (value < 1) {
    return '0.5x';
  } else {
    return '1x';
  }
};
</script>

<style scoped>
.type-badge {
  @apply px-2 py-1 rounded-full text-xs font-bold text-white;
}
</style>
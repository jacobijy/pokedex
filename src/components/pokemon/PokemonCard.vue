<template>
    <view
        class="pokemon-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
        @click="onClick">
        <view class="flex flex-col md:flex-row">
            <!-- 左侧图片区域 -->
            <view class="w-full md:w-1/3 relative bg-gray-50 p-4">
                <view class="absolute top-4 right-4 bg-white/80 text-gray-800 text-xs font-bold px-2 py-1 rounded">
                    #{{ pokemon.id.toString().padStart(3, '0') }}
                </view>
                <image :src="pokemon.image || '/static/images/placeholder.png'" mode="aspectFit"
                    class="w-full h-64 object-contain"></image>
            </view>

            <!-- 右侧信息区域 -->
            <view class="w-full md:w-2/3 p-5">
                <view class="flex justify-between items-start mb-3">
                    <h3 class="text-2xl font-bold text-gray-800">{{ pokemon.name }}</h3>
                    <button class="p-2 text-gray-400 hover:text-red-500">
                        <i class="fa fa-heart-o"></i>
                    </button>
                </view>

                <view class="flex gap-2 mb-4">
                    <text v-for="type in pokemon.types" :key="type" :class="getTypeBadgeClass(type)"
                        :style="{ 'background-color': `${getTypeColor(type)}` }">{{ getTypeName(type) }}</text>
                </view>

                <view class="grid grid-cols-2 gap-3 mb-4">
                    <view class="flex items-center">
                        <text class="text-gray-500 w-20">身高:</text>
                        <text class="font-medium">{{ pokemon.height || 0 }}m</text>
                    </view>
                    <view class="flex items-center">
                        <text class="text-gray-500 w-20">体重:</text>
                        <text class="font-medium">{{ pokemon.weight || 0 }}kg</text>
                    </view>
                    <view class="flex items-center">
                        <text class="text-gray-500 w-20">特性:</text>
                        <text class="font-medium">{{ pokemon.ability || '-' }}</text>
                    </view>
                    <view class="flex items-center">
                        <text class="text-gray-500 w-20">分类:</text>
                        <text class="font-medium">{{ pokemon.category || '-' }}</text>
                    </view>
                </view>

                <!-- 简单能力条 -->
                <view class="mb-4">
                    <text class="text-gray-700 font-medium">基础能力:</text>
                    <view class="grid grid-cols-2 gap-2 mt-2">
                        <view v-for="(stat, index) in pokemon.stats" :key="stat.name">
                            <view class="flex justify-between text-xs mb-1">
                                <text>{{ getStatName(stat.name) }}</text>
                                <text class="font-medium">{{ stat.value }}</text>
                            </view>
                            <view class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <view :class="getStatColor(stat)"
                                    :style="{ width: `${Math.min(stat.value, 150) / 150 * 100}%` }" class="h-full"></view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { typeColors } from '@/utils/helpers';

let pokemon: IPokemonModal

const getStatColor = (stat) => {
    const colors = {
        hp: 'bg-red-500',
        attack: 'bg-orange-500',
        defense: 'bg-yellow-500',
        specialAttack: 'bg-blue-500',
        specialDefense: 'bg-indigo-500',
        speed: 'bg-purple-500'
    }
    return colors[stat] || 'bg-gray-500'
}

const onClick = () => {
    // $emit('click')
    uni.$emit('click');
}

const typeNames: { [key: string]: string } = {
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

const getTypeBadgeClass = () => {
    return `type-badge`;
}
const getTypeColor = (type: number) => {
    return typeColors[type];
}
const getTypeName = (type: string) => {
    return typeNames[type] || type
}

const statNames: { [key: string]: string } = {
    hp: 'HP',
    attack: '攻击',
    defense: '防御',
    specialAttack: '特攻',
    specialDefense: '特防',
    speed: '速度'
}

const getStatName = (stat: string) => {
            return statNames[stat] || stat
        }

const goToDetail = ()=> {
            uni.$emit('detail', pokemon.id)
        }
</script>

<style lang="scss" scoped>
.pokemon-card {
    @apply w-full mb-4;

    .type-badge {
        @apply px-3 py-1 rounded-full text-xs font-bold text-white inline-block;
    }

    h3 {
        font-size: 1.5rem; // 增大宝可梦名称字体大小
    }

    .text-gray-500,
    .font-medium {
        font-size: 1.5rem; // 增大属性信息字体大小
    }

    .text-gray-700.font-medium {
        font-size: 1rem; // 增大基础能力标题字体大小
    }

    .text-xs {
        font-size: 0.75rem; // 增大能力条标签字体大小
    }
}
</style>
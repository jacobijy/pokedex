<template>
    <view>
        <view class="card" @click="onClick">
            <!-- 头像区域 -->
            <view class="avatar-container">
                <image :src="'/static/default.png'" class="avatar" />
            </view>

            <!-- 图标和文本区域 -->
            <view class="info-container">
                <view class="icon-and-text">
                    <!-- 图标 -->
                    <image src="/static/images/star.png" class="favorite-icon" v-if="isFavorite"
                        @click.stop="toggleFavorite" />
                    <image src="/static/images/unstar.png" class="favorite-icon" v-else @click.stop="toggleFavorite" />

                    <!-- 编号和名称区域 - 修改为水平排列 -->
                    <view class="id-name-container">
                        <text class="id">No.{{ props.pokemon.id }}</text>
                        <text class="name">{{ props.pokemon.name }}</text>
                    </view>
                </view>

                <!-- 类型区域 -->
                <view class="types">
                    <view v-for="(type, index) in props.pokemon.types"
                    :key="index"
                    class="type"
                    :class="`bg-${type}`"
                        :style="{
                            color: getTextColorForBackground(`var(--${type})`)
                        }">
                        {{ getTypeName(type) }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { usePokemonStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

interface Props {
    pokemon: IPokemonCardModel;
    key: number;
}

const props = defineProps<Props>();
const pokemonStore = usePokemonStore();
const { favorites } = storeToRefs(pokemonStore);

// 检查是否收藏
const isFavorite = computed(() => {
    return favorites.value.includes(props.pokemon.id);
});

// 方法
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
};

const getTypeName = (type: string) => {
    return typeNames[type] || type;
};

// 计算文本颜色以适应背景色
const getTextColorForBackground = (bgColor: string): string => {
    // 提取颜色值并转换为RGB
    const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    const match = bgColor.match(regex);

    if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);

        // 使用相对亮度公式计算亮度
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // 如果背景较暗则返回白色，否则返回黑色
        return brightness > 128 ? '#000000' : '#FFFFFF';
    }

    // 默认返回白色
    return '#FFFFFF';
};

const onClick = () => {
    uni.navigateTo({
        url: `/pages/detail/detail?id=${props.pokemon.id}`
    });
};

const toggleFavorite = () => {
    pokemonStore.toggleFavorite(props.pokemon.id);
};
</script>

<style lang="scss" scoped>
.container {
    padding: 0 20rpx;
}

.card {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    padding: 20rpx;
    margin-bottom: 20rpx;
    position: relative;

    &:active {
        transform: scale(0.98);
        transition: transform 0.2s ease;
    }
}

.avatar-container {
    margin-right: 20rpx;
}

.avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
}

.info-container {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icon-and-text {
    display: flex;
    align-items: center;
    flex: 1; /* 占据剩余空间 */
}

.favorite-icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
}

.id-name-container {
    display: flex;
    flex-direction: column; /* 垂直排列编号和名称 */
    justify-content: center; /* 垂直居中 */
}

.id {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 5rpx;
}

.name {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
}

.types {
    display: flex;
    gap: 10rpx;
}

.type {
    padding: 8rpx 16rpx;
    border-radius: 16rpx;
    font-size: 24rpx;
    font-weight: bold;
    min-width: 60rpx; /* 确保最小宽度以适应文字 */
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

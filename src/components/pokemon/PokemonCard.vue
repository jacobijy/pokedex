<template>
  <view
    class="pokemon-card"
    :class="`bg-${typeColors[type1]} border border-${typeColors[type1]}/30`"
    @click="goToDetail"
  >
    <view class="relative">
      <view
        class="absolute top-2 right-2"
        :class="`bg-${typeColors[type1]} text-white text-xs font-bold px-2 py-1 rounded`"
      >
        #{{ id.toString().padStart(3, "0") }}
      </view>
      <image
        :src="imageUrl"
        mode="aspectFit"
        class="w-full h-30 object-contain"
        :style="`background-color: rgba(${hexToRgb(typeColors[type1])}, 0.05)`"
      ></image>
    </view>
    <view class="p-4">
      <text class="text-lg font-bold text-gray-800">{{ name }}</text>
      <view class="flex gap-2 mt-1">
        <text :class="`type-badge bg-${typeColors[type1]}`">{{ type1 }}</text>
        <text v-if="type2" :class="`type-badge bg-${typeColors[type2]}`">{{
          type2
        }}</text>
      </view>
      <view class="mt-3">
        <view class="flex justify-between text-sm">
          <text>HP</text>
          <text>{{ stats.hp }}</text>
        </view>
        <view class="w-full bg-gray-200 rounded-full h-2 mt-1">
          <view
            class="stat-bar bg-green-500"
            :style="`width: ${stats.hp}%`"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type1: {
      type: String,
      required: true,
    },
    type2: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    stats: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      typeColors: {
        normal: "normal",
        fire: "fire",
        water: "water",
        electric: "electric",
        grass: "grass",
        ice: "ice",
        fighting: "fighting",
        poison: "poison",
        ground: "ground",
        flying: "flying",
        psychic: "psychic",
        bug: "bug",
        rock: "rock",
        ghost: "ghost",
        dragon: "dragon",
        dark: "dark",
        steel: "steel",
        fairy: "fairy",
      },
    };
  },
  methods: {
    goToDetail() {
      uni.navigateTo({
        url: `/pages/detail/detail?id=${this.id}`,
      });
    },
    hexToRgb(hex) {
      // 这里简化处理，实际项目中需要根据typeColors映射到具体的RGB值
      return "0, 0, 0";
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-card {
  @apply rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer;
}

.type-badge {
  @apply px-2 py-1 rounded-full text-xs font-bold text-white;
}

.stat-bar {
  @apply h-2 rounded-full transition-all duration-700 ease-out;
}
</style>

<template>
  <view class="pokemon-card" @click="$emit('select', pokemon)">
    <view class="favorite-icon" @click.stop="toggleFavorite">
      <uni-icons 
        type="star-filled" 
        size="20" 
        :color="isFavorite ? '#ffde00' : '#ddd'" 
      />
    </view>
    <view class="pokemon-id">#{{ pokemon.formattedId }}</view>
    <view class="pokemon-image">
      <image :src="pokemon.image" mode="aspectFit" />
    </view>
    <view class="pokemon-info">
      <text class="pokemon-name">{{ pokemon.name }}</text>
      <view class="pokemon-types">
        <TypeBadge 
          v-for="type in pokemon.types" 
          :key="type" 
          :type="type" 
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import TypeBadge from '@/components/TypeBadge.vue';
import { usePokemonStore } from '@/store/pokemon';
import { computed } from 'vue';

const props = defineProps({
  pokemon: Object
});

const pokemonStore = usePokemonStore();
const { toggleFavorite, isFavorite } = pokemonStore;

const isFav = computed(() => isFavorite(props.pokemon.id));
</script>

<style scoped>
.pokemon-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: relative;
}

.pokemon-card:active {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.pokemon-id {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 20px;
}

.pokemon-image {
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #f5f5f5, #e0e0e0);
}

.pokemon-image image {
  max-width: 80%;
  max-height: 100px;
  transition: transform 0.3s;
}

.pokemon-info {
  padding: 12px 10px;
  text-align: center;
}

.pokemon-name {
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}

.pokemon-types {
  display: flex;
  justify-content: center;
  gap: 5px;
}
</style>
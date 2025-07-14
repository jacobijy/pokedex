<template>
  <view class="detail-modal">
    <view class="modal-content">
      <view class="detail-header">
        <button class="back-button" @click="$emit('close')">
          <uni-icons type="arrowleft" size="16" color="white" />
          <text>返回</text>
        </button>
        <view class="favorite-icon" @click="toggleFavorite">
          <uni-icons 
            type="star-filled" 
            size="24" 
            :color="isFavorite ? '#ffde00' : '#ddd'" 
          />
        </view>
      </view>
      
      <view class="detail-image">
        <image :src="pokemon.image" mode="aspectFit" />
      </view>
      
      <view class="detail-id">#{{ pokemon.formattedId }}</view>
      <view class="detail-name">{{ pokemon.name }}</view>
      
      <view class="detail-types">
        <TypeBadge 
          v-for="type in pokemon.types" 
          :key="type" 
          :type="type" 
        />
      </view>
      
      <view class="detail-abilities">
        <view 
          class="ability-badge" 
          v-for="ability in pokemon.abilities" 
          :key="ability"
        >
          {{ ability }}
        </view>
      </view>
      
      <view class="detail-stats">
        <text class="stats-title">能力值</text>
        <StatBar 
          v-for="stat in pokemon.stats" 
          :key="stat.name" 
          :stat="stat" 
        />
      </view>
      
      <view class="detail-description">
        <text>{{ pokemon.description }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import StatBar from '@/components/StatBar.vue';
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
.detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.back-button {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.detail-image {
  background: linear-gradient(to bottom, #f5f5f5, #e0e0e0);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 15px;
  text-align: center;
}

.detail-image image {
  max-width: 200px;
  max-height: 200px;
}

.detail-id {
  font-size: 18px;
  color: #777;
  text-align: center;
  margin-bottom: 5px;
}

.detail-name {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

.detail-types {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.detail-abilities {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.ability-badge {
  padding: 5px 15px;
  background: #4a90e2;
  color: white;
  border-radius: 20px;
  font-size: 14px;
}

.detail-stats {
  width: 100%;
  background: #f9f9f9;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
}

.stats-title {
  display: block;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
  color: #555;
}

.detail-description {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 15px;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}
</style>
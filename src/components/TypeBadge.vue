<template>
  <view class="type-badge" :style="{ backgroundColor: typeColor }">
    {{ type }}
  </view>
</template>

<script setup>
import { computed } from 'vue';
import { typeColors } from '@/utils/helpers';

const props = defineProps({
  type: String
});

const typeColor = computed(() => {
  return typeColors[props.type.toLowerCase()] || '#A8A878';
});
</script>

<style scoped>
.type-badge {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
</style>
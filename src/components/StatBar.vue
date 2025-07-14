<template>
  <view class="stat-row">
    <text class="stat-name">{{ stat.name }}</text>
    <view class="stat-bar-container">
      <view 
        class="stat-bar" 
        :style="{ width: (stat.value / 255 * 100) + '%', background: barColor }"
      ></view>
    </view>
    <text class="stat-value">{{ stat.value }}</text>
  </view>
</template>

<script setup>
import { statColor } from '@/utils/helpers';
import { computed } from 'vue';

const props = defineProps({
  stat: Object
});

const barColor = computed(() => statColor(props.stat.value));
</script>

<style scoped>
.stat-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.stat-name {
  width: 80px;
  font-weight: 500;
  color: #555;
  font-size: 14px;
}

.stat-bar-container {
  flex: 1;
  background: #e0e0e0;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 10px;
}

.stat-bar {
  height: 100%;
  border-radius: 4px;
}

.stat-value {
  width: 35px;
  text-align: right;
  font-weight: bold;
  font-size: 14px;
}
</style>
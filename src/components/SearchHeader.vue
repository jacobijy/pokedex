<template>
  <view class="pokedex-header">
    <view class="header-content">
      <view class="logo">
        <image src="/static/logo.png" class="logo-icon" />
        <text class="title">宝可梦图鉴</text>
      </view>
      <view class="search-box">
        <uni-icons type="search" size="18" color="#e53935" />
        <input 
          type="text" 
          :value="modelValue" 
          @input="$emit('update:modelValue', $event.target.value)" 
          placeholder="搜索宝可梦..."
        />
      </view>
      <view class="favorites-button" @click="$emit('favorites')">
        <uni-icons type="star-filled" size="24" color="#ffde00" />
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue', 'favorites']);
</script>

<style scoped>
.pokedex-header {
  background: linear-gradient(to right, #e53935, #e35d5b);
  color: white;
  padding: 15px 20px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.search-box {
  flex: 1;
  background: white;
  border-radius: 30px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.search-box input {
  border: none;
  outline: none;
  flex: 1;
  padding: 0 5px;
  font-size: 14px;
}

.favorites-button {
  padding: 8px;
}
</style>
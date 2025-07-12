<template>
  {{ no }}
  {{ name }}
</template>

<script lang="ts" setup>
import { ref } from "vue";

const no = ref(0);
const name = ref("test");
</script>

<style>
.common-layout {
  height: 200px;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>

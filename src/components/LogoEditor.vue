<template>
  <div class="logo-container">
    <img src="../assets/copilot.svg" alt="Copilot logo" class="logo" ref="logoRef">
    <div class="logo-text" v-if="showText" ref="textRef">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  showText: boolean
}>()
</script>

<style scoped>
.logo-container {
  position: relative;
  margin-bottom: 80px;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.logo {
  width: 100px;
  height: 100px;
  display: block;
}

.logo-text {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #000;
  color: #fff;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: "Microsoft YaHei", sans-serif;
  font-size: 10px;
  font-weight: bold;
  white-space: nowrap;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 20px;
  min-height: 14px;
  line-height: 1 !important;
  box-sizing: border-box;
  transform: translate(0, 0);
  margin: 0;
}
</style> 
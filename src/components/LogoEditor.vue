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
  align-items: center;
  justify-content: center;
}

.logo {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
}

.logo-text {
  position: absolute;
  bottom: 5%;
  right: 5%;
  transform: translate(0, 0);
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
  z-index: 1;
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 10px;
    padding: 2px 3px;
    min-height: 12px;
  }
}
</style> 
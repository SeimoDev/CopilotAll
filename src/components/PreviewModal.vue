<template>
  <div class="modal" v-if="show" @click.self="onClose">
    <div class="modal-content">
      <img :src="imageUrl" alt="Generated logo" class="generated-image">
      <div class="resolution-selector">
        <span>分辨率：</span>
        <select v-model="scale" @change="onScaleChange">
          <option :value="1">1x (100px)</option>
          <option :value="2">2x (200px)</option>
          <option :value="4">4x (400px)</option>
          <option :value="8">8x (800px)</option>
        </select>
      </div>
      <div class="modal-buttons">
        <button class="download-btn" @click="onDownload">下载图片</button>
        <button class="close-btn" @click="onClose">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  show: boolean
  imageUrl: string
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'scale-change', value: number): void
  (e: 'download'): void
}>()

const scale = ref(2)

const onClose = () => {
  emit('update:show', false)
}

const onScaleChange = () => {
  emit('scale-change', scale.value)
}

const onDownload = () => {
  emit('download')
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

@media (prefers-color-scheme: dark) {
  .modal-content {
    background-color: #1a1a1a;
    color: #fff;
  }

  .resolution-selector {
    color: #fff;
  }

  .resolution-selector select {
    background-color: #2a2a2a;
    color: #fff;
    border-color: #444;
  }

  .resolution-selector select:focus {
    border-color: #42b883;
  }

  .close-btn {
    background-color: #444;
  }

  .close-btn:hover {
    background-color: #555;
  }
}

.generated-image {
  max-width: 300px;
  max-height: 300px;
  object-fit: contain;
}

.modal-buttons {
  display: flex;
  gap: 10px;
}

.download-btn, .close-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.download-btn {
  background-color: #42b883;
  color: white;
}

.download-btn:hover {
  background-color: #3aa876;
}

.close-btn {
  background-color: #666;
  color: white;
}

.close-btn:hover {
  background-color: #555;
}

.resolution-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.resolution-selector select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.resolution-selector select:focus {
  outline: none;
  border-color: #42b883;
}
</style> 
<template>
  <div class="container">
    <a href="https://github.com/seimo-official/copilot-all" target="_blank" class="github-link">
      <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="github-icon">
        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
      </svg>
    </a>
    <LogoEditor
      :text="currentText"
      :show-text="showText"
      ref="logoEditorRef"
    />
    <div class="input-group">
      <input 
        type="text" 
        class="input-box" 
        placeholder="请输入内容..."
        v-model="inputText"
        @input="handleInput"
        :maxlength="14"
      >
      <button class="generate-btn" @click="handleGenerate">生成</button>
    </div>
    
    <PreviewModal
      v-model:show="showModal"
      :image-url="generatedImageUrl"
      @scale-change="handleScaleChange"
      @download="handleDownload"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import html2canvas from 'html2canvas'
import LogoEditor from './components/LogoEditor.vue'
import PreviewModal from './components/PreviewModal.vue'
import { getTextLength, truncateText } from './utils/textUtils'

const inputText = ref('')
const showText = ref(true)
const currentText = ref('COPILOT ALL')
const showModal = ref(false)
const generatedImageUrl = ref('')
const logoEditorRef = ref<InstanceType<typeof LogoEditor> | null>(null)
const selectedScale = ref(2)

const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  const text = input.value
  
  if (getTextLength(text) > 16) {
    inputText.value = truncateText(text, 16)
  }
}

const generateImage = async (scale: number) => {
  if (logoEditorRef.value?.$el) {
    await new Promise(resolve => requestAnimationFrame(resolve))
    
    const canvas = await html2canvas(logoEditorRef.value.$el, {
      backgroundColor: null,
      scale,
      logging: true,
      useCORS: true,
      allowTaint: true,
      onclone: (clonedDoc) => {
        const clonedText = clonedDoc.querySelector('.logo-text') as HTMLElement
        if (clonedText) {
          clonedText.style.display = 'flex'
          clonedText.style.alignItems = 'center'
          clonedText.style.justifyContent = 'center'
          clonedText.style.lineHeight = '1'
        }
      }
    })
    generatedImageUrl.value = canvas.toDataURL('image/png')
  }
}

const handleGenerate = async () => {
  currentText.value = inputText.value || 'COPILOT ALL'
  showText.value = true
  await nextTick()
  await generateImage(selectedScale.value)
  showModal.value = true
}

const handleScaleChange = async (scale: number) => {
  selectedScale.value = scale
  await generateImage(scale)
}

const handleDownload = () => {
  const link = document.createElement('a')
  const resolution = selectedScale.value * 100
  link.download = `copilot-logo-${resolution}px.png`
  link.href = generatedImageUrl.value
  link.click()
}

onMounted(async () => {
  await nextTick()
  await generateImage(selectedScale.value)
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 80px;
  justify-content: flex-start;
  box-sizing: border-box;
}

.logo-container {
  position: relative;
  margin-bottom: 80px;
  width: 100px;
  height: 100px;
}

.logo {
  width: 100px;
  height: 100px;
}

.logo-text {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #000;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Microsoft YaHei", sans-serif;
  font-size: 10px;
  font-weight: bold;
  white-space: nowrap;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 20px;
  min-height: 16px;
  line-height: 1 !important;
  box-sizing: border-box;
}

.input-group {
  display: flex;
  gap: 10px;
}

.input-box {
  width: 300px;
  padding: 8px 12px;
  border: 2px solid #42b883;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: box-shadow 0.3s ease;
}

.input-box:focus {
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
}

.generate-btn {
  padding: 8px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.generate-btn:hover {
  background-color: #3aa876;
}

.github-link {
  position: fixed;
  top: 20px;
  right: 20px;
  transition: opacity 0.3s ease;
}

.github-link:hover {
  opacity: 0.7;
}

.github-icon {
  fill: #24292f;
}
</style>

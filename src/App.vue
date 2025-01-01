<template>
  <div class="container">
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
</style>

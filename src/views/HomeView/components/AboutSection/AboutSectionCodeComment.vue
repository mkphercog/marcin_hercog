<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { BaseText } from '@/components/ui'
import { useWebContentStore } from '@/store'

import styles from './AboutSection.module.scss'

const webContentStore = useWebContentStore()
const { webContent } = storeToRefs(webContentStore)

const fullText = webContent.value.staticHomeView.codeComment
const displayedText = ref('')
const typingSpeed = 150
const initialDelay = 1500

onMounted(() => {
  let index = 0

  function type() {
    if (index < fullText.length) {
      displayedText.value += fullText.charAt(index)
      index++
      setTimeout(type, typingSpeed)
    }
  }

  setTimeout(() => {
    type()
  }, initialDelay)
})
</script>

<template>
  <div :class="styles.codeCommentContainer">
    <BaseText :class="[styles.codeComment, styles.stringColor]">
      {{ displayedText }}<span :class="styles.cursor">|</span>
    </BaseText>
  </div>
</template>

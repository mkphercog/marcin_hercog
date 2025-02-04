<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { BaseText } from '@/components/ui'
import { useWebContentStore } from '@/store'

import styles from './AboutSection.module.scss'

const webContentStore = useWebContentStore()
const { webContent } = storeToRefs(webContentStore)

const companyName = new URLSearchParams(window.location.search).get('hello')?.replace(/\+/, ' ')
const fullText =
  companyName == null
    ? webContent.value.staticHomeView.codeComment
    : `// Hello ${companyName}, it’s great to have you here! I’m Marcin.`
const displayedText = ref('')
const typingSpeed = 100
const initialDelay = 500

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

<script setup lang="ts">
import { BaseText } from '@/components/ui'
import AboutSectionCodeItem from './AboutSectionCodeItem.vue'
import AboutSectionCodeComment from './AboutSectionCodeComment.vue'
import { storeToRefs } from 'pinia'
import { useWebContentStore } from '@/store'

import styles from './AboutSection.module.scss'

const webContentStore = useWebContentStore()
const { webContent } = storeToRefs(webContentStore)

const codeObjectContent = webContent.value.staticHomeView.codeObjectContent
</script>

<template>
  <div :class="styles.codeWrapper">
    <AboutSectionCodeComment />
    <BaseText :class="styles.brackets">{</BaseText>

    <div :class="styles.contentWrapper">
      <AboutSectionCodeItem
        v-for="item in codeObjectContent"
        :key="item.keyName"
        :key-name="item.keyName"
        :values="item.values"
      />
    </div>

    <BaseText :class="styles.brackets">}</BaseText>
  </div>
</template>

<script setup lang="ts">
import { BaseText } from '@/components/ui'
import AboutSectionCodeItem, { type CodeItemProps } from './AboutSectionCodeItem.vue'
import AboutSectionCodeComment from './AboutSectionCodeComment.vue'

import styles from './AboutSection.module.scss'

const objectData: CodeItemProps[] = [
  {
    objKey: 'commercialExperience: ',
    objValues: ['since 2022']
  },
  {
    objKey: 'codingLangs: ',
    objValues: ['JavaScript', 'TypeScript']
  },
  {
    objKey: 'mainLibrary: ',
    objValues: ['React']
  },
  {
    objKey: 'other: ',
    objValues: ['Next.js', 'Vue.js']
  }
]
</script>

<template>
  <div :class="styles.codeWrapper">
    <AboutSectionCodeComment />
    <BaseText :class="styles.brackets">{</BaseText>

    <div :class="styles.contentWrapper">
      <AboutSectionCodeItem
        v-for="item in objectData"
        :key="item.objKey"
        :obj-key="item.objKey"
        :obj-values="item.objValues"
      />
    </div>

    <BaseText :class="styles.brackets">}</BaseText>
  </div>
</template>

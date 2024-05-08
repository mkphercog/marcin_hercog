<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText } from '@/components/ui'
import { useTranslationsStore } from '@/stores'

import styles from './About.module.scss'

const { aboutContent } = storeToRefs(useTranslationsStore())
</script>

<template>
  <section :class="styles.wrapper">
    <BaseText justify>
      {{ aboutContent.description }}
    </BaseText>
    <div :class="styles.photoWrapper">
      <img :src="aboutContent.photoUrl" alt="Marcin Hercog" />
    </div>
  </section>
</template>

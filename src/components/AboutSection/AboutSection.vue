<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText } from '@/components/ui'
import { useTranslationsStore } from '@/store'

import styles from './About.module.scss'

const { translations, profilePhotoUrl } = storeToRefs(useTranslationsStore())
</script>

<template>
  <section :class="styles.wrapper">
    <BaseText justify>
      {{ translations.about.description }}
    </BaseText>
    <div :class="styles.photoWrapper">
      <BaseLoader :active="!profilePhotoUrl" loader="dots" :is-full-page="false" />
      <img v-if="profilePhotoUrl" :src="profilePhotoUrl" alt="Marcin Hercog photo" />
    </div>
  </section>
</template>

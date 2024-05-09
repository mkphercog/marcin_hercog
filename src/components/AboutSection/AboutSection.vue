<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText } from '@/components/ui'
import { useTranslationsStore } from '@/store'

import styles from './About.module.scss'

const { translations } = storeToRefs(useTranslationsStore())
</script>

<template>
  <section :class="styles.wrapper">
    <BaseText justify>
      {{ translations?.about.description }}
    </BaseText>
    <div v-if="translations?.about.photoUrl" :class="styles.photoWrapper">
      <img :src="translations?.about.photoUrl" alt="Marcin Hercog" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText } from '@/components/ui'
import { useWebContentStore } from '@/store'
import AboutSectionCode from './AboutSectionCode.vue'

import styles from './AboutSection.module.scss'

const { webContent, profilePhotoUrl } = storeToRefs(useWebContentStore())
</script>

<template>
  <section :class="styles.wrapper">
    <div :class="styles.photoWrapper">
      <BaseLoader :active="!profilePhotoUrl" loader="dots" :is-full-page="false" />
      <img v-if="profilePhotoUrl" :src="profilePhotoUrl" alt="Marcin Hercog photo" />
    </div>

    <AboutSectionCode />

    <BaseText :class="styles.about" justify>
      {{ webContent.editable.aboutSectionDescription }}
    </BaseText>
  </section>
</template>

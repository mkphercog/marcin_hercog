<script setup lang="ts">
import { AboutSection, CodingSection, ExperienceSection, SocialsSection } from './components'
import { BaseDivider } from '@/components/ui'

import styles from './HomeView.module.scss'
</script>

<template>
  <div :class="styles.wrapper">
    <AboutSection />
    <BaseDivider />
    <CodingSection />
    <ExperienceSection />
    <SocialsSection />
  </div>
</template>

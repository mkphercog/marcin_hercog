<script setup lang="ts">
import {
  AboutSection,
  CodingSection,
  ExperienceSection,
  ProjectsSection,
  SocialsSection
} from './components'
import { BaseDivider } from '@/components/ui'

import styles from './HomeView.module.scss'
</script>

<template>
  <div :class="styles.wrapper">
    <AboutSection />
    <BaseDivider />
    <CodingSection />
    <ExperienceSection />
    <ProjectsSection />
    <SocialsSection />
  </div>
</template>

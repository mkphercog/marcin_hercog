<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseSection, BaseIcon } from '@/components/ui'
import { SOCIALS } from '@/constants'
import { useTranslationsStore } from '@/store'

import styles from './SocialsSection.module.scss'

const { translations } = storeToRefs(useTranslationsStore())
</script>

<template>
  <BaseSection :title="translations.socials.header" hideDivider>
    <ul :class="styles.linksWrapper">
      <BaseIcon
        v-for="{ id, icon, name, link } in SOCIALS"
        :key="id"
        :src="icon"
        :alt="name"
        :link="link"
      />
    </ul>
  </BaseSection>
</template>

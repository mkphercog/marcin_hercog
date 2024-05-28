<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseSection, BaseIcon } from '@/components/ui'
import { SOCIALS } from '@/constants'
import { useWebContentStore } from '@/store'

import styles from './SocialsSection.module.scss'

const { webContent } = storeToRefs(useWebContentStore())
</script>

<template>
  <BaseSection :title="webContent.socials.header" hide-divider>
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

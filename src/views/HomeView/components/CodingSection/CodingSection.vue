<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseSection, BaseText, BaseIcon } from '@/components/ui'
import CodingSectionList from './CodingSectionList.vue'
import { CODING_ICONS } from '@/constants'
import { useWebContentStore } from '@/store'

import styles from './CodingSection.module.scss'

const { webContent } = storeToRefs(useWebContentStore())
</script>

<template>
  <BaseSection :title="webContent.programmingSkills.header">
    <CodingSectionList />
    <div :class="styles.additionalInfoWrapper">
      <BaseText size="lg" :class="styles.additionalInfoHeader">
        {{ webContent.programmingSkills.additionalHeader }}
      </BaseText>
      <BaseText justify>
        {{ webContent.programmingSkills.additionalDescription }}
      </BaseText>
    </div>

    <ul :class="styles.iconsSection">
      <BaseIcon v-for="{ id, icon, name } in CODING_ICONS" :key="id" :src="icon" :alt="name" />
    </ul>
  </BaseSection>
</template>

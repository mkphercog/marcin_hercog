<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseSection, BaseText, BaseIcon } from '@/components/ui'
import ProgrammingList from './ProgrammingList.vue'
import { PROGRAMMING_ICONS } from '@/constants'
import { useWebContentStore } from '@/store'

import styles from './Programming.module.scss'

const { webContent } = storeToRefs(useWebContentStore())
</script>

<template>
  <BaseSection :title="webContent.programmingSkills.header">
    <ProgrammingList />
    <div :class="styles.additionalInfoWrapper">
      <BaseText size="lg" :class="styles.additionalInfoHeader"
        >{{ webContent.programmingSkills.additionalHeader }}
      </BaseText>
      <BaseText justify>
        {{ webContent.programmingSkills.additionalDescription }}
      </BaseText>
    </div>
    <ul :class="styles.iconsSection">
      <BaseIcon v-for="{ id, icon, name } in PROGRAMMING_ICONS" :key="id" :src="icon" :alt="name" />
    </ul>
  </BaseSection>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CodingSectionChart from './CodingSectionChart.vue'
import { BaseSection, BaseText, BaseIcon } from '@/components/ui'
import { CODING_ICONS } from '@/constants'
import { useWebContentStore } from '@/store'

import styles from './CodingSection.module.scss'

const { webContent } = storeToRefs(useWebContentStore())
</script>

<template>
  <BaseSection :title="webContent.staticHomeView.codingTitle">
    <CodingSectionChart />

    <div :class="styles.additionalInfoWrapper">
      <BaseText size="lg" :class="styles.additionalInfoHeader">
        {{ webContent.staticHomeView.codingSubTitle }}
      </BaseText>
      <BaseText justify>
        {{ webContent.editable.codingSectionDescription }}
      </BaseText>
    </div>

    <ul :class="styles.iconsSection">
      <BaseIcon v-for="{ id, icon, name } in CODING_ICONS" :key="id" :src="icon" :alt="name" />
    </ul>
  </BaseSection>
</template>

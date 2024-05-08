<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseSection, BaseText, BaseIcon } from '@/components/ui'
import ProgrammingList from './ProgrammingList.vue'
import { PROGRAMMING_ICONS } from '@/constants'
import { useTranslationsStore } from '@/stores'

import styles from './Programming.module.scss'

const { programmingContent } = storeToRefs(useTranslationsStore())
</script>

<template>
  <BaseSection :title="programmingContent.header">
    <ProgrammingList />
    <div>
      <BaseText as="header">{{ programmingContent.additionalHeader }} </BaseText>
      <BaseText justify>
        {{ programmingContent.additionalDescription }}
      </BaseText>
    </div>
    <ul :class="styles.iconsSection">
      <BaseIcon v-for="{ id, icon, name } in PROGRAMMING_ICONS" :key="id" :src="icon" :alt="name" />
    </ul>
  </BaseSection>
</template>

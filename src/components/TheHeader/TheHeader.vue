<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText, BaseButton } from '@/components/ui'
import { useTranslationsStore } from '@/stores'

import styles from './TheHeader.module.scss'

const store = useTranslationsStore()
const { headerContent } = storeToRefs(store)
const { changeLang } = store
</script>

<template>
  <header :class="styles.header">
    <div :class="styles.wrapper">
      <nav :class="styles.nav">
        <BaseButton type="small">{{ headerContent.editBtn }}</BaseButton>
        <BaseButton @click="changeLang">{{ headerContent.langBtn }}</BaseButton>
      </nav>

      <div :class="styles.fullNameWrapper">
        <BaseText as="mainHeader" variant="secondary">{{ headerContent.fullName }}</BaseText>
        <BaseText variant="secondary">{{ headerContent.jobPosition }}</BaseText>
      </div>
    </div>
  </header>
</template>

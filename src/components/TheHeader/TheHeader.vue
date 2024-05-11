<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText, BaseButton } from '@/components/ui'
import { useTranslationsStore } from '@/store'

import styles from './TheHeader.module.scss'

const store = useTranslationsStore()
const { translations } = storeToRefs(store)
const { toggleLang } = store
</script>

<template>
  <header :class="styles.header">
    <div :class="styles.wrapper">
      <nav :class="styles.nav">
        <!-- TODO add edit site content  -->
        <BaseButton v-if="false" type="small">{{ translations?.header.editBtn }}</BaseButton>
        <BaseButton @click="toggleLang" type="normal">{{
          translations?.header.langBtn
        }}</BaseButton>
      </nav>

      <div :class="styles.fullNameWrapper">
        <BaseText as="mainHeader" variant="secondary">{{ translations?.header.fullName }}</BaseText>
        <BaseText variant="secondary">{{ translations?.header.jobPosition }}</BaseText>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseIcon, BaseText } from '@/components/ui'
import PhoneIcon from '@/assets/icons/PhoneIcon.svg'
import MainIcon from '@/assets/icons/MailIcon.svg'
import { useTranslationsStore } from '@/stores'

import styles from './TheFooter.module.scss'

const { footerContent } = storeToRefs(useTranslationsStore())
</script>

<template>
  <footer :class="styles.footer">
    <BaseText variant="secondary">{{ footerContent.header }}</BaseText>
    <div :class="styles.contactWrapper">
      <div :class="styles.infoWrapper">
        <BaseIcon :class="styles.icon" :src="PhoneIcon" alt="Phone icon"></BaseIcon>
        <BaseText variant="secondary">{{ footerContent.phoneNumber }}</BaseText>
      </div>
      <div :class="styles.infoWrapper">
        <BaseIcon :class="styles.icon" :src="MainIcon" alt="Mail icon"></BaseIcon>
        <BaseText variant="secondary">{{ footerContent.email }}</BaseText>
      </div>
    </div>
    <div :class="styles.visitedHint">
      <BaseText variant="secondary" as="smallText">{{ footerContent.visitors }} {{ 1 }}</BaseText>
    </div>
  </footer>
</template>

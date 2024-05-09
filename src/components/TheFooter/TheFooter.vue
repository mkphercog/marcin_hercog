<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseIcon, BaseText } from '@/components/ui'
import PhoneIcon from '@/assets/icons/PhoneIcon.svg'
import MainIcon from '@/assets/icons/MailIcon.svg'
import { useTranslationsStore } from '@/store'

import styles from './TheFooter.module.scss'

const { translations } = storeToRefs(useTranslationsStore())

const initializePhoneCall = () => {
  window.open(`tel:${translations.value?.footer.phoneNumber}`)
}

function initializeEmail() {
  var email = translations.value?.footer.email
  var title = translations.value?.emailTemplate.title || ''
  var message = translations.value?.emailTemplate.message || ''

  window.location.href = `mailto:${email}?subject=${title}&body=${message}`
}
</script>

<template>
  <footer :class="styles.footer">
    <BaseText variant="secondary">{{ translations?.footer.header }}</BaseText>
    <div :class="styles.contactWrapper">
      <div :class="styles.infoWrapper" @click="initializePhoneCall">
        <BaseIcon :class="styles.icon" :src="PhoneIcon" alt="Phone icon"></BaseIcon>
        <BaseText variant="secondary">{{ translations?.footer.phoneNumber }}</BaseText>
      </div>
      <div :class="styles.infoWrapper" @click="initializeEmail">
        <BaseIcon :class="styles.icon" :src="MainIcon" alt="Mail icon"></BaseIcon>
        <BaseText variant="secondary">{{ translations?.footer.email }}</BaseText>
      </div>
    </div>
    <div :class="styles.visitedHint">
      <!-- TODO add visitors counter -->
      <BaseText v-if="false" variant="secondary" as="smallText"
        >{{ translations?.footer.visitors }} {{ 1 }}</BaseText
      >
    </div>
  </footer>
</template>

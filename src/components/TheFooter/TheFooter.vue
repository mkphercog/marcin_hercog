<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText } from '@/components/ui'
import PhoneIcon from '@/assets/icons/PhoneIcon.vue'
import MailIcon from '@/assets/icons/MailIcon.vue'
import { useWebContentStore } from '@/store'

import styles from './TheFooter.module.scss'

const { webContent } = storeToRefs(useWebContentStore())

const initializePhoneCall = () => {
  window.open(`tel:${webContent.value.footer.phoneNumber}`)
}

function initializeEmail() {
  const email = webContent.value.footer.email
  const title = webContent.value.emailTemplate.title || ''
  const message = webContent.value.emailTemplate.message || ''

  window.location.href = `mailto:${email}?subject=${title}&body=${message}`
}
</script>

<template>
  <footer :class="styles.footer">
    <BaseText variant="secondary">{{ webContent.footer.header }}</BaseText>
    <div :class="styles.contactWrapper">
      <div :class="styles.infoWrapper" @click="initializePhoneCall">
        <PhoneIcon :class="styles.icon" />
        <BaseText variant="secondary">{{ webContent.footer.phoneNumber }}</BaseText>
      </div>
      <div :class="styles.infoWrapper" @click="initializeEmail">
        <MailIcon :class="styles.icon" />
        <BaseText variant="secondary">{{ webContent.footer.email }}</BaseText>
      </div>
    </div>
    <div :class="styles.visitedHint">
      <!-- TODO add visitors counter -->
      <BaseText v-if="false" variant="secondary" size="sm"
        >{{ webContent.footer.visitors }} {{ 1 }}</BaseText
      >
    </div>
  </footer>
</template>

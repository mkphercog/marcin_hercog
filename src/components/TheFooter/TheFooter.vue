<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText } from '@/components/ui'
import PhoneIcon from '@/assets/icons/PhoneIcon.vue'
import MailIcon from '@/assets/icons/MailIcon.vue'
import { useWebContentStore } from '@/store'

import styles from './TheFooter.module.scss'

const { webContent } = storeToRefs(useWebContentStore())

const initializePhoneCall = () => {
  window.open(`tel:${webContent.value.staticHomeView.contactPhoneNumber}`)
}

function initializeEmail() {
  const email = webContent.value.staticHomeView.contactEmail
  const title = webContent.value.staticEmailTemplate.title || ''
  const message = webContent.value.staticEmailTemplate.message || ''

  window.location.href = `mailto:${email}?subject=${title}&body=${message}`
}
</script>

<template>
  <footer :class="styles.footer">
    <div :class="styles.contactWrapper">
      <div :class="styles.infoWrapper" @click="initializePhoneCall">
        <PhoneIcon :class="styles.icon" />
        <BaseText variant="secondary">
          {{ webContent.staticHomeView.contactPhoneNumber }}
        </BaseText>
      </div>
      <div :class="styles.infoWrapper" @click="initializeEmail">
        <MailIcon :class="styles.icon" />
        <BaseText variant="secondary">
          {{ webContent.staticHomeView.contactEmail }}
        </BaseText>
      </div>
    </div>
  </footer>
</template>

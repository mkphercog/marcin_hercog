<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStateStore, useWebContentStore } from '@/store'
import { BaseButton } from '@/components/ui'

import styles from './EditViewActions.module.scss'

type Props = {
  isFormValid: boolean
}

defineProps<Props>()

const appStateStore = useAppStateStore()
const webContentStore = useWebContentStore()
const { webContent } = storeToRefs(webContentStore)
</script>

<template>
  <div :class="styles.actionsWrapper">
    <BaseButton
      variant="secondary"
      :class="styles.submitBtn"
      :rest-props="{ disabled: !isFormValid }"
    >
      {{ webContent.staticEditMode.submitBtn }}
    </BaseButton>

    <BaseButton
      v-if="appStateStore.hasLocalChanges"
      @click="webContentStore.restoreWebContent"
      type="button"
      variant="secondary"
    >
      {{ webContent.staticEditMode.restoreBtn }}
    </BaseButton>

    <!-- TODO PUBLISH DATA VIA ADMIN -->
    <BaseButton v-if="false" type="button" variant="secondary" :rest-props="{ disabled: true }">
      {{ webContent.staticEditMode.publishBtn }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import isEqual from 'lodash.isequal'
import { useAppStateStore, useWebContentStore } from '@/store'
import { BaseButton } from '@/components/ui'

import styles from './EditViewActions.module.scss'
import type { EditableType } from '@/types'

type Props = {
  isFormValid: boolean
}

defineProps<Props>()

const appStateStore = useAppStateStore()
const webContentStore = useWebContentStore()
const { webContent, originalWebContent } = storeToRefs(webContentStore)

const updateWebContentAsAdmin = () => {
  const currentEditedFields = Object.entries(webContent.value.editable).filter(([key, value]) => {
    const originalValue = originalWebContent.value.editable[key as keyof EditableType]

    return !isEqual(value, originalValue)
  })

  if (currentEditedFields.length) {
    webContentStore.updateWebContent(Object.fromEntries(currentEditedFields))
  }
}
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
      :class="styles.restoreBtn"
      @click="webContentStore.restoreWebContent"
      type="button"
      variant="secondary"
    >
      {{ webContent.staticEditMode.restoreBtn }}
    </BaseButton>

    <BaseButton
      v-if="appStateStore.isLoggedUser"
      :class="styles.publishBtn"
      @click="updateWebContentAsAdmin"
      type="button"
      variant="green"
      :rest-props="{ disabled: !appStateStore.hasLocalChanges }"
    >
      {{ webContent.staticEditMode.publishBtn }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { BaseCard, BaseSection, BaseTextarea } from '@/components/ui'
import type { InputValuesType } from '../../types/EditView.types'
import { useWebContentStore } from '@/store'
import { ABOUT_DESC_MAX_LENGTH } from '@/constants'

import sharedStyles from '../EditSharedStyles.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  aboutDescription: InputValuesType
}

const props = defineProps<Props>()
const aboutDesc = reactive(props.aboutDescription)
</script>

<template>
  <BaseSection :title="webContentStore.webContent.staticEditMode.aboutTitle" header-position="left">
    <BaseCard :class="sharedStyles.editCardItem">
      <BaseTextarea
        name="aboutDesc"
        label="about.description"
        :has-changes="aboutDesc.hasChanges && !aboutDesc.error"
        :error-message="aboutDesc.error"
        v-model="aboutDesc.value"
        :max-length="ABOUT_DESC_MAX_LENGTH"
      />
    </BaseCard>
  </BaseSection>
</template>

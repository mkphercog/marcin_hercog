<script setup lang="ts">
import { computed } from 'vue'
import { useWebContentStore } from '@/store'
import { BaseButton, BaseCard, BaseInput } from '@/components/ui'
import type { ProjectInputType } from '@/views/EditView/types/EditView.types'
import { PROJECT_ITEM_MAX_LENGTH } from '@/constants'
import { PROJECT_FIELDS_NAMES } from './EditProjects.constants'

import sharedStyles from '../EditSharedStyles.module.scss'
import styles from './EditProjectsSection.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  project: ProjectInputType
}

const props = defineProps<Props>()
defineEmits(['deleteSkill'])

const projectDetails = computed(() => props.project)
</script>

<template>
  <li :class="sharedStyles.listItem">
    <BaseCard :class="styles.skillCard">
      <BaseInput
        v-for="fieldName in PROJECT_FIELDS_NAMES"
        :key="fieldName"
        :name="`${fieldName}-${projectDetails.id}`"
        :label="fieldName"
        :is-valid="projectDetails[fieldName].isValid && !projectDetails[fieldName].error"
        :error-message="projectDetails[fieldName].error"
        v-model="projectDetails[fieldName].value"
        :max-length="PROJECT_ITEM_MAX_LENGTH"
        :class="styles[fieldName]"
      />

      <BaseButton
        @click="$emit('deleteSkill', projectDetails.id)"
        size="sm"
        variant="destructive"
        :rest-props="{
          type: 'button'
        }"
        :class="styles.deleteBtn"
      >
        {{ webContentStore.webContent.staticEditMode.deleteItemBtn }}
      </BaseButton>
    </BaseCard>
  </li>
</template>

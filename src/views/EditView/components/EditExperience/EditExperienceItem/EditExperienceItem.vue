<script setup lang="ts">
import { computed } from 'vue'
import { BaseButton, BaseCard, BaseTextarea } from '@/components/ui'
import type { InputValuesType } from '../../../types/EditView.types.ts'
import { useWebContentStore } from '@/store'

import styles from './EditExperienceItem.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  experienceListItem: InputValuesType
}

const props = defineProps<Props>()
defineEmits(['deleteListItem'])

const listItem = computed(() => props.experienceListItem)
</script>

<template>
  <li :class="styles.listItem">
    <BaseCard :class="styles.experienceCard">
      <BaseTextarea
        :name="`item-${listItem.id}`"
        label="experienceList.item"
        :has-changes="listItem.hasChanges && !listItem.error"
        :error-message="listItem.error"
        v-model="listItem.value"
      />

      <BaseButton
        @click="$emit('deleteListItem', listItem.id)"
        :size="'sm'"
        :variant="'secondary'"
        :rest-props="{
          type: 'button'
        }"
      >
        {{ webContentStore.webContent.editMode.deleteItemBtn }}
      </BaseButton>
    </BaseCard>
  </li>
</template>

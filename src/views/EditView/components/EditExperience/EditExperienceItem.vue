<script setup lang="ts">
import { computed } from 'vue'
import { BaseButton, BaseCard, BaseTextarea } from '@/components/ui'
import { useWebContentStore } from '@/store'
import type { InputValuesType } from '../../types/EditView.types.ts'
import { EXP_ITEM_MAX_LENGTH } from '@/constants/editMode.js'

import sharedStyles from '../EditSharedStyles.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  experienceListItem: InputValuesType
}

const props = defineProps<Props>()
defineEmits(['deleteListItem'])

const listItem = computed(() => props.experienceListItem)
</script>

<template>
  <li :class="sharedStyles.listItem">
    <BaseCard :class="sharedStyles.editCardItem">
      <BaseTextarea
        :name="`item-${listItem.id}`"
        label="experienceList.item"
        :has-changes="listItem.hasChanges && !listItem.error"
        :error-message="listItem.error"
        v-model="listItem.value"
        :max-length="EXP_ITEM_MAX_LENGTH"
      />

      <BaseButton
        @click="$emit('deleteListItem', listItem.id)"
        size="sm"
        variant="destructive"
        :rest-props="{
          type: 'button'
        }"
      >
        {{ webContentStore.webContent.staticEditMode.deleteItemBtn }}
      </BaseButton>
    </BaseCard>
  </li>
</template>

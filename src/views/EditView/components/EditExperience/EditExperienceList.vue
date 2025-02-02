<script setup lang="ts">
import { computed, ref } from 'vue'
import { BaseButton } from '@/components/ui'
import EditExperienceItem from './EditExperienceItem.vue'
import type { InputValuesType } from '@/views/EditView/types/EditView.types'
import { useWebContentStore } from '@/store'

import sharedStyles from '../EditSharedStyles.module.scss'

type Props = {
  listItems: InputValuesType[]
}

defineProps<Props>()

const webContentStore = useWebContentStore()

const showListItems = ref(false)
const buttonText = computed(() =>
  showListItems.value
    ? webContentStore.webContent.staticEditMode.hideListBtn
    : webContentStore.webContent.staticEditMode.showListBtn
)

const toggleListVisibility = () => {
  showListItems.value = !showListItems.value
}
</script>

<template>
  <BaseButton
    @click="toggleListVisibility"
    variant="secondary"
    size="sm"
    :rest-props="{
      type: 'button'
    }"
  >
    {{ buttonText }}
  </BaseButton>

  <ul :class="sharedStyles.listContainter" v-show="showListItems">
    <EditExperienceItem
      v-for="item in listItems"
      :key="item.id"
      :experience-list-item="item"
      @delete-list-item="webContentStore.deleteExperienceListItem(item?.id)"
    />
  </ul>
</template>

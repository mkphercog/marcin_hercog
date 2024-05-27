<script setup lang="ts">
import { computed, ref } from 'vue'
import { BaseButton } from '@/components/ui'
import EditExperienceItem from '../EditExperienceItem/EditExperienceItem.vue'
import { useWebContentStore } from '@/store'

import styles from './EditExperienceList.module.scss'
import type { InputValuesType } from '@/views/EditView/types/EditView.types'

type Props = {
  listItems: InputValuesType[]
}

defineProps<Props>()

const webContentStore = useWebContentStore()

const showListItems = ref(true)
const buttonText = computed(() =>
  showListItems.value ? 'Hide experience list' : 'Show experience list'
)
</script>

<template>
  <BaseButton
    @click="() => (showListItems = !showListItems)"
    variant="secondary"
    size="sm"
    :rest-props="{
      type: 'button'
    }"
  >
    {{ buttonText }}
  </BaseButton>
  <ul :class="styles.containter" v-show="showListItems">
    <EditExperienceItem
      v-for="item in listItems"
      :key="item.id"
      :experience-list-item="item"
      @delete-list-item="webContentStore.deleteExperienceListItem(item?.id)"
    />
  </ul>
</template>

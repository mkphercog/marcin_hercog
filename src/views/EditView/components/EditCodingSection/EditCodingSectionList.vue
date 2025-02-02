<script setup lang="ts">
import { computed, ref } from 'vue'
import { BaseButton } from '@/components/ui'
import EditCodingSectionItem from './EditCodingSectionItem.vue'
import type { CodingSkillInputType } from '@/views/EditView/types/EditView.types'
import { useWebContentStore } from '@/store'

import sharedStyles from '../EditSharedStyles.module.scss'

type Props = {
  codingSkills: CodingSkillInputType[]
}

defineProps<Props>()

const webContentStore = useWebContentStore()

const showSkills = ref(false)
const buttonText = computed(() =>
  showSkills.value
    ? webContentStore.webContent.staticEditMode.hideListBtn
    : webContentStore.webContent.staticEditMode.showListBtn
)

const toggleListVisibility = () => {
  showSkills.value = !showSkills.value
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

  <ul :class="sharedStyles.listContainter" v-show="showSkills">
    <EditCodingSectionItem
      v-for="skill in codingSkills"
      :key="skill.id"
      :coding-skill="skill"
      @delete-skill="webContentStore.deleteCodingSkill(skill.id)"
    />
  </ul>
</template>

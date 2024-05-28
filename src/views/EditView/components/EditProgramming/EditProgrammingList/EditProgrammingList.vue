<script setup lang="ts">
import { computed, ref } from 'vue'
import { BaseButton } from '@/components/ui'
import EditProgrammingItem from '../EditProgrammingItem/EditProgrammingItem.vue'
import type { ProgrammingSkillInputType } from '@/views/EditView/types/EditView.types'
import { useWebContentStore } from '@/store'

import styles from './EditProgrammingList.module.scss'

type Props = {
  programmingSkills: ProgrammingSkillInputType[]
}

defineProps<Props>()

const webContentStore = useWebContentStore()

const showSkills = ref(true)
const buttonText = computed(() =>
  showSkills.value
    ? webContentStore.webContent.editMode.hideListBtn
    : webContentStore.webContent.editMode.showListBtn
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

  <ul :class="styles.containter" v-show="showSkills">
    <EditProgrammingItem
      v-for="skill in programmingSkills"
      :key="skill.id"
      :programming-skill="skill"
      @delete-skill="webContentStore.deleteProgrammingSkill(skill.id)"
    />
  </ul>
</template>

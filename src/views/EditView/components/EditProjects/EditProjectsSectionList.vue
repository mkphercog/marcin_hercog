<script setup lang="ts">
import { computed, ref } from 'vue'
import { BaseButton } from '@/components/ui'
import EditProjectSectionItem from './EditProjectsSectionItem.vue'
import type { ProjectInputType } from '@/views/EditView/types/EditView.types'
import { useWebContentStore } from '@/store'

import sharedStyles from '../EditSharedStyles.module.scss'

type Props = {
  projects: ProjectInputType[]
}

defineProps<Props>()

const webContentStore = useWebContentStore()

const showProjects = ref(false)
const buttonText = computed(() =>
  showProjects.value
    ? webContentStore.webContent.staticEditMode.hideListBtn
    : webContentStore.webContent.staticEditMode.showListBtn
)

const toggleListVisibility = () => {
  showProjects.value = !showProjects.value
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

  <ul :class="sharedStyles.listContainter" v-show="showProjects">
    <EditProjectSectionItem
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @delete-skill="webContentStore.deleteProject(project.id)"
    />
  </ul>
</template>

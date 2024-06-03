<script setup lang="ts">
import { computed } from 'vue'
import { useWebContentStore } from '@/store'
import { BaseButton, BaseCard, BaseInput } from '@/components/ui'
import type { CodingSkillInputType } from '../../types/EditView.types.ts'

import styles from './EditCodingSection.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  codingSkill: CodingSkillInputType
}

const props = defineProps<Props>()
defineEmits(['deleteSkill'])

const skill = computed(() => props.codingSkill)
</script>

<template>
  <li :class="styles.listItem">
    <BaseCard :class="styles.skillCard">
      <BaseInput
        :name="`label-${skill.id}`"
        label="Label"
        :has-changes="skill.label.hasChanges && !skill.label.error"
        :error-message="skill.label.error"
        v-model="skill.label.value"
      />
      <BaseInput
        :name="`scaleValue-${skill.id}`"
        label="ScaleValue"
        :has-changes="skill.scaleValue.hasChanges && !skill.scaleValue.error"
        :error-message="skill.scaleValue.error"
        v-model="skill.scaleValue.value"
        :rest-props="{
          type: 'number'
        }"
      />

      <BaseButton
        @click="$emit('deleteSkill', skill.id)"
        :size="'sm'"
        :variant="'secondary'"
        :rest-props="{
          type: 'button'
        }"
      >
        {{ webContentStore.webContent.staticEditMode.deleteItemBtn }}
      </BaseButton>
    </BaseCard>
  </li>
</template>

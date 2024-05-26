<script setup lang="ts">
import { computed } from 'vue'
import { BaseButton, BaseCard, BaseInput } from '@/components/ui'
import type { ProgrammingSkillInputType } from '../../../types/EditView.types.ts'

import styles from './EditProgrammingItem.module.scss'

type Props = {
  programmingSkill: ProgrammingSkillInputType
}

const props = defineProps<Props>()
defineEmits(['deleteSkill'])

const skill = computed(() => props.programmingSkill)
</script>

<template>
  <li :class="styles.listItem">
    <BaseCard :class="styles.skillCard">
      <BaseInput
        name="label"
        label="Label"
        :has-changes="skill.label.hasChanges && !skill.label.error"
        :error-message="skill.label.error"
        v-model="skill.label.value"
      />
      <BaseInput
        name="label"
        label="ScaleValue"
        :has-changes="skill.scaleValue.hasChanges && !skill.scaleValue.error"
        :error-message="skill.scaleValue.error"
        v-model="skill.scaleValue.value"
        :rest-props="{
          type: 'number'
        }"
      />

      <BaseButton @click="$emit('deleteSkill', skill.id)" :size="'sm'" :variant="'secondary'">
        Delete
      </BaseButton>
    </BaseCard>
  </li>
</template>

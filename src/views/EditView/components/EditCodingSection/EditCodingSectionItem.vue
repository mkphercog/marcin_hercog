<script setup lang="ts">
import { computed } from 'vue'
import { useWebContentStore } from '@/store'
import { BaseButton, BaseCard, BaseInput } from '@/components/ui'
import type { CodingSkillInputType } from '../../types/EditView.types.ts'
import { CODING_LABEL_MAX_LENGTH } from '@/constants'

import sharedStyles from '../EditSharedStyles.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  codingSkill: CodingSkillInputType
}

const props = defineProps<Props>()
defineEmits(['deleteSkill'])

const skill = computed(() => props.codingSkill)
</script>

<template>
  <li :class="sharedStyles.listItem">
    <BaseCard :class="sharedStyles.editCardItem">
      <BaseInput
        :name="`label-${skill.id}`"
        label="Label"
        :has-changes="skill.label.hasChanges && !skill.label.error"
        :error-message="skill.label.error"
        v-model="skill.label.value"
        :max-length="CODING_LABEL_MAX_LENGTH"
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

<script setup lang="ts">
import { BaseText } from '@/components/ui'
import styles from './AboutSection.module.scss'

export type CodeItemProps = {
  objKey: string
  objValues: string[]
}

const props = defineProps<CodeItemProps>()
const isMultiple = props.objValues.length > 1
const isCommaInArray = (index: number) => isMultiple && index < props.objValues.length - 1
</script>

<template>
  <BaseText>
    <span :class="styles.objectKey">{{ props.objKey }}</span>
    <span v-if="isMultiple" :class="styles.brackets">[ </span>
    <span v-for="(value, index) in props.objValues" :key="value" :class="styles.stringColor">
      {{ `"${value}"` }}<span v-if="isCommaInArray(index)">, </span>
    </span>
    <span v-if="!isMultiple">,</span>
    <span v-if="isMultiple" :class="styles.brackets"> ]</span>
    <span v-if="isMultiple">,</span>
  </BaseText>
</template>

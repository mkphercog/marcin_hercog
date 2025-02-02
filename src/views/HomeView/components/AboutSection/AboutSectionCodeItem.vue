<script setup lang="ts">
import { BaseText } from '@/components/ui'
import type { CodeObjectContentItem } from '@/types'

import styles from './AboutSection.module.scss'

export type CodeItemProps = CodeObjectContentItem

const props = defineProps<CodeItemProps>()
const isMultiple = props.values.length > 1
const isCommaInArray = (index: number) => isMultiple && index < props.values.length - 1
</script>

<template>
  <BaseText>
    <span :class="styles.objectKey">{{ keyName }}</span>
    <span v-if="isMultiple" :class="styles.brackets">[ </span>
    <span v-for="(value, index) in values" :key="value" :class="styles.stringColor">
      {{ `"${value}"` }}<span v-if="isCommaInArray(index)">, </span>
    </span>
    <span v-if="!isMultiple">,</span>
    <span v-if="isMultiple" :class="styles.brackets"> ]</span>
    <span v-if="isMultiple">,</span>
  </BaseText>
</template>

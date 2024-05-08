<script setup lang="ts">
import { computed } from 'vue'
import BaseText from '../BaseText/BaseText.vue'

import styles from './BaseButton.module.scss'

type Props = {
  type?: 'normal' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'normal'
})

const asSmall = computed(() => (props.type === 'small' ? 'smallText' : 'text'))
</script>

<template>
  <button :class="styles.button">
    <BaseText :as="asSmall" variant="secondary">
      <slot></slot>
    </BaseText>
  </button>
</template>

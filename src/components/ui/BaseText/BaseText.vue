<script setup lang="ts">
import { computed } from 'vue'
import type { BaseTextProps, BaseTextVatiantType } from './BaseText.types'

const props = withDefaults(defineProps<BaseTextProps>(), {
  as: 'text',
  variant: 'primary'
})

const COLORS_MAP: Record<BaseTextVatiantType, string> = {
  primary: 'primary',
  secondary: 'secondary'
}

const isMainHeader = computed(() => props.as === 'mainHeader')
const isHeader = computed(() => props.as === 'header')
const isText = computed(() => props.as === 'text' || props.as === 'smallText')
const isSmallText = computed(() => props.as === 'smallText')
const isLink = computed(() => props.as === 'link')

const colorVariantClass = COLORS_MAP[props.variant]
</script>

<template>
  <h1 v-if="isMainHeader" :class="colorVariantClass">
    <slot></slot>
  </h1>
  <h3 v-else-if="isHeader" :class="colorVariantClass"><slot></slot></h3>
  <p v-else-if="isText" :class="[{ smallText: isSmallText, justify }, colorVariantClass]">
    <slot></slot>
  </p>
  <a v-else-if="isLink" :href="link" :class="colorVariantClass"><slot></slot></a>
</template>

<style lang="scss" scoped>
.primary {
  color: $primary-text-color;
}

.secondary {
  color: $secondary-text-color;
}

h1 {
  font-size: 35px;

  @include for-tablet-lg-up {
    font-size: 50px;
  }

  @include for-desktop-up {
    font-size: 70px;
  }
}

h3 {
  font-size: 24px;

  @include for-tablet-lg-up {
    font-size: 30px;
  }
}

p {
  font-size: 18px;

  @include for-tablet-lg-up {
    font-size: 24px;
  }
}

.smallText {
  font-size: 12px;

  @include for-tablet-lg-up {
    font-size: 16px;
  }
}

.justify {
  text-align: justify;
}
</style>

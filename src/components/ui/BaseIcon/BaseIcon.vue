<script setup lang="ts">
import styles from './BaseIcon.module.scss'

type Props = {
  src: string
  alt: string
  link?: string
}

const props = defineProps<Props>()

const openUrl = () => {
  if (!props.link) return

  window.open(props.link, '_blank')
}
</script>

<template>
  <div @click="openUrl" :class="[styles.wrapper, { [styles.clickable]: link }]">
    <img :src="src" alt="" />
  </div>
</template>

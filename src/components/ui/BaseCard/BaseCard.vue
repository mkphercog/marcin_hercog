<script setup lang="ts">
import styles from './BaseCard.module.scss'
</script>

<template>
  <section :class="styles.card">
    <slot></slot>
  </section>
</template>

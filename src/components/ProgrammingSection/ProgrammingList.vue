<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ProgrammingItem from './ProgrammingItem.vue'
import { useTranslationsStore } from '@/store'

const { translations } = storeToRefs(useTranslationsStore())
</script>

<template>
  <ul>
    <ProgrammingItem
      v-for="{ id, label, scaleValue } in translations?.programmingSkills.skillsList"
      :key="id"
      :label="label"
      :scaleValue="scaleValue"
    />
  </ul>
</template>

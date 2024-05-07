<script setup lang="ts">
import { BaseSection, BaseText, BaseIcon } from '@/components/ui'
import ProgrammingList from './ProgrammingList.vue'
import { PROGRAMMING_ICONS, PROGRAMMING_ADDITIONAL_INFO } from '@/constants'
</script>

<template>
  <BaseSection :title="PROGRAMMING_ADDITIONAL_INFO.title">
    <ProgrammingList />
    <div>
      <BaseText as="header">{{ PROGRAMMING_ADDITIONAL_INFO.header }} </BaseText>
      <BaseText justify>
        {{ PROGRAMMING_ADDITIONAL_INFO.description }}
      </BaseText>
    </div>
    <ul class="icons">
      <BaseIcon v-for="{ id, icon, name } in PROGRAMMING_ICONS" :key="id" :src="icon" :alt="name" />
    </ul>
  </BaseSection>
</template>

<style lang="scss" scoped>
.icons {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;

  @include for-tablet-lg-up {
    gap: 50px;
    max-width: 800px;
  }
}
</style>

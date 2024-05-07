<script setup lang="ts">
import { BaseText } from './ui/'
import { HEADER_DATA } from '@/constants'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navWrapper">
        <BaseText variant="secondary" as="smallText">Edit content</BaseText>
        <BaseText variant="secondary">PL</BaseText>
      </nav>

      <div class="nameWrapper">
        <BaseText as="mainHeader" variant="secondary">{{ HEADER_DATA.fullName }}</BaseText>
        <BaseText variant="secondary">{{ HEADER_DATA.jobPosition }}</BaseText>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  background-color: $primary-bg-color;
  padding: 20px;

  @include for-tablet-lg-up {
    padding: 30px;
  }
}

.wrapper {
  max-width: 1440px;
  margin: 0 auto;
}

.navWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  nav {
    display: flex;
    gap: 20px;
  }
}

.nameWrapper {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

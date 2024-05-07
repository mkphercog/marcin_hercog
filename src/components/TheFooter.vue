<script setup lang="ts">
import { BaseIcon, BaseText } from './ui/'
import PhoneIcon from '@/assets/icons/PhoneIcon.svg'
import MainIcon from '@/assets/icons/MailIcon.svg'

import { FOOTER_DATA } from '@/constants'
</script>

<template>
  <footer>
    <BaseText variant="secondary">{{ FOOTER_DATA.header }}</BaseText>
    <div class="contactWrapper">
      <div class="infoWrapper">
        <BaseIcon class="icon" :src="PhoneIcon" alt="Phone icon"></BaseIcon>
        <BaseText variant="secondary">{{ FOOTER_DATA.phoneNumber }}</BaseText>
      </div>
      <div class="infoWrapper">
        <BaseIcon class="icon" :src="MainIcon" alt="Mail icon"></BaseIcon>
        <BaseText variant="secondary">{{ FOOTER_DATA.email }}</BaseText>
      </div>
    </div>
    <div class="visitedHint">
      <BaseText variant="secondary" as="smallText"
        >{{ FOOTER_DATA.visited }} {{ FOOTER_DATA.visitedValue }}</BaseText
      >
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding: 20px 0;
  background-color: $primary-bg-color;
}

.contactWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;

  @include for-tablet-lg-up {
    flex-direction: row;
    column-gap: 40px;
  }
}

.infoWrapper {
  display: flex;
  gap: 15px;
  align-items: center;
}

.icon {
  height: 24px;
}

.visitedHint {
  padding-right: 20px;
  width: 100%;
  text-align: right;
}
</style>

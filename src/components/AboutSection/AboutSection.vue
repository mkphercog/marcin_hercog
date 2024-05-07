<script setup lang="ts">
import { BaseText } from '@/components/ui'
import { PHOTO_URL, ABOUT } from '@/constants'
</script>

<template>
  <section class="wrapper">
    <BaseText class="description" justify>
      {{ ABOUT }}
    </BaseText>
    <div class="photoWrapper">
      <img :src="PHOTO_URL" alt="Marcin Hercog" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  margin-top: 30px;
  row-gap: 20px;

  @include for-tablet-lg-up {
    flex-direction: row;
    column-gap: 80px;
    margin: 50px auto;
    max-width: 1200px;
  }
}

.description {
  max-width: 700px;
}

.photoWrapper {
  flex-shrink: 0;
  position: relative;
  width: 290px;
  height: 290px;
  overflow: hidden;
  border-radius: 50%;

  @include for-tablet-lg-up {
    width: 430px;
    height: 430px;
  }

  img {
    width: 100%;
    height: auto;
    margin-top: -25%;
  }
}
</style>

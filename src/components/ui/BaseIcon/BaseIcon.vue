<script setup lang="ts">
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
  <div @click="openUrl" class="wrapper" :class="{ clickable: link }">
    <img :src="src" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 60px;

  @include for-tablet-lg-up {
    height: 80px;
  }

  img {
    width: auto;
    height: 100%;

    @include for-tablet-lg-up {
      filter: grayscale(0);
      transition: filter 300ms;

      &:hover {
        filter: grayscale(1);
      }
    }
  }
}

.clickable {
  @include for-tablet-lg-up {
    cursor: pointer;
  }
}
</style>

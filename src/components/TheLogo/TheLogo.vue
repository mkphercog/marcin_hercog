<script setup lang="ts">
import LogoMH from '@/assets/img/LogoMH.png'
import { RouteNamesEnum } from '@/routes'
import { BaseIcon, BaseLink } from '../ui'

import styles from './TheLogo.module.scss'

const homePath = { name: RouteNamesEnum.HOME }
</script>

<template>
  <BaseLink :to="homePath">
    <BaseIcon :class="styles.logo" :src="LogoMH" alt="logo" />
  </BaseLink>
</template>

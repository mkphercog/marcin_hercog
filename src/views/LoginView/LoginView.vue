<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { BaseButton, BaseInput, BaseText } from '@/components/ui'
import { useAppStateStore, useWebContentStore } from '@/store'
import type { InputValuesType } from '../EditView/types/EditView.types'
import { checkInputField } from '../EditView/utils/EditView.helpers'
import { RouteNamesEnum } from '@/routes'

import styles from './LoginView.module.scss'

const appStateStore = useAppStateStore()
const webContentStore = useWebContentStore()
const router = useRouter()

if (appStateStore.isLoggedUser) {
  router.push({
    name: RouteNamesEnum.HOME,
    replace: true
  })
}

appStateStore.setIsLoginErrorMessage(false)

const email = reactive<InputValuesType>({
  value: undefined,
  error: null,
  isValid: undefined,
  hasChanges: false
})

const password = reactive<InputValuesType>({
  value: undefined,
  error: null,
  isValid: undefined,
  hasChanges: false
})

watch(email, () => {
  checkInputField(email, '', 100, false)

  if (appStateStore.isLoginErrorMessage) {
    appStateStore.setIsLoginErrorMessage(false)
  }
})

watch(password, () => {
  checkInputField(password, '', 100, false)

  if (appStateStore.isLoginErrorMessage) {
    appStateStore.setIsLoginErrorMessage(false)
  }
})

const handleLogin = async () => {
  if (email.value && password.value) {
    await appStateStore.login(email.value, password.value)

    if (!appStateStore.isLoginErrorMessage) {
      router.push({
        name: RouteNamesEnum.HOME,
        replace: true
      })
    }
  }
}
</script>

<template>
  <form :class="styles.wrapper" @submit.prevent="handleLogin">
    <BaseInput
      name="login"
      label="Email"
      :is-valid="email.isValid && !email.error"
      :error-message="email.error"
      v-model="email.value"
    />
    <BaseInput
      name="password"
      label="Password"
      :is-valid="password.isValid && !password.error"
      :error-message="password.error"
      v-model="password.value"
      :rest-props="{
        type: 'password'
      }"
    />

    <BaseText v-if="appStateStore.isLoginErrorMessage" :class="styles.errorMessage" size="sm">
      {{ webContentStore.webContent.staticErrors.login }}
    </BaseText>
    <BaseButton variant="secondary">
      {{ webContentStore.webContent.staticLoginView.submitBtn }}
    </BaseButton>
  </form>
</template>

import { computed, ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { firebaseApi } from '@/firebase/firebase'
import { type DeepPartial, type Translations } from '@/types'
import { TRANSLATIONS_DEFAULT } from '@/constants'
import { useAppStateStore } from './appStateStore'

export const useTranslationsStore = defineStore('translations', () => {
  const appStateStore = useAppStateStore()
  const { getCurrentLanguage } = storeToRefs(appStateStore)
  const translations = ref<Translations>(TRANSLATIONS_DEFAULT)
  const localTranslations = ref<Translations | null>(null)
  const profilePhotoUrl = ref(undefined)

  const updateTranslationsAction = (newTranslations: Translations) => {
    translations.value = newTranslations
  }

  const fetchTranslations = async (forceUpdate = false) => {
    appStateStore.setIsLoading(true)
    await firebaseApi.fetchTranslations({
      lang: getCurrentLanguage.value,
      forceUpdate,
      callback: updateTranslationsAction
    })

    localTranslations.value = null
    appStateStore.setHasLocalChanges(false)
    appStateStore.setHasLoadedTranslations(true)
    appStateStore.setIsLoading(false)
  }

  const uptadeTranslations = async (newData: DeepPartial<Translations>) => {
    appStateStore.setIsLoading(true)
    await firebaseApi.setTranslations(getCurrentLanguage.value, newData)
    await fetchTranslations(true)
    appStateStore.setIsLoading(false)
  }

  const downloadCVFile = () => {
    firebaseApi.downloadCVFile(getCurrentLanguage.value)
  }

  firebaseApi.getProfilePhotoUrl(profilePhotoUrl)

  watch(getCurrentLanguage, async () => await fetchTranslations(false), {
    immediate: true
  })

  const changeTranslationsLocally = (newTranslations: Translations) => {
    localTranslations.value = newTranslations
    appStateStore.setHasLocalChanges(
      JSON.stringify(translations.value) !== JSON.stringify(localTranslations.value)
    )

    if (!appStateStore.getHasLocalChanges) {
      localTranslations.value = null
    }
  }

  const restoreTranslations = () => {
    appStateStore.setHasLocalChanges(false)
    localTranslations.value = null
  }

  const webTranslations = computed(() =>
    localTranslations.value ? localTranslations.value : translations.value
  )
  const changedFields = computed(() => ({
    headerJobPosition:
      localTranslations.value?.header.jobPosition !== translations.value.header.jobPosition
  }))

  return {
    uptadeTranslations,
    downloadCVFile,
    changeTranslationsLocally,
    restoreTranslations,
    originalTranslations: translations,
    translations: webTranslations,
    profilePhotoUrl,
    changedFields
  }
})

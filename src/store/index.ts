import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { firebaseApi } from '@/firebase/firebase'
import { LangEnums, type DeepPartial, type Translations } from '@/types'
import { useLSLang } from '@/helpers/useLocalStorageLang'

export const useTranslationsStore = defineStore('translations', () => {
  const { localLang, setLocalLang } = useLSLang()

  const currentLang = ref<LangEnums>(localLang)
  const translations = ref<Translations>()

  const toggleLang = () => {
    const toggledLang = currentLang.value === LangEnums.PL ? LangEnums.EN : LangEnums.PL
    currentLang.value = toggledLang
    setLocalLang(currentLang.value)
  }

  const fetchTranslations = async (forceUpdate = false) => {
    await firebaseApi.fetchTranslations({ lang: currentLang.value, ref: translations, forceUpdate })
  }

  const uptadeTranslations = async (newData: DeepPartial<Translations>) => {
    await firebaseApi.setTranslations(currentLang.value, newData)
    await fetchTranslations(true)
  }

  const downloadCVFile = () => {
    firebaseApi.downloadCVFile(currentLang.value)
  }

  watch(currentLang, async () => await fetchTranslations(false), {
    immediate: true
  })

  const isLoading = computed(() => firebaseApi.getIsLoading())

  return {
    toggleLang,
    uptadeTranslations,
    downloadCVFile,
    isLoading,
    translations
  }
})

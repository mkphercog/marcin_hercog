import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { firebaseApi } from '@/firebase/firebase'
import { LangEnums, type DeepPartial, type Translations } from '@/types'
import { useLocalStorageLang } from '@/helpers/useLocalStorageLang'

export const useTranslationsStore = defineStore('translations', () => {
  const { localLanguage, setLocalLang } = useLocalStorageLang()
  const currentLang = ref<LangEnums>(localLanguage)
  const translations = ref<Translations>()

  const toggleLang = () => {
    const toggledLang = currentLang.value === LangEnums.PL ? LangEnums.EN : LangEnums.PL
    currentLang.value = toggledLang
    setLocalLang(currentLang.value)
  }

  const fetchTranslations = async () => {
    await firebaseApi.getTranslations(currentLang.value, translations)
  }

  const uptadeTranslations = async (newData: DeepPartial<Translations>) => {
    await firebaseApi.setTranslations(currentLang.value, newData)
    await fetchTranslations()
  }

  watch(currentLang, fetchTranslations, {
    immediate: true
  })

  const isLoading = computed(() => firebaseApi.getIsLoading())
  return {
    toggleLang,
    uptadeTranslations,
    isLoading,
    translations
  }
})

import { useLSLang } from '@/helpers/useLocalStorageLang'
import { LangEnums } from '@/types'
import { defineStore } from 'pinia'

const { getLocalLang, setLocalLang } = useLSLang()

export const useAppStateStore = defineStore('appState', {
  state: () => {
    return {
      currentLanguage: getLocalLang(),
      hasLocalChanges: false,
      hasLoadedTranslations: false,
      isLoading: false
    }
  },
  getters: {
    getCurrentLanguage: (state) => {
      return state.currentLanguage
    },
    getHasLocalChanges: (state) => {
      return state.hasLocalChanges
    },
    getHasLoadedTranslations: (state) => {
      return state.hasLoadedTranslations
    },
    getIsLoading: (state) => {
      return state.isLoading
    }
  },
  actions: {
    toggleCurrentLanguage() {
      const toggledLang = this.currentLanguage === LangEnums.PL ? LangEnums.EN : LangEnums.PL
      this.currentLanguage = toggledLang
      setLocalLang(toggledLang)
    },
    setHasLocalChanges(newState: boolean) {
      this.hasLocalChanges = newState
    },
    setHasLoadedTranslations(newState: boolean) {
      this.hasLoadedTranslations = newState
    },
    setIsLoading(newState: boolean) {
      this.isLoading = newState
    }
  }
})

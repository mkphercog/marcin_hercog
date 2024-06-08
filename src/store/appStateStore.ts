import { firebaseApi } from '@/firebase/firebase'
import { useLSLang } from '@/helpers/useLocalStorageLang'
import { LangEnums } from '@/types'
import { defineStore } from 'pinia'
import { useWebContentStore } from './webContentStore'

const { getLocalLang, setLocalLang } = useLSLang()

export const useAppStateStore = defineStore('app-state-store', {
  state: () => {
    return {
      currentLanguageRef: getLocalLang(),
      hasLocalChangesRef: false,
      hasLoadedWebContentRef: false,
      isLoadingRef: false,
      isLoginErrorMessageRef: false
    }
  },
  getters: {
    currentLanguage: (state) => {
      return state.currentLanguageRef
    },

    hasLocalChanges: (state) => {
      return state.hasLocalChangesRef
    },

    hasLoadedWebContent: (state) => {
      return state.hasLoadedWebContentRef
    },

    isLoading: (state) => {
      return state.isLoadingRef
    },

    isLoggedUser() {
      const webContentStore = useWebContentStore()
      return !!webContentStore.currentLoggedUserDataRef?.uid
    },

    isLoginErrorMessage(state) {
      return state.isLoginErrorMessageRef
    }
  },
  actions: {
    toggleCurrentLanguage() {
      const toggledLang = this.currentLanguageRef === LangEnums.PL ? LangEnums.EN : LangEnums.PL
      this.currentLanguageRef = toggledLang
      setLocalLang(toggledLang)
    },

    setHasLocalChanges(newState: boolean) {
      this.hasLocalChangesRef = newState
    },

    setHasLoadedWebContent(newState: boolean) {
      this.hasLoadedWebContentRef = newState
    },

    setIsLoading(newState: boolean) {
      this.isLoadingRef = newState
    },

    setIsLoginErrorMessage(isError: boolean) {
      this.isLoginErrorMessageRef = isError
    },

    async login(email: string, password: string) {
      this.setIsLoading(true)

      await firebaseApi.loginToFirebase(email, password, this.setIsLoginErrorMessage)
      this.setIsLoading(false)
    },

    logout() {
      firebaseApi.logoutFromFirebase()
    }
  }
})

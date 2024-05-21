import { defineStore } from 'pinia'
import { DEFAULT_WEB_CONTENT } from '@/constants'
import type { DeepPartial, WebContentType } from '@/types'
import { useAppStateStore } from './appStateStore'
import { firebaseApi } from '@/firebase/firebase'

export const useWebContentStore = defineStore('web-content-store', {
  state: () => {
    return {
      webContentRef: DEFAULT_WEB_CONTENT,
      localWebContentRef: null as WebContentType | null,
      profilePhotoUrlDataRef: undefined as string | undefined
    }
  },
  getters: {
    webContent(state) {
      return state.localWebContentRef || state.webContentRef
    },

    originalWebContent(state) {
      return state.webContentRef
    },

    profilePhotoUrl(state) {
      firebaseApi.getProfilePhotoUrl((url: string) => (state.profilePhotoUrlDataRef = url))

      return state.profilePhotoUrlDataRef
    }
  },
  actions: {
    async fetchWebContent(forceUpdate: boolean) {
      const appStateStore = useAppStateStore()
      appStateStore.setIsLoading(true)

      await firebaseApi.fetchWebContent({
        lang: appStateStore.currentLanguage,
        forceUpdate,
        callback: (newWebContent: WebContentType) => (this.webContentRef = newWebContent)
      })

      this.clearLocalWebContent()
      appStateStore.setHasLoadedWebContent(true)
      appStateStore.setHasLocalChanges(false)
      appStateStore.setIsLoading(false)
    },

    async updateWebContent(newWebContent: DeepPartial<WebContentType>) {
      const appStateStore = useAppStateStore()

      appStateStore.setIsLoading(true)
      await firebaseApi.setWebContent(appStateStore.currentLanguage, newWebContent)
      await this.fetchWebContent(true)
      appStateStore.setIsLoading(false)
    },

    changeWebContentLocally(newWebContent: WebContentType) {
      const appStateStore = useAppStateStore()

      this.localWebContentRef = newWebContent
      appStateStore.setHasLocalChanges(
        JSON.stringify(this.localWebContentRef) !== JSON.stringify(this.originalWebContent)
      )

      if (!appStateStore.hasLocalChanges) {
        this.clearLocalWebContent()
      }
    },

    clearLocalWebContent() {
      this.localWebContentRef = null
    },

    restoreWebContent() {
      const appStateStore = useAppStateStore()

      appStateStore.setHasLocalChanges(false)
      this.clearLocalWebContent()
    },

    downloadCVFile() {
      const appStateStore = useAppStateStore()
      firebaseApi.downloadCVFile(appStateStore.currentLanguage)
    }
  }
})

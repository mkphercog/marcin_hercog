import { defineStore } from 'pinia'
import isEqual from 'lodash.isequal'
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
      appStateStore.setHasLocalChanges(!isEqual(this.localWebContentRef, this.originalWebContent))

      if (!appStateStore.hasLocalChanges) {
        this.clearLocalWebContent()
      }
    },

    addProgrammingSkill(label: string, scaleValue: number) {
      const newSkills = [
        ...this.webContent.programmingSkills.skillsList,
        {
          id: new Date().getTime().toLocaleString(),
          label: label,
          scaleValue: scaleValue
        }
      ]

      this.changeWebContentLocally({
        ...this.webContent,
        programmingSkills: {
          ...this.webContent.programmingSkills,
          skillsList: newSkills
        }
      })
    },

    deleteProgrammingSkill(id: string) {
      const filteredSkills = this.webContent.programmingSkills.skillsList.filter(
        (skill) => skill.id !== id
      )

      this.changeWebContentLocally({
        ...this.webContent,
        programmingSkills: {
          ...this.webContent.programmingSkills,
          skillsList: filteredSkills
        }
      })
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

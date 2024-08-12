import { defineStore } from 'pinia'
import isEqual from 'lodash.isequal'
import { DEFAULT_WEB_CONTENT } from '@/constants'
import type { ProjectsListItemType, WebContentType } from '@/types'
import { useAppStateStore } from './appStateStore'
import { firebaseApi } from '@/firebase/firebase'
import type { User } from 'firebase/auth'

export const useWebContentStore = defineStore('web-content-store', {
  state: () => {
    return {
      webContentRef: DEFAULT_WEB_CONTENT,
      localWebContentRef: null as WebContentType | null,
      profilePhotoUrlDataRef: undefined as string | undefined,
      currentLoggedUserDataRef: null as User | null
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
    },

    currentLoggedUserName(state) {
      return state.currentLoggedUserDataRef?.displayName || state.currentLoggedUserDataRef?.email
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

    async updateWebContent(newWebContent: Partial<WebContentType['editable']>) {
      const appStateStore = useAppStateStore()

      appStateStore.setIsLoading(true)

      try {
        await firebaseApi.setWebContent(appStateStore.currentLanguage, newWebContent)
        await this.fetchWebContent(true)
      } catch (error) {
        console.error('Something went wrong while updating webContent.', error)
      }

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

    addCodingSkill(label: string, scaleValue: number) {
      const newSkills = [
        ...this.webContent.editable.codingSectionList,
        {
          id: new Date().getTime().toString(),
          label: label,
          scaleValue: scaleValue
        }
      ]

      this.changeWebContentLocally({
        ...this.webContent,
        editable: {
          ...this.webContent.editable,
          codingSectionList: newSkills
        }
      })
    },

    deleteCodingSkill(id: string) {
      const filteredSkills = this.webContent.editable.codingSectionList.filter(
        (skill) => skill.id !== id
      )

      this.changeWebContentLocally({
        ...this.webContent,
        editable: {
          ...this.webContent.editable,
          codingSectionList: filteredSkills
        }
      })
    },

    addExperienceListItem(description: string) {
      const newExperienceList = [
        ...this.webContent.editable.experienceSectionList,
        {
          id: new Date().getTime().toString(),
          description
        }
      ]

      this.changeWebContentLocally({
        ...this.webContent,
        editable: {
          ...this.webContent.editable,
          experienceSectionList: newExperienceList
        }
      })
    },

    deleteExperienceListItem(id: string | undefined) {
      const filteredExperienceList = this.webContent.editable.experienceSectionList.filter(
        (item) => item.id !== id
      )

      this.changeWebContentLocally({
        ...this.webContent,
        editable: {
          ...this.webContent.editable,
          experienceSectionList: filteredExperienceList
        }
      })
    },

    addProject(newProject: Omit<ProjectsListItemType, 'id'>) {
      const newProjects = [
        ...this.webContent.editable.projectsSectionList,
        { id: new Date().getTime().toString(), ...newProject }
      ]

      this.changeWebContentLocally({
        ...this.webContent,
        editable: {
          ...this.webContent.editable,
          projectsSectionList: newProjects
        }
      })
    },

    deleteProject(id: string | undefined) {
      const filteredProjects = this.webContent.editable.projectsSectionList.filter(
        (project) => project.id !== id
      )

      this.changeWebContentLocally({
        ...this.webContent,
        editable: {
          ...this.webContent.editable,
          projectsSectionList: filteredProjects
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
    },

    setCurrentUserData() {
      firebaseApi.getCurrentLoggedUser((data) => (this.currentLoggedUserDataRef = data))
    }
  }
})

import type { WebContentType } from '@/types'

export const DEFAULT_WEB_CONTENT: WebContentType = {
  staticHomeView: {
    editSiteBtn: '',
    changeLangBtn: '',
    fullName: '',
    codingTitle: '',
    codingSubTitle: '',
    experienceTitle: '',
    downloadCVBtn: '',
    socialsTitle: '',
    contactPhoneNumber: '',
    contactEmail: ''
  },

  staticEmailTemplate: {
    title: '',
    message: ''
  },

  staticErrors: {
    emptyField: '',
    maxLength: '',
    exceededRange: '',
    login: ''
  },

  staticNotFoundView: {
    header: '',
    message: '',
    backBtn: ''
  },

  staticEditMode: {
    title: '',
    subTitle: '',
    localChangesInfo: '',
    backBtn: '',
    aboutWebInfo: '',
    submitBtn: '',
    restoreBtn: '',
    publishBtn: '',
    addNewItemHeader: '',
    addNewItemBtn: '',
    showListBtn: '',
    hideListBtn: '',
    deleteItemBtn: '',
    jobPositionTitle: '',
    aboutTitle: '',
    codingTitle: '',
    experienceTitle: '',
    loginBtn: ''
  },

  staticLoginView: {
    title: '',
    submitBtn: '',
    loggedUserHint: '',
    logoutBtn: ''
  },

  editable: {
    headerJobPosition: '',
    aboutSectionDescription: '',
    codingSectionList: [],
    codingSectionDescription: '',
    experienceSectionDescription: '',
    experienceSectionList: []
  }
}

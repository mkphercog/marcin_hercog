import type { WebContentType } from '@/types'

export const DEFAULT_WEB_CONTENT: WebContentType = {
  staticHomeView: {
    editSiteBtn: '',
    changeLangBtn: '',
    fullName: '',
    codeComment: '',
    codeObjectContent: [],
    codingTitle: '',
    codingSubTitle: '',
    experienceTitle: '',
    projectsTitle: '',
    projectDate: '',
    downloadCVBtn: '',
    socialsTitle: '',
    contactPhoneNumber: '',
    contactEmail: '',
    ribbonText: '',
    googleCalendarInfo: ''
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
    checkCurrentWebCode: '',
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
    projectsTitle: '',
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
    experienceSectionList: [],
    projectsSectionList: [
      {
        id: '',
        order: '',
        imgLink: '',
        liveLink: '',
        projectYear: '',
        sourceCodeLink: '',
        techStack: '',
        title: ''
      }
    ]
  }
}

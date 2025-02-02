export type CodingSkillType = {
  id: string
  label: string
  scaleValue: number
}

export type ExperienceListItemType = {
  id: string
  description: string
}

export type ProjectsListItemType = {
  id: string
  order: string
  title: string
  techStack: string
  liveLink: string
  sourceCodeLink: string
  imgLink: string
  projectYear: string
}

export type IconType = {
  id: string
  icon: string
  link?: string
  name: string
}

export type CodeObjectContentItem = {
  keyName: string
  values: string[]
}

type StaticHomeViewType = {
  editSiteBtn: string
  changeLangBtn: string
  fullName: string
  codeComment: string
  codeObjectContent: CodeObjectContentItem[]
  codingTitle: string
  codingSubTitle: string
  experienceTitle: string
  projectsTitle: string
  projectDate: string
  downloadCVBtn: string
  socialsTitle: string
  googleCalendarInfo: string
  contactPhoneNumber: string
  contactEmail: string
  ribbonText: string
}

type StaticEmailTemplateType = {
  title: string
  message: string
}

type StaticErrorsType = {
  emptyField: string
  maxLength: string
  exceededRange: string
  login: string
}

type StaticNotFoundViewType = {
  header: string
  message: string
  backBtn: string
}

type StaticEditModeType = {
  title: string
  subTitle: string
  localChangesInfo: string
  backBtn: string
  aboutWebInfo: string
  checkCurrentWebCode: string
  submitBtn: string
  restoreBtn: string
  publishBtn: string
  addNewItemHeader: string
  addNewItemBtn: string
  showListBtn: string
  hideListBtn: string
  deleteItemBtn: string
  jobPositionTitle: string
  aboutTitle: string
  codingTitle: string
  experienceTitle: string
  projectsTitle: string
  loginBtn: string
}

type StaticLoginViewType = {
  title: string
  submitBtn: string
  loggedUserHint: string
  logoutBtn: string
}

export type EditableType = {
  headerJobPosition: string
  aboutSectionDescription: string
  codingSectionList: CodingSkillType[]
  codingSectionDescription: string
  experienceSectionDescription: string
  experienceSectionList: ExperienceListItemType[]
  projectsSectionList: ProjectsListItemType[]
}

export type WebContentType = {
  staticHomeView: StaticHomeViewType
  staticEmailTemplate: StaticEmailTemplateType
  staticErrors: StaticErrorsType
  staticNotFoundView: StaticNotFoundViewType
  staticEditMode: StaticEditModeType
  staticLoginView: StaticLoginViewType
  editable: EditableType
}

export enum LangEnums {
  PL = 'PL',
  EN = 'EN'
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

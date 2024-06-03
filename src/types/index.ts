export type CodingSkillType = {
  id: string
  label: string
  scaleValue: number
}

export type ExperienceListItemType = {
  id: string
  description: string
}

export type IconType = {
  id: string
  icon: string
  link?: string
  name: string
}

type StaticHomeViewType = {
  editSiteBtn: string
  changeLangBtn: string
  fullName: string
  codingTitle: string
  codingSubTitle: string
  experienceTitle: string
  downloadCVBtn: string
  socialsTitle: string
  contactPhoneNumber: string
  contactEmail: string
}

type StaticEmailTemplateType = {
  title: string
  message: string
}

type StaticErrorsType = {
  emptyField: string
  maxLength: string
  exceededRange: string
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
}

type EditableType = {
  headerJobPosition: string
  aboutSectionDescription: string
  codingSectionList: CodingSkillType[]
  codingSectionDescription: string
  experienceSectionDescription: string
  experienceSectionList: ExperienceListItemType[]
}

export type WebContentType = {
  staticHomeView: StaticHomeViewType
  staticEmailTemplate: StaticEmailTemplateType
  staticErrors: StaticErrorsType
  staticNotFoundView: StaticNotFoundViewType
  staticEditMode: StaticEditModeType
  editable: EditableType
}

export enum LangEnums {
  PL = 'PL',
  EN = 'EN'
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

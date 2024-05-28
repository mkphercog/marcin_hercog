export type ProgrammingSkillType = {
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

export type WebContentType = {
  header: {
    editBtn: string
    langBtn: string
    fullName: string
    jobPosition: string
  }
  about: {
    description: string
    photoUrl: string
  }
  programmingSkills: {
    header: string
    skillsList: ProgrammingSkillType[]
    additionalHeader: string
    additionalDescription: string
  }
  experience: {
    header: string
    description: string
    experienceList: ExperienceListItemType[]
    downloadBtn: string
  }
  socials: {
    header: string
  }
  footer: {
    header: string
    phoneNumber: string
    email: string
    visitors: string
  }
  emailTemplate: {
    title: string
    message: string
  }
  editMode: {
    header: string
    currentLang: string
    localChangesInfo: string
    hintInfo: string
    backBtn: string
    submitBtn: string
    restoreBtn: string
    publishBtn: string
    addNewHeader: string
    addNewBtn: string
    showListBtn: string
    hideListBtn: string
    deleteItemBtn: string
    headerSectionTitle: string
    aboutSectionTitle: string
    codingSectionTitle: string
    experienceSectionTitle: string
  }
  notFound: {
    header: string
    message: string
    backBtn: string
  }
  errors: {
    emptyField: string
    maxLength: string
    exceededRange: string
  }
}

export enum LangEnums {
  PL = 'PL',
  EN = 'EN'
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

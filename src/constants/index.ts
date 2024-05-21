import GitHubIcon from '@/assets/icons/Github.svg'
import LinkedInIcon from '@/assets/icons/LinkedIn.svg'
import TypeScriptIcon from '@/assets/icons/TS.svg'
import JavaSscriptIcon from '@/assets/icons/JS.svg'
import VueIcon from '@/assets/icons/Vue.svg'
import ReactIcon from '@/assets/icons/React.svg'
import CSSIcon from '@/assets/icons/CSS.svg'
import HTMLIcon from '@/assets/icons/HTML.svg'
import VSCodeIcon from '@/assets/icons/VSCode.svg'
import GITIcon from '@/assets/icons/GIT.svg'
import GitLabIcon from '@/assets/icons/GitLab.svg'
import StorybookIcon from '@/assets/icons/Storybook.svg'
import WindowsIcon from '@/assets/icons/Windows.svg'
import FigmaIcon from '@/assets/icons/Figma_with_text.svg'
import NpmIcon from '@/assets/icons/npm.svg'
import YarnIcon from '@/assets/icons/yarn.svg'
import ConfluenceIcon from '@/assets/icons/Confluence.svg'
import JiraIcon from '@/assets/icons/Jira_with_text.svg'
import type { IconType, Translations } from '@/types'

export const SOCIALS: IconType[] = [
  {
    id: 'github',
    icon: GitHubIcon,
    link: 'https://github.com/mkphercog',
    name: 'GitHub Icon'
  },
  {
    id: 'linkedIn',
    icon: LinkedInIcon,
    link: 'https://www.linkedin.com/in/marcin-hercog/',
    name: 'LinkedIn Icon'
  }
]

export const PROGRAMMING_ICONS: IconType[] = [
  {
    id: 'TypeScriptIcon',
    icon: TypeScriptIcon,
    name: 'Typescript icon'
  },
  {
    id: 'JavaSscriptIcon',
    icon: JavaSscriptIcon,
    name: 'Javascript icon'
  },
  {
    id: 'VueIcon',
    icon: VueIcon,
    name: 'Vue icon'
  },
  {
    id: 'ReactIcon',
    icon: ReactIcon,
    name: 'React icon'
  },
  {
    id: 'CSSIcon',
    icon: CSSIcon,
    name: 'CSS Icon'
  },
  {
    id: 'HTMLIcon',
    icon: HTMLIcon,
    name: 'HTML Icon'
  },
  {
    id: 'VSCodeIcon',
    icon: VSCodeIcon,
    name: 'VSCode Icon'
  },
  {
    id: 'GITIcon',
    icon: GITIcon,
    name: 'GIT Icon'
  },
  {
    id: 'GitLabIcon',
    icon: GitLabIcon,
    name: 'GitLab Icon'
  },
  {
    id: 'StorybookIcon',
    icon: StorybookIcon,
    name: 'Storybook Icon'
  },
  {
    id: 'WindowsIcon',
    icon: WindowsIcon,
    name: 'Windows Icon'
  },
  {
    id: 'FigmaIcon',
    icon: FigmaIcon,
    name: 'Figma Icon'
  },
  {
    id: 'NpmIcon',
    icon: NpmIcon,
    name: 'Npm Icon'
  },
  {
    id: 'YarnIcon',
    icon: YarnIcon,
    name: 'Yarn Icon'
  },
  {
    id: 'ConfluenceIcon',
    icon: ConfluenceIcon,
    name: 'Confluence Icon'
  },
  {
    id: 'JiraIcon',
    icon: JiraIcon,
    name: 'Jira Icon'
  }
]

export const ONE_SECOND_IN_MS = 1000
export const ONE_MINUTE_IN_MS = ONE_SECOND_IN_MS * 60
export const FIFTEEN_MINUTES_IN_MS = ONE_MINUTE_IN_MS * 15

export const TRANSLATIONS_DEFAULT: Translations = {
  header: {
    editBtn: '',
    langBtn: '',
    fullName: '',
    jobPosition: ''
  },
  about: {
    description: '',
    photoUrl: ''
  },
  programmingSkills: {
    header: '',
    skillsList: [],
    additionalHeader: '',
    additionalDescription: ''
  },
  experience: {
    header: '',
    description: '',
    experienceList: [],
    downloadBtn: ''
  },
  socials: {
    header: ''
  },
  footer: {
    header: '',
    phoneNumber: '',
    email: '',
    visitors: ''
  },
  emailTemplate: {
    title: '',
    message: ''
  },
  editMode: {
    backBtn: '',
    currentLang: '',
    header: '',
    hintInfo: '',
    localChangesInfo: '',
    publishBtn: '',
    restoreBtn: '',
    submitBtn: ''
  }
}

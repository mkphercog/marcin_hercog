import GitHubIcon from '@/assets/icons/Github.svg'
import LinkedInIcon from '@/assets/icons/LinkedIn.svg'
import TypeScriptIcon from '@/assets/icons/TS.svg'
import JavaScriptIcon from '@/assets/icons/JS.svg'
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
import type { IconType, WebContentType } from '@/types'

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

export const CODING_ICONS: IconType[] = [
  {
    id: 'TypeScriptIcon',
    icon: TypeScriptIcon,
    name: 'TypesScript icon'
  },
  {
    id: 'JavaScriptIcon',
    icon: JavaScriptIcon,
    name: 'JavaScript icon'
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
    name: 'CSS icon'
  },
  {
    id: 'HTMLIcon',
    icon: HTMLIcon,
    name: 'HTML icon'
  },
  {
    id: 'VSCodeIcon',
    icon: VSCodeIcon,
    name: 'VSCode icon'
  },
  {
    id: 'GITIcon',
    icon: GITIcon,
    name: 'GIT icon'
  },
  {
    id: 'GitLabIcon',
    icon: GitLabIcon,
    name: 'GitLab icon'
  },
  {
    id: 'StorybookIcon',
    icon: StorybookIcon,
    name: 'Storybook icon'
  },
  {
    id: 'WindowsIcon',
    icon: WindowsIcon,
    name: 'Windows icon'
  },
  {
    id: 'FigmaIcon',
    icon: FigmaIcon,
    name: 'Figma icon'
  },
  {
    id: 'NpmIcon',
    icon: NpmIcon,
    name: 'Npm icon'
  },
  {
    id: 'YarnIcon',
    icon: YarnIcon,
    name: 'Yarn icon'
  },
  {
    id: 'ConfluenceIcon',
    icon: ConfluenceIcon,
    name: 'Confluence icon'
  },
  {
    id: 'JiraIcon',
    icon: JiraIcon,
    name: 'Jira icon'
  }
]

export const ONE_SECOND_IN_MS = 1000
export const ONE_MINUTE_IN_MS = ONE_SECOND_IN_MS * 60
export const FIFTEEN_MINUTES_IN_MS = ONE_MINUTE_IN_MS * 15

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
    exceededRange: ''
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
    experienceTitle: ''
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

export const PHOTO_URL =
  'https://scontent.fpoz4-1.fna.fbcdn.net/v/t39.30808-6/347404400_627957282294648_7998098935859913146_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xFGY_mfQLU4Q7kNvgGi9P87&_nc_ht=scontent.fpoz4-1.fna&oh=00_AfBWujWawgc_qhbJb6KJn4bgUBJmD6KKMnVxWMvT0ahPZw&oe=663FAB75'

export const ABOUT = `Jestem Frontend Developerem z prawie 2-letnim doświadczeniem, specjalizującym się w bibliotece React. Pracowałem nad dużym projektem e-commerce, w którym wykorzystywałem React do tworzenia interaktywnych interfejsów użytkownika. Posiadam umiejętności analityczne i szybko przyswajam nowe technologie. Na początku mojej kariery ukończyłem kurs “Programowanie w React” zrealizowany przez Bottega IT Minds 31.08-02.09.2022 r. Dodatkowo, w moim prywatnym czasie rozwijam się w kierunku frameworku Vue.js.`

export type ProgrammingSkillType = {
  id: string
  label: string
  scaleValue: number
}

export const PROGRAMMING_SKILLS: ProgrammingSkillType[] = [
  {
    id: 'JavaScript',
    label: 'JavaScript',
    scaleValue: 60
  },
  {
    id: 'TypeScript',
    label: 'TypeScript',
    scaleValue: 55
  },
  {
    id: 'React',
    label: 'React',
    scaleValue: 50
  },
  {
    id: 'Vue',
    label: 'Vue',
    scaleValue: 30
  },
  {
    id: 'CSS',
    label: 'CSS',
    scaleValue: 70
  },
  {
    id: 'HTML5',
    label: 'HTML5',
    scaleValue: 70
  }
]

export const PROGRAMMING_ADDITIONAL_INFO = {
  title: 'Umiejętności programistyczne',
  header: 'Inne narzędzia z których korzystałem',
  description:
    'React-query, Axios, React Hook Form, Vue-router, Vuex/Pinia, Yup, Storybook, npm, yarn, GIT, GitLab, VSCode, ESLint, Prettier, Jira, Confluence, Figma, Scrum, Windows'
}

export type ExperienceType = {
  header: string
  description: string
  experienceList: { id: string; description: string }[]
}

export const EXPERIENCE: ExperienceType = {
  header: 'Doświadczenie zawodowe',
  description:
    'Swoje pierwsze doświadczenie zawodowe jako Frontend Developer zdobyłem pracując dla firmy Eko Okna S. A. od września 2022r., do moich zadań należało:',
  experienceList: [
    {
      id: 'rozwój',
      description:
        'rozwój i utrzymanie apliacji e-commerce  wykorzystując React, Typescript i mikrofrontendy'
    },
    {
      id: 'implementacja',
      description: 'implementacja nowych funkcjonalności opartych o gotowe designy'
    },
    {
      id: 'naprawa',
      description: 'naprawa bieżących błędów'
    },
    {
      id: 'poprawna',
      description: 'poprawna komunikacja z backendem'
    },
    {
      id: 'code',
      description: 'code review dla innych programistów'
    },
    {
      id: 'aktywne',
      description: 'aktywne uczestnictwo w spotkaniach'
    },
    {
      id: 'prezentacja',
      description: 'prezentacja zrealizowanych zadań interesariuszom'
    },
    {
      id: 'uczestnictwo',
      description: 'uczestnictwo w rozwoju biblioteki UI z dokumentacją w Storybooku'
    },
    {
      id: 'wspieranie',
      description:
        'wspieranie przez krótki czas projektu aplikacji  mobilnej (React Native) i projektu legacy code (JavaScript, PHP)'
    }
  ]
}

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

type IconType = {
  id: string
  icon: string
  link?: string
  name: string
}

export const SOCIALS: IconType[] = [
  {
    id: 'github',
    icon: GitHubIcon,
    link: 'https://www.google.pl',
    name: 'GitHub Icon'
  },
  {
    id: 'linkedIn',
    icon: LinkedInIcon,
    link: 'https://www.wp.pl',
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

export const HEADER_DATA = {
  fullName: 'Marcin Hercog',
  jobPosition: 'Frontend Developer'
}

export const FOOTER_DATA = {
  header: 'Zapraszam do kontaktu',
  phoneNumber: '601 781 978',
  email: 'marcin.hercog.biz@gmail.com',
  visited: 'Stronę odwiedziło: ',
  visitedValue: 1
}

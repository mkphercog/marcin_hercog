import GitHubIcon from '@/assets/icons/Github.svg'
import LinkedInIcon from '@/assets/icons/LinkedIn.svg'
import GoogleCalendarIcon from '@/assets/icons/GoogleCalendar.svg'
import type { IconType } from '@/types'

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
  },
  {
    id: 'googleCalendar',
    icon: GoogleCalendarIcon,
    link: 'https://book-time-to-meet.vercel.app/book/user_2s7i3c1dDPud3lINMLLrRJ9Gir4',
    name: 'Google Calendar Icon'
  }
]

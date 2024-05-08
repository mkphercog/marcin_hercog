import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import SITE_CONTENT from '@/content.json'

type AvailableLanguagesType = 'PL' | 'EN'

const getLocalLang = () => localStorage.getItem('lang')
const setLocalLang = (lang: AvailableLanguagesType) => localStorage.setItem('lang', lang)
const getDetectedLang = () => (navigator.language.includes('pl') ? 'PL' : 'EN')

export const useTranslationsStore = defineStore('translations', () => {
  if (!getLocalLang()) {
    setLocalLang(getDetectedLang())
  }
  const defaultLanguage = getLocalLang() as AvailableLanguagesType

  const currentLang = ref<AvailableLanguagesType>(defaultLanguage)

  const siteTranslations = ref({
    ...SITE_CONTENT[currentLang.value]
  })

  const changeLang = () => {
    if (currentLang.value === 'PL') {
      currentLang.value = 'EN'
    } else {
      currentLang.value = 'PL'
    }

    setLocalLang(currentLang.value)
    siteTranslations.value = SITE_CONTENT[currentLang.value]
  }

  const headerContent = computed(() => siteTranslations.value.header)
  const aboutContent = computed(() => siteTranslations.value.about)
  const programmingContent = computed(() => siteTranslations.value.programmingSkills)
  const experienceContent = computed(() => siteTranslations.value.experience)
  const socialsContent = computed(() => siteTranslations.value.socials)
  const footerContent = computed(() => siteTranslations.value.footer)

  return {
    currentLang,
    changeLang,
    headerContent,
    aboutContent,
    programmingContent,
    experienceContent,
    socialsContent,
    footerContent
  }
})

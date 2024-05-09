import { LangEnums } from '@/types'

export const useLocalStorageLang = () => {
  const langItemName = 'lang'
  const getLocalLang = () => localStorage.getItem(langItemName) as LangEnums
  const setLocalLang = (lang: LangEnums) => localStorage.setItem(langItemName, lang)
  const getDetectedLang = () => (navigator.language.includes('pl') ? LangEnums.PL : LangEnums.EN)

  if (!getLocalLang()) {
    setLocalLang(getDetectedLang())
  }

  return {
    localLanguage: getLocalLang(),
    setLocalLang
  }
}

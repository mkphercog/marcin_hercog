import { LangEnums } from '@/types'

export const useLSLang = () => {
  const localStorageKey = 'lang'
  const getLocalLang = () => localStorage.getItem(localStorageKey) as LangEnums

  const setLocalLang = (lang: LangEnums) => localStorage.setItem(localStorageKey, lang)
  const getDetectedLang = () => (navigator.language.includes('pl') ? LangEnums.PL : LangEnums.EN)

  if (!getLocalLang()) {
    const detectedLang = getDetectedLang()
    setLocalLang(detectedLang)
  }

  return {
    getLocalLang,
    setLocalLang
  }
}

import { FIFTEEN_MINUTES_IN_MS } from '@/constants'
import { LangEnums } from '@/types'

type UseLSLastUpdate = {
  currentTime: number
  lang: LangEnums
  forceUpdate?: boolean
}

export const useLSLastUpdate = ({ currentTime, lang, forceUpdate }: UseLSLastUpdate) => {
  let isUpdateDataNeeded = false
  const localStorageKey = `lastUpdate${lang}`
  const lastUpdate = Number(localStorage.getItem(localStorageKey))

  const setLastUpdate = () => localStorage.setItem(localStorageKey, JSON.stringify(currentTime))

  if (!lastUpdate || currentTime - lastUpdate >= FIFTEEN_MINUTES_IN_MS || forceUpdate) {
    setLastUpdate()
    isUpdateDataNeeded = true
  } else {
    isUpdateDataNeeded = false
  }

  return {
    isUpdateDataNeeded
  }
}

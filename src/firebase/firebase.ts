import { ref, type Ref } from 'vue'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  Firestore,
  collection,
  setDoc,
  initializeFirestore,
  persistentLocalCache,
  getDocFromCache
} from 'firebase/firestore'
import { collectionPath, firebaseConfig } from './firebase.config'
import type { DeepPartial, LangEnums, Translations } from '@/types'
import { useLSLastUpdate } from '@/helpers/useLocalStorageLastUpdate'
import { getStorage, ref as firebaseRef, getDownloadURL } from 'firebase/storage'
import axios from 'axios'

const app = initializeApp(firebaseConfig)
initializeFirestore(app, {
  localCache: persistentLocalCache({})
})
const db = getFirestore(app)

type GetTranslationPropsType = {
  lang: LangEnums
  ref: Ref<Translations | undefined>
  forceUpdate?: boolean
}

class FirebaseApi {
  private db: Firestore
  private mainPath = collectionPath
  private isLoading = ref(false)

  constructor(db: Firestore) {
    this.db = db
  }

  public getIsLoading() {
    return this.isLoading.value
  }

  private setIsLoading(value: boolean) {
    this.isLoading.value = value
  }

  private async getTranslationsFromCache({ lang, ref, forceUpdate }: GetTranslationPropsType) {
    const currentTime = new Date().getTime()
    const { isUpdateDataNeeded } = useLSLastUpdate({ currentTime, lang, forceUpdate })

    try {
      const cachedDocRef = doc(this.db, this.mainPath, lang)
      const cachedDocSnap = await getDocFromCache(cachedDocRef)

      if (cachedDocSnap.exists() && !isUpdateDataNeeded) {
        ref.value = cachedDocSnap.data() as Translations
        console.log('Cached data loaded correctly.')
        return true
      }
    } catch (error) {
      console.error('Something went wrong with cache.')
    }

    return false
  }

  public async fetchTranslations({ lang, ref, forceUpdate = false }: GetTranslationPropsType) {
    this.setIsLoading(true)

    const isCachedDataAvailable = await this.getTranslationsFromCache({
      lang,
      ref,
      forceUpdate
    })

    if (isCachedDataAvailable) {
      this.setIsLoading(false)
      return
    }

    const docRef = doc(this.db, this.mainPath, lang)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      ref.value = docSnap.data() as Translations
      console.log('Fetched data loaded correctly.')
    } else {
      console.error('There is no data in this firebase document.')
    }

    this.setIsLoading(false)
  }

  public async setTranslations(lang: LangEnums, newData: DeepPartial<Translations>) {
    this.setIsLoading(true)
    const headerRef = collection(this.db, this.mainPath)

    await setDoc(
      doc(headerRef, lang),
      {
        ...newData
      },
      {
        merge: true
      }
    )
    this.setIsLoading(false)
  }

  public downloadCVFile(lang: LangEnums) {
    const storage = getStorage()
    const fileName = `CV Marcin Hercog ${lang}.pdf`
    const fileRef = firebaseRef(storage, fileName)

    getDownloadURL(fileRef)
      .then(async (url) => {
        axios
          .get(url, {
            responseType: 'blob'
          })
          .then((response) => {
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = fileName
            link.click()
            URL.revokeObjectURL(link.href)
          })
          .catch((err) => console.warn('Failure while downloading the file', err))
      })
      .catch((error) => {
        console.warn(error)
      })
  }
}

export const firebaseApi = new FirebaseApi(db)

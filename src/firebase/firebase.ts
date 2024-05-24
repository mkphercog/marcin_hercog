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
import type { DeepPartial, LangEnums, WebContentType } from '@/types'
import { useLSLastUpdate } from '@/helpers/useLocalStorageLastUpdate'
import { getStorage, ref as firebaseRef, getDownloadURL } from 'firebase/storage'
import axios from 'axios'

const app = initializeApp(firebaseConfig)
initializeFirestore(app, {
  localCache: persistentLocalCache({})
})
const db = getFirestore(app)

type GetWebContentPropsType = {
  lang: LangEnums
  forceUpdate?: boolean
  callback: (newWebContent: WebContentType) => void
}

class FirebaseApi {
  private db: Firestore
  private mainPath = collectionPath

  constructor(db: Firestore) {
    this.db = db
  }

  private async getWebContentFromCache({ lang, forceUpdate, callback }: GetWebContentPropsType) {
    const currentTime = new Date().getTime()
    const { isUpdateDataNeeded } = useLSLastUpdate({ currentTime, lang, forceUpdate })

    try {
      const cachedDocRef = doc(this.db, this.mainPath, lang)
      const cachedDocSnap = await getDocFromCache(cachedDocRef)

      if (cachedDocSnap.exists() && !isUpdateDataNeeded) {
        const newWebContent = cachedDocSnap.data() as WebContentType
        callback(newWebContent)
        console.log('Cached data loaded correctly.')
        return true
      }
    } catch (error) {
      console.error('Something went wrong with cache.')
    }

    return false
  }

  public async fetchWebContent({ lang, forceUpdate = false, callback }: GetWebContentPropsType) {
    const isCachedDataAvailable = await this.getWebContentFromCache({
      lang,
      forceUpdate,
      callback
    })

    if (isCachedDataAvailable) {
      return
    }

    const docRef = doc(this.db, this.mainPath, lang)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const newWebContent = docSnap.data() as WebContentType
      callback(newWebContent)
      console.log('Fetched data loaded correctly.')
    } else {
      console.error('There is no data in this firebase document.')
    }
  }

  public async setWebContent(lang: LangEnums, newData: DeepPartial<WebContentType>) {
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
          .catch((err) => console.error('Failure while downloading the file', err))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  public getProfilePhotoUrl(callback: (url: string) => void) {
    const storage = getStorage()
    const fileName = `MH_Photo.jpg`
    const fileRef = firebaseRef(storage, fileName)

    getDownloadURL(fileRef)
      .then((url) => {
        callback(url)
      })
      .catch((error) => {
        console.error('Failure while fetching profile photo url', error)
      })
  }
}

export const firebaseApi = new FirebaseApi(db)

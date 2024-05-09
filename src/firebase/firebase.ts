import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, Firestore, collection, setDoc } from 'firebase/firestore'
import { collectionPath, firebaseConfig } from './firebase.config'
import { ref, type Ref } from 'vue'
import type { DeepPartial, LangEnums, Translations } from '../types'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

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

  public async getTranslations(lang: LangEnums, ref: Ref<Translations | undefined>) {
    this.setIsLoading(true)
    const docRef = doc(this.db, this.mainPath, lang)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      ref.value = docSnap.data() as Translations
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
}

export const firebaseApi = new FirebaseApi(db)

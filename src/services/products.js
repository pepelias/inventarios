import { database } from './firebase'
import { collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore/lite'

const COLLECTION = 'products'

export const createProduct = async (product) => {
  const doc = await addDoc(collection(database,COLLECTION),product)
  return {...product,id: doc.id}
}

export const updateProduct = async (product) => {
  await setDoc(doc(database,COLLECTION,product.id), product)
  return product
}

export const getProducts = async () => {
  const snapShot = await getDocs(collection(database,COLLECTION))
  return snapShot.docs.map(doc => ({...doc.data(), id: doc.id}))
}
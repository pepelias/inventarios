import { database } from './firebase'
import { addDoc, collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore/lite'

const COLLECTION = 'products'
const collRef = collection(database, COLLECTION)

export const createProduct = async (product) => {
  const doc = await addDoc(collRef, product)
  return { ...product, id: doc.id }
}

export const updateProduct = async (product) => {
  await setDoc(doc(collRef, product.id), product)
  return product
}

export const getProducts = async () => {
  const q = await query(collRef, orderBy('name'))
  const snapShot = await getDocs(q)
  return snapShot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
}
import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

initializeApp(firebaseConfig);
const db = getFirestore();

// Add the document to the collection
export const addDocument = async (path, data) => {
  try {
    const docRef = await addDoc(collection(db, path), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// Get the all the exisiting documents from the collection
export const getAllDocuments = async (path) => {
  const querySnapshot = await getDocs(collection(db, path));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};

// Add the data to the new/existing document in collection.
//If the document does not exist, it will be created. If the document does
// exist, its contents will be overwritten with the newly provided data.
export const addDocumentToCollection = async (
  collectionName,
  documentName,
  data
) => {
  await setDoc(doc(db, collectionName, documentName), data);
};

// Delete document from the collection
export const deleteDocument = async (collectionName, documentName) => {
  await deleteDoc(doc(db, collectionName, documentName));
};

export const getDocument = async (collectionName, documentName) => {
  const docRef = doc(db, collectionName, documentName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
};

export let isDocumentExists = async (collectionName, documentName) => {
  const docRef = doc(db, collectionName, documentName);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';
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
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

// Add the document to the collection
export const addDocument = async (path, data) => {
  try {
    const docRef = await addDoc(collection(db, path), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = doc(db, 'users', userAuth.uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(doc(db, 'users', userAuth.uid), {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log('Error creating user', err.message);
    }
  }
  return userRef;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// Get the all the exisiting documents from the collection
export const getAllDocuments = async (path) => {
  return await getDocs(collection(db, ...path));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });
};

export const getAllCollections = async (path) => {
  // getDoc(db, ...path);
};

// Add the data to the new/existing document in collection.
//If the document does not exist, it will be created. If the document does
// exist, its contents will be overwritten with the newly provided data.
export const addDocumentToCollection = async (path, data) => {
  let pathString = '';
  if (path) {
    pathString = path.reduce((acc, item) => acc + '/' + item);
  }
  return await setDoc(doc(db, pathString), data);
};

// Delete document from the collection
export const deleteDocument = async (collectionName, documentName) => {
  await deleteDoc(doc(db, collectionName, documentName));
};

export const getDocument = async (path) => {
  const docRef = doc(db, ...path);
  return await getDoc(docRef);
};

export const updateDocument = async (path, data) => {
  await setDoc(doc(db, ...path), data);
};

export let isDocumentExists = async (path) => {
  const docRef = doc(db, ...path);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

export let isCollectionExists = async (path) => {
  const collectionRef = collection(db, ...path);
  console.log(collectionRef);
};

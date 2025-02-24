"use server";

import { db } from "@/firebase/config";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";

async function createCase(data: any) {
  try {
    const docRef = await addDoc(collection(db, "Cases"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

async function getCaseById(caseId: string) {
  try {
    const docRef = await getDoc(doc(db, "Cases", caseId));
    if (docRef.exists()) {
      console.log("Document data:", docRef.data());
      return docRef.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
}

export { createCase, getCaseById };

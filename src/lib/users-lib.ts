"use server";

import { db } from "@/firebase/config";
import { User } from "@/types/user";
import { addDoc, collection } from "firebase/firestore";

async function createUser(data: User) {
  const docRef = await addDoc(collection(db, "Users"), data);
  return docRef;
}

export { createUser };

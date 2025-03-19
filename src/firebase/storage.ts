"use server";

import { storage } from "./config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadFile(file: File) {
  const storageRef = ref(storage, `profile_pictures/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

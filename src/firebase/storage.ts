import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./clientApp";

export async function uploadProfilePicture(uid: string, image: File) {
  const filePath = `images/${uid}/${image.name}`;
  const newImageRef = ref(storage, filePath);
  await uploadBytesResumable(newImageRef, image);

  return await getDownloadURL(newImageRef);
}

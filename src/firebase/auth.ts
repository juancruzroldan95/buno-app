import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  NextOrObserver,
  User,
} from "firebase/auth";

import { auth } from "./clientApp";

import { createUser } from "@/lib/users-actions";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

// export type RegisterCredentials = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   accountType: "lawyer" | "client";
// };

// export type LoginCredentials = {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// };

// export async function register({
//   firstName,
//   lastName,
//   email,
//   password,
//   accountType,
// }: RegisterCredentials) {
//   const userCredential = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );
//   const filteredUser = userDTO(userCredential.user);
//   await createUser(); // To do;

//   console.log(userCredential.user);

//   return {
//     authToken: await userCredential.user.getIdToken(),
//     user: filteredUser,
//   };
// }

// export async function firebaseLogin({
//   email,
//   password,
//   rememberMe,
// }: LoginCredentials) {
//   const userCredential = await signInWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );
//   const filteredUser = userDTO(userCredential.user);

//   return {
//     authToken: await userCredential.user.getIdToken(),
//     user: filteredUser,
//   };
// }

// function userDTO(user) {
//   return {
//     uid: user.uid,
//     name: user.displayName,
//     email: user.email,
//     photoURL: user.photoURL,
//   };
// }

"use server";

import { createUser } from "@/lib/users-actions";
import { auth, provider } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { cookies } from "next/headers";

export type RegisterCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: "lawyer" | "client";
};

export type LoginCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export async function register({
  firstName,
  lastName,
  email,
  password,
  accountType,
}: RegisterCredentials) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const filteredUser = userDTO(userCredential.user);
  await createUser({
    uid: userCredential.user.uid,
    firstName,
    lastName,
    email,
    accountType,
  });

  console.log(userCredential.user);

  return {
    authToken: await userCredential.user.getIdToken(),
    user: filteredUser,
  };
}

export async function firebaseLogin({
  email,
  password,
  rememberMe,
}: LoginCredentials) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const filteredUser = userDTO(userCredential.user);

  return {
    authToken: await userCredential.user.getIdToken(),
    user: filteredUser,
  };
}

export async function firebaseGoogleLogin() {
  const userCredential = await signInWithPopup(auth, provider);
  const filteredUser = userDTO(userCredential.user);

  return {
    authToken: await userCredential.user.getIdToken(),
    user: filteredUser,
  };
}

export async function logout() {
  await signOut(auth);
}

function userDTO(user) {
  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
}

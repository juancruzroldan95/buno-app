import {
  GoogleAuthProvider,
  NextOrObserver,
  User,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./clientApp";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: NextOrObserver<User>) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const user = result.user;
  const additionalInfo = getAdditionalUserInfo(result);
  const isNewUser = additionalInfo?.isNewUser;

  return {
    isNewUser,
    user,
  };
}

export async function signOut() {
  return auth.signOut();
}

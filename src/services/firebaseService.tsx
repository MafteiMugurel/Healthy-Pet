import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { get, ref } from "firebase/database";

export const logIn = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", user);
    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", user);
    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const fetchAnimals = async (uid: string) => {
  try {
    const userRef = ref(db, `users/${uid}/animals`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error fetching animals:", err);
    throw err;
  }
};

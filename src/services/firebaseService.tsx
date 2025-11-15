import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

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

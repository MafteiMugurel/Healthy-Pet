import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { get, push, ref } from "firebase/database";

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
    saveNewUserData(user.user.uid, name);
    console.log("User signed up:", user);
    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

const saveNewUserData = async (uid: string, name: string) => {
  try {
    const userRef = ref(db, `users/${uid}`);
    await push(userRef, { name });
    console.log("User data saved successfully");
  } catch (err) {
    console.error("Error saving user data:", err);
    throw err;
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

export const saveAnimalData = async (
  uid: string,
  animalId: string,
  type: string,
  data: any
) => {
  console.log("Saving animal data:", { uid, animalId, type, data });
  try {
    const animalRef = ref(db, `users/${uid}/animals/${animalId}/${type}`);
    await push(animalRef, data);
    console.log("Animal data saved successfully");
  } catch (err) {
    console.error("Error saving animal data:", err);
    throw err;
  }
};

export const fetchAnimalById = async (uid: string, animalId: string) => {
  try {
    const animalRef = ref(db, `users/${uid}/animals/${animalId}`);
    const snapshot = await get(animalRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error fetching animal by ID:", err);
    throw err;
  }
};

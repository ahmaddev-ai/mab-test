// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getFirestore,
  increment,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const createPublisherUser = async ({
  name,
  email,
  password,
  role,
}: any) => {
  const secondaryApp = initializeApp(firebaseConfig, "Secondary");

  const secondaryAuth = getAuth(secondaryApp);

  const userCred = await createUserWithEmailAndPassword(
    secondaryAuth,
    email,
    password
  );

  await setDoc(doc(db, "users", userCred.user.uid), {
    name,
    email,
    role: role || "publisher",
    createdAt: serverTimestamp(),
  });
  /* ---------- update analytics ---------- */

  const globalRef = doc(db, "analytics", "global");

  await setDoc(
    globalRef,
    {
      totalUsers: increment(1),
      totalPublishers: increment(1),
      lastUserCreatedAt: serverTimestamp(),
    },
    { merge: true }
  );
  await updateDailyAnalytics({
    usersCreated: increment(1),
    publishersCreated: increment(1),
  });

  await signOut(secondaryAuth);

  return userCred.user;
};

export const updateDailyAnalytics = async (data: any) => {
  const today = new Date().toLocaleDateString("en-CA");

  const dailyRef = doc(db, "analytics", `daily_${today}`);

  await setDoc(
    dailyRef,
    {
      date: today,
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: "admin" | "publisher"
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    role,
    createdAt: serverTimestamp(),
  });

  await setDoc(
    doc(db, "analytics", "global"),
    {
      totalUsers: increment(1),
      ...(role === "publisher" ? { totalPublishers: increment(1) } : {}),
      lastUserCreatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  await updateDailyAnalytics({
    usersCreated: increment(1),
    ...(role === "publisher" ? { publishersCreated: increment(1) } : {}),
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const uploadImageToFirebase = async (file: File) => {
  const fileRef = ref(storage, `blogs/${Date.now()}-${file.name}`);

  await uploadBytes(fileRef, file);

  const url = await getDownloadURL(fileRef);

  return url;
};

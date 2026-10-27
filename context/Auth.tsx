"use client";

import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AppUser {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  role: string | null;
  createdAt: unknown;
}

interface AuthContextType {
  user: AppUser | null;
  role: string | null;
  loading: boolean;
}

interface UserProfile {
  role: string | null;
  createdAt: unknown;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

function mapFirebaseUser(
  firebaseUser: FirebaseUser,
  role: string | null,
  createdAt: unknown = null
): AppUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || null,
    photoURL: firebaseUser.photoURL,
    role,
    createdAt,
  };
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchUserProfile(
  firebaseUser: FirebaseUser
): Promise<UserProfile | null> {
  const userRef = doc(db, "users", firebaseUser.uid);

  // Retry briefly if the signup flow is still creating the profile.
  for (let attempt = 0; attempt < 5; attempt++) {
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      const data = snapshot.data();

      return {
        role: typeof data.role === "string" ? data.role : null,
        createdAt: data.createdAt ?? null,
      };
    }

    if (attempt < 4) {
      await wait(500);
    }
  }

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let requestId = 0;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const currentRequestId = ++requestId;

      const isCurrentRequest = () => active && currentRequestId === requestId;

      if (!isCurrentRequest()) return;

      setLoading(true);

      try {
        // No authenticated user.
        if (!firebaseUser) {
          setUser(null);
          setRole(null);

          try {
            localStorage.removeItem("role");
          } catch {
            // Local storage may be unavailable.
          }

          return;
        }

        // Preserve a non-null Firebase user for TypeScript.
        const authenticatedUser: FirebaseUser = firebaseUser;

        const profile = await fetchUserProfile(authenticatedUser);

        if (!isCurrentRequest()) return;

        // Firebase Auth exists, but the Firestore profile does not.
        if (!profile) {
          console.error(
            `Firestore profile missing for user ${authenticatedUser.uid}. ` +
              "Make sure signup creates users/{uid}."
          );

          setUser(mapFirebaseUser(authenticatedUser, null));
          setRole(null);

          try {
            localStorage.removeItem("role");
          } catch {
            // Local storage may be unavailable.
          }

          return;
        }

        setUser(
          mapFirebaseUser(authenticatedUser, profile.role, profile.createdAt)
        );
        setRole(profile.role);

        try {
          if (profile.role) {
            localStorage.setItem("role", profile.role);
          } else {
            localStorage.removeItem("role");
          }
        } catch {
          // Local storage may be unavailable.
        }
      } catch (error) {
        if (!isCurrentRequest()) return;

        console.error("Failed to load user profile:", error);

        // Keep the authenticated user even if Firestore fails.
        if (firebaseUser) {
          setUser(mapFirebaseUser(firebaseUser, null));
        } else {
          setUser(null);
        }

        setRole(null);

        try {
          localStorage.removeItem("role");
        } catch {
          // Local storage may be unavailable.
        }
      } finally {
        if (isCurrentRequest()) {
          setLoading(false);
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

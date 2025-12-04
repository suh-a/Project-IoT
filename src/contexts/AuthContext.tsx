import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, database } from "@/lib/firebase";

interface UserData {
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("onAuthStateChanged fired. user:", firebaseUser);
      setUser(firebaseUser);

      try {
        if (firebaseUser) {
          const userRef = ref(database, `users/${firebaseUser.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            console.log("User data loaded from RTDB:", snapshot.val());
            setUserData(snapshot.val());
          } else {
            console.log("No user data found in RTDB for uid:", firebaseUser.uid);
            setUserData(null);
          }
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.error("Error reading user data from RTDB:", err);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      console.log("signInWithEmailAndPassword success:", cred.user.uid);
    } catch (err) {
      console.error("login error:", err);
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: name });

      const userRef = ref(database, `users/${userCredential.user.uid}`);
      await set(userRef, {
        name,
        email,
        createdAt: new Date().toISOString()
      });

      console.log("User registered and data saved:", userCredential.user.uid);
    } catch (err) {
      console.error("register error:", err);
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

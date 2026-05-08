import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // Fetch user role from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            setCurrentUser({ ...user, ...userDoc.data() });
            setAuthError(null);
          } else {
            await signOut(auth); // Block non-admins
            setCurrentUser(null);
            setAuthError("You are not authorized to access this application.");
          }
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.log("Auth verification failed", error);
        await signOut(auth);
        setCurrentUser(null);
        setAuthError("Failed to verify your account. Please try again.");
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setCurrentUser(null);
    setAuthError(null);
    console.log("Logged out successfully");
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, authError, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

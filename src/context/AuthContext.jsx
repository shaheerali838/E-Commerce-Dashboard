import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    // Fetch user role from Firestore
    //     const userDoc = await getDoc(doc(db, "users", user.uid));
    //     if (userDoc.exists() && userDoc.data().role === "admin") {
    //       setCurrentUser({ ...user, ...userDoc.data() });
    //     } else {
    //       setCurrentUser(null); // Block non-admins
    //     }
    //   } else {
    //     setCurrentUser(null);
    //   }
    //   setLoading(false);
    // });

    // return unsubscribe;
    setCurrentUser({
      uid: "dev-admin-123",
      email: "intern@tech4edges.com",
      role: "admin",
      name: "Development Admin",
    });
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

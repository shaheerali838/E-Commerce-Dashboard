import { useState, useEffect, useCallback } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export const useFavorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", currentUser.uid);
    const unsub = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setFavorites(docSnap.data().favorites || []);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [currentUser]);

  const toggleFavorite = useCallback(async (productId) => {
    if (!currentUser?.uid) return;
    
    const isFav = favorites.includes(productId);
    const userRef = doc(db, "users", currentUser.uid);
    
    try {
      await updateDoc(userRef, {
        favorites: isFav ? arrayRemove(productId) : arrayUnion(productId)
      });
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  }, [currentUser, favorites]);

  return { favorites, loading, toggleFavorite };
};

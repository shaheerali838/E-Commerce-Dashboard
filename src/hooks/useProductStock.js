import { useState, useEffect, useCallback } from "react";
import {
  collection, query, orderBy, onSnapshot,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const COL = "products";

export const useProductStock = () => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  // Real-time listener
  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) setLoading(true);
    }, 0);

    const q = query(collection(db, COL));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Client-side sort by createdAt descending
        data.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
        setProducts(data);
        setLoading(false);
      },
      (err) => { setError(err.message); setLoading(false); }
    );
    return () => unsub();
  }, []);

  const addProduct = useCallback(async (data) => {
    await addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp() });
  }, []);

  const updateProduct = useCallback(async (id, data) => {
    await updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() });
  }, []);

  const deleteProduct = useCallback(async (id) => {
    await deleteDoc(doc(db, COL, id));
  }, []);

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
};

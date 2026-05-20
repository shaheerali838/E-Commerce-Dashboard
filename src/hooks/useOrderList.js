import { useState, useEffect, useCallback } from "react";
import {
  collection, query, orderBy, onSnapshot,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const COL = "orders";

export const useOrderList = () => {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

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
        setOrders(data);
        setLoading(false);
      },
      (err) => { setError(err.message); setLoading(false); }
    );
    return () => unsub();
  }, []);

  const addOrder = useCallback(async (data) => {
    await addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp() });
  }, []);

  const updateOrderStatus = useCallback(async (id, status) => {
    await updateDoc(doc(db, COL, id), { status, updatedAt: serverTimestamp() });
  }, []);

  const deleteOrder = useCallback(async (id) => {
    await deleteDoc(doc(db, COL, id));
  }, []);

  return { orders, loading, error, addOrder, updateOrderStatus, deleteOrder };
};

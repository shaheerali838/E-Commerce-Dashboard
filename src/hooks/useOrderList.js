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
    setLoading(true);
    const q = query(collection(db, COL), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
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

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const COLLECTION = "emails";

// ── helpers ──────────────────────────────────────────────────────────────────
const emailsRef = () => collection(db, COLLECTION);

// Map sidebar tab name → Firestore query
const buildQuery = (userId, folder) => {
  const base = emailsRef();
  switch (folder) {
    case "Starred":
      return query(base, where("userId", "==", userId), where("starred", "==", true), orderBy("createdAt", "desc"));
    case "Important":
      return query(base, where("userId", "==", userId), where("important", "==", true), orderBy("createdAt", "desc"));
    default:
      return query(base, where("userId", "==", userId), where("folder", "==", folder), orderBy("createdAt", "desc"));
  }
};

// ── hook ─────────────────────────────────────────────────────────────────────
export const useInbox = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const [activeNav, setActiveNav] = useState("Inbox");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Real-time listener — re-runs whenever activeNav changes
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    const q = buildQuery(userId, activeNav);
    const unsub = onSnapshot(
      q,
      (snap) => {
        setEmails(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error("Inbox listener error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userId, activeNav]);

  // ── counts per folder (for sidebar badges) ──────────────────────────────
  const [counts, setCounts] = useState({});

  useEffect(() => {
    if (!userId) return;
    const folders = ["Inbox", "Sent", "Draft", "Spam", "Important", "Bin"];

    const unsubs = folders.map((folder) => {
      const q = buildQuery(userId, folder);
      return onSnapshot(q, (snap) => {
        setCounts((prev) => ({ ...prev, [folder]: snap.size }));
      });
    });

    // Starred count
    const starQ = query(emailsRef(), where("userId", "==", userId), where("starred", "==", true));
    const starUnsub = onSnapshot(starQ, (snap) => {
      setCounts((prev) => ({ ...prev, Starred: snap.size }));
    });

    return () => { unsubs.forEach((u) => u()); starUnsub(); };
  }, [userId]);

  // ── write operations ─────────────────────────────────────────────────────
  const sendEmail = useCallback(async ({ to, subject, body }) => {
    await addDoc(emailsRef(), {
      userId,
      folder: "Sent",
      sender: currentUser?.name || currentUser?.email || "Me",
      avatar: (currentUser?.name || currentUser?.email || "ME").slice(0, 2).toUpperCase(),
      to,
      subject,
      body,
      preview: body.slice(0, 80),
      label: null,
      starred: false,
      important: false,
      createdAt: serverTimestamp(),
    });
  }, [userId, currentUser]);

  const saveDraft = useCallback(async ({ to, subject, body }) => {
    await addDoc(emailsRef(), {
      userId,
      folder: "Draft",
      sender: currentUser?.name || currentUser?.email || "Me",
      avatar: (currentUser?.name || currentUser?.email || "ME").slice(0, 2).toUpperCase(),
      to,
      subject,
      body,
      preview: body.slice(0, 80),
      label: null,
      starred: false,
      important: false,
      createdAt: serverTimestamp(),
    });
  }, [userId, currentUser]);

  const toggleStar = useCallback(async (emailId, current) => {
    await updateDoc(doc(db, COLLECTION, emailId), { starred: !current });
  }, []);

  const toggleImportant = useCallback(async (emailId, current) => {
    await updateDoc(doc(db, COLLECTION, emailId), { important: !current });
  }, []);

  const moveToFolder = useCallback(async (emailId, folder) => {
    await updateDoc(doc(db, COLLECTION, emailId), { folder });
  }, []);

  const permanentDelete = useCallback(async (emailId) => {
    await deleteDoc(doc(db, COLLECTION, emailId));
  }, []);

  const moveToBin = useCallback(async (emailId) => {
    await updateDoc(doc(db, COLLECTION, emailId), { folder: "Bin" });
  }, []);

  return {
    activeNav, setActiveNav,
    emails, loading, error,
    counts,
    sendEmail, saveDraft,
    toggleStar, toggleImportant,
    moveToFolder, moveToBin, permanentDelete,
  };
};

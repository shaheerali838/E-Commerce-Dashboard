import React, { useState } from "react";
import {
  Search,
  Archive,
  Info,
  Trash2,
  Mail,
  Star,
  Send,
  FileEdit,
  AlertTriangle,
  Bookmark,
  Trash,
  Plus,
  ChevronLeft,
  ChevronRight,
  Square,
  CheckSquare,
  X,
  Reply,
  Forward,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useInbox } from "../hooks/useInbox";

// ── Label config ──────────────────────────────────────────────────────────────
const labelStyles = {
  Primary: {
    color: "text-teal-600",
    bg: "bg-teal-100",
    border: "border-teal-400",
  },
  Social: {
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-400",
  },
  Work: {
    color: "text-orange-600",
    bg: "bg-orange-100",
    border: "border-orange-400",
  },
  Friends: {
    color: "text-purple-600",
    bg: "bg-purple-100",
    border: "border-purple-400",
  },
};
const getLabelStyle = (name) =>
  labelStyles[name] || { color: "text-gray-600", bg: "bg-gray-100" };

const NAV_ITEMS = [
  { name: "Inbox", icon: Mail },
  { name: "Starred", icon: Star },
  { name: "Sent", icon: Send },
  { name: "Draft", icon: FileEdit },
  { name: "Spam", icon: AlertTriangle },
  { name: "Important", icon: Bookmark },
  { name: "Bin", icon: Trash },
];

const EMPTY = {
  Inbox: { icon: Mail, text: "Your inbox is empty" },
  Starred: { icon: Star, text: "No starred messages" },
  Sent: { icon: Send, text: "No sent messages" },
  Draft: { icon: FileEdit, text: "No drafts saved" },
  Spam: { icon: AlertTriangle, text: "No spam here" },
  Important: { icon: Bookmark, text: "No important messages" },
  Bin: { icon: Trash, text: "Bin is empty" },
};

// ── Compose Modal ─────────────────────────────────────────────────────────────
const ComposeModal = ({ onClose, onSend, onDraft }) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const handle = async (action) => {
    if (!subject.trim() && !body.trim()) return;
    setSending(true);
    try {
      await action({ to, subject, body });
      onClose();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 bg-gray-800 text-white">
          <h3 className="font-semibold text-sm">New Message</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            type="email"
            placeholder="To"
            className="w-full text-sm border-b border-gray-200 pb-2 outline-none text-gray-700 placeholder-gray-400 focus:border-blue-400 transition-colors"
          />
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            type="text"
            placeholder="Subject"
            className="w-full text-sm border-b border-gray-200 pb-2 outline-none text-gray-700 placeholder-gray-400 focus:border-blue-400 transition-colors"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message..."
            rows={8}
            className="w-full text-sm text-gray-700 resize-none outline-none placeholder-gray-400 pt-2"
          />
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <button
            onClick={() => handle(onDraft)}
            disabled={sending}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Save Draft
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors"
            >
              Discard
            </button>
            <button
              onClick={() => handle(onSend)}
              disabled={sending}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              {sending && <Loader2 size={14} className="animate-spin" />} Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Email Detail ──────────────────────────────────────────────────────────────
const EmailDetail = ({ email, onClose, onDelete, onMoveToBin, isBin }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft size={16} /> Back
      </button>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
          <Reply size={14} /> Reply
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
          <Forward size={14} /> Forward
        </button>
        {isBin ? (
          <button
            onClick={() => {
              onDelete(email.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-red-200 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
          >
            <Trash2 size={14} /> Delete forever
          </button>
        ) : (
          <button
            onClick={() => {
              onMoveToBin(email.id);
              onClose();
            }}
            className="p-1.5 border border-gray-200 rounded-lg hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{email.subject}</h2>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
          {email.avatar || email.sender?.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{email.sender}</p>
          <p className="text-xs text-gray-400">
            {email.to ? `to ${email.to}` : "to me"} &bull;{" "}
            {email.createdAt?.toDate?.()?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) ?? ""}
          </p>
        </div>
        {email.label && (
          <span
            className={`ml-auto text-[11px] px-2 py-0.5 rounded font-medium ${getLabelStyle(email.label).bg} ${getLabelStyle(email.label).color}`}
          >
            {email.label}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 rounded-xl p-5 border border-gray-100">
        {email.body}
      </div>
    </div>

    <div className="p-4 border-t border-gray-100">
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
        <textarea
          placeholder="Write a reply..."
          rows={3}
          className="w-full bg-transparent text-sm text-gray-700 resize-none outline-none placeholder-gray-400"
        />
        <div className="flex justify-end mt-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ── Inbox Page ────────────────────────────────────────────────────────────────
const Inbox = () => {
  const {
    activeNav,
    setActiveNav,
    emails,
    loading,
    error,
    counts,
    sendEmail,
    saveDraft,
    toggleStar,
    toggleImportant,
    moveToBin,
    permanentDelete,
  } = useInbox();

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [openEmail, setOpenEmail] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [search, setSearch] = useState("");

  const toggleSelect = (id) =>
    setSelectedEmails((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const filtered = emails.filter(
    (e) =>
      !search ||
      e.sender?.toLowerCase().includes(search.toLowerCase()) ||
      e.subject?.toLowerCase().includes(search.toLowerCase()),
  );

  const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n ?? 0));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8 font-sans">
      {showCompose && (
        <ComposeModal
          onClose={() => setShowCompose(false)}
          onSend={sendEmail}
          onDraft={saveDraft}
        />
      )}

      <h1 className="text-3xl font-bold mb-6 text-gray-900">{activeNav}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <button
            onClick={() => setShowCompose(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 mb-8 transition-colors"
          >
            <Plus size={18} /> Compose
          </button>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-4 px-3">
              My Email
            </h3>
            <nav className="space-y-1">
              {NAV_ITEMS.map(({ name, icon: Icon }) => {
                const isActive = activeNav === name;
                const count = counts[name] ?? 0;
                return (
                  <button
                    key={name}
                    onClick={() => {
                      setActiveNav(name);
                      setOpenEmail(null);
                      setSelectedEmails([]);
                      setSearch("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-left ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={isActive ? "text-blue-500" : "text-gray-400"}
                      />
                      <span className="text-sm font-medium">{name}</span>
                    </div>
                    {count > 0 && (
                      <span
                        className={`text-xs ${isActive ? "text-blue-500 font-semibold" : "text-gray-400"}`}
                      >
                        {fmt(count)}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 px-3">Label</h3>
            <div className="space-y-3 px-3 mb-6">
              {Object.entries(labelStyles).map(([name, style]) => (
                <div
                  key={name}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-4 h-4 border-2 rounded ${style.border}`} />
                  <span className="text-sm text-gray-700 font-medium">
                    {name}
                  </span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm font-medium px-3 transition-colors">
              <Plus size={16} /> Create New Label
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col min-w-0">
          <div
            className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden"
            style={{ minHeight: 500 }}
          >
            {openEmail ? (
              <EmailDetail
                email={openEmail}
                onClose={() => setOpenEmail(null)}
                onMoveToBin={(id) => moveToBin(id)}
                onDelete={(id) => permanentDelete(id)}
                isBin={activeNav === "Bin"}
              />
            ) : (
              <>
                {/* Top Bar */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-2xl">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder={`Search in ${activeNav}...`}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-gray-50 text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none border border-transparent focus:border-gray-200 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 transition-colors">
                      <Archive size={16} />
                    </button>
                    <button className="p-2 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 transition-colors">
                      <Info size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSearch("");
                        setOpenEmail(null);
                      }}
                      className="p-2 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                      title="Refresh"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>

                {/* Email List */}
                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                      <Loader2 size={32} className="animate-spin mb-3" />
                      <p className="text-sm">Loading {activeNav}…</p>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center h-64 text-red-400">
                      <AlertTriangle size={36} className="mb-3" />
                      <p className="text-sm font-medium">
                        Failed to load emails
                      </p>
                      <p className="text-xs mt-1 text-gray-400">{error}</p>
                    </div>
                  ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-300">
                      {(() => {
                        const E = EMPTY[activeNav];
                        return (
                          <>
                            <E.icon size={48} className="mb-3" />
                            <p className="text-sm font-medium">{E.text}</p>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    filtered.map((email) => {
                      const sel = selectedEmails.includes(email.id);
                      return (
                        <div
                          key={email.id}
                          onClick={() => setOpenEmail(email)}
                          className="flex items-center px-4 py-3 border-b border-gray-50 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:-translate-y-px transition-all bg-white relative z-10 cursor-pointer"
                        >
                          {/* Checkbox + Star + Avatar + Sender */}
                          <div className="flex items-center gap-3 min-w-50">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelect(email.id);
                              }}
                              className="text-gray-300 hover:text-gray-400"
                            >
                              {sel ? (
                                <CheckSquare
                                  size={18}
                                  className="text-blue-500"
                                />
                              ) : (
                                <Square size={18} />
                              )}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(email.id, email.starred);
                              }}
                              className="text-gray-300 hover:text-yellow-400"
                            >
                              <Star
                                size={18}
                                className={
                                  email.starred
                                    ? "fill-yellow-400 text-yellow-400"
                                    : ""
                                }
                              />
                            </button>
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {email.avatar ||
                                email.sender?.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm font-bold text-gray-900 truncate">
                              {email.sender}
                            </span>
                          </div>

                          {/* Label + Subject + Preview */}
                          <div className="flex-1 flex items-center gap-3 min-w-0 px-3">
                            {email.label && (
                              <span
                                className={`text-[11px] px-2 py-0.5 rounded font-medium whitespace-nowrap ${getLabelStyle(email.label).bg} ${getLabelStyle(email.label).color}`}
                              >
                                {email.label}
                              </span>
                            )}
                            <span className="text-sm text-gray-800 font-medium truncate">
                              {email.subject}
                            </span>
                            <span className="text-sm text-gray-400 truncate hidden md:inline">
                              &mdash; {email.preview}
                            </span>
                          </div>

                          {/* Time */}
                          <div className="text-xs text-gray-400 whitespace-nowrap pl-3">
                            {email.createdAt
                              ?.toDate?.()
                              ?.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              }) ??
                              email.time ??
                              ""}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>

          {/* Pagination bar */}
          {!openEmail && (
            <div className="flex items-center justify-between pt-4 px-2">
              <span className="text-sm text-gray-500">
                {loading
                  ? "Loading…"
                  : `${filtered.length} message${filtered.length !== 1 ? "s" : ""} in ${activeNav}`}
              </span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 border border-gray-200 rounded bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50">
                  <ChevronLeft size={16} />
                </button>
                <button className="p-1.5 border border-gray-200 rounded bg-white text-gray-600 hover:bg-gray-50">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Inbox;

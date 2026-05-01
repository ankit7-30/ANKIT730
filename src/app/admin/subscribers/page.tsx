"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Search, 
  Download, 
  Mail, 
  Trash2, 
  MoreVertical, 
  ChevronDown, 
  CheckCircle2,
  Copy,
  ExternalLink,
  Filter,
  X
} from "lucide-react";
import { subscriberService } from "@/lib/services";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // SENIOR SECURITY: Real-time Audience Listener with Cinematic Sorting
    const q = query(collection(db, "subscribers"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubscribers(data);
      setLoading(false);
      setError(null);
    }, (err: any) => {
      console.error("Audience sync error details:", err);
      const isPermissionDenied = err.code === 'permission-denied' || err.message?.toLowerCase().includes("permission");
      
      setError(isPermissionDenied 
        ? "Access Denied: Ensure your email is verified and you are using the Master Admin account." 
        : `Sync Error: ${err.message || "Unknown error"}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadSubscribers = async () => {
    // Legacy method - functionality moved to real-time listener
  };

  const filteredSubscribers = subscribers.filter(s => 
    s.email?.toLowerCase().includes(search.toLowerCase()) || 
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this subscriber?")) {
      try {
        await subscriberService.delete(id);
        setSubscribers(subscribers.filter(s => s.id !== id));
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  const copyToClipboard = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Email,Date Joined"].join(",") + "\n"
      + filteredSubscribers.map(s => `${s.name},${s.email},${new Date(s.createdAt?.seconds * 1000).toLocaleDateString()}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Newsletter Hub</h1>
          <p className="text-gray-500">Manage your growing audience and export subscriber lists.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={exportToCSV}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all text-white"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>
      </header>

      <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">Audience List</h3>
            <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold tracking-widest border border-brand-primary/20">
              {filteredSubscribers.length} TOTAL
            </span>
          </div>
          {error && (
            <div className="flex-1 max-w-md px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-medium flex items-center gap-2">
              <X size={14} className="shrink-0" /> {error}
            </div>
          )}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-primary text-white"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="bg-white/5 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Subscriber</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date Joined</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={4} className="py-20 text-center text-gray-500">Loading your audience data...</td></tr>
              ) : filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                        {sub.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{sub.name}</p>
                        <p className="text-xs text-gray-500">{sub.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold tracking-widest border border-green-500/20">
                      ACTIVE
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500">
                    {sub.createdAt?.seconds ? new Date(sub.createdAt.seconds * 1000).toLocaleDateString() : "Today"}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => copyToClipboard(sub.email, sub.id)}
                        className={`p-2 rounded-lg transition-all ${copiedId === sub.id ? "bg-green-500/10 text-green-500" : "hover:bg-white/5 text-gray-400"}`}
                      >
                        {copiedId === sub.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      </button>
                      <button 
                        onClick={() => handleDelete(sub.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filteredSubscribers.length === 0 && (
                <tr><td colSpan={4} className="py-20 text-center text-gray-500">No subscribers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

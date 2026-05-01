"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  Search, 
  Mail, 
  Calendar, 
  MoreVertical,
  Download,
  Filter,
  Trash2,
  UserX,
  Copy,
  CheckCircle2
} from "lucide-react";

const initialSubscribers = [
  { id: 1, email: "rahul.sharma@gmail.com", date: "May 01, 2026", status: "Active" },
  { id: 2, email: "priya.verma@outlook.com", date: "Apr 28, 2026", status: "Active" },
  { id: 3, email: "ankit.fan@gmail.com", date: "Apr 25, 2026", status: "Active" },
  { id: 4, email: "vikas.yadav@hotmail.com", date: "Apr 22, 2026", status: "Active" },
  { id: 5, email: "sneha.k@yahoo.com", date: "Apr 20, 2026", status: "Pending" },
];

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredSubscribers = subscribers.filter(s => 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (id: number, email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    setActiveMenu(null);
  };

  const handleDelete = (id: number) => {
    setSubscribers(subscribers.filter(s => s.id !== id));
    setActiveMenu(null);
  };

  return (
    <div className="space-y-12 pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Newsletter Subscribers</h1>
          <p className="text-gray-500">Manage and track your growing community of {subscribers.length} members.</p>
        </div>
        <button className="px-8 py-3 bg-brand-primary text-black rounded-xl font-bold flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
          <Download size={18} /> Export List (.csv)
        </button>
      </header>

      {/* REMOVED overflow-hidden to allow dropdowns to pop out */}
      <div className="glass-dark rounded-[3rem] border border-white/5 min-h-[600px] relative">
        {/* Table Controls */}
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search subscribers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-brand-primary transition-colors text-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm font-bold">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-visible">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Subscriber</th>
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Joined Date</th>
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSubscribers.map((subscriber, index) => {
                // If it's the last or second to last item, open menu upwards
                const isLast = index >= filteredSubscribers.length - 2;

                return (
                  <motion.tr 
                    key={subscriber.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/[0.02] transition-colors group relative"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                          <Mail size={18} />
                        </div>
                        <span className="font-medium">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {subscriber.date}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        subscriber.status === 'Active' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${subscriber.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === subscriber.id ? null : subscriber.id)}
                        className={`p-2 rounded-lg transition-colors ${activeMenu === subscriber.id ? "bg-brand-primary text-black" : "text-gray-500 hover:bg-white/10"}`}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Action Dropdown */}
                      <AnimatePresence>
                        {activeMenu === subscriber.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: isLast ? 10 : -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: isLast ? 10 : -10 }}
                              // SMART POSITIONING: Use bottom-16 if it's the last items
                              className={`absolute right-8 ${isLast ? 'bottom-16' : 'top-16'} w-48 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 overflow-hidden`}
                            >
                              <button 
                                onClick={() => handleCopy(subscriber.id, subscriber.email)}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-brand-primary hover:text-black transition-all"
                              >
                                {copiedId === subscriber.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                {copiedId === subscriber.id ? "Copied!" : "Copy Email"}
                              </button>
                              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-brand-primary hover:text-black transition-all">
                                <UserX size={16} /> Mark Inactive
                              </button>
                              <div className="h-px bg-white/5 mx-2" />
                              <button 
                                onClick={() => handleDelete(subscriber.id)}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Trash2 size={16} /> Delete Subscriber
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredSubscribers.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex p-6 bg-white/5 rounded-full mb-4">
                <Search size={32} className="text-gray-600" />
              </div>
              <p className="text-gray-500">No subscribers found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

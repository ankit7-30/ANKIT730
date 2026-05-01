"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Link as LinkIcon, 
  Type, 
  Image as ImageIcon,
  Trash2,
  Edit2,
  ExternalLink,
  Search,
  X,
  CheckCircle2
} from "lucide-react";
import { FaYoutube } from "react-icons/fa6";

const initialVideos = [
  { id: 1, title: "Scale your brand from zero in 2026", category: "Personal Brand", status: "Live" },
  { id: 2, title: "Financial Freedom for Content Creators", category: "Finance", status: "Live" },
  { id: 3, title: "Mastering the Growth Mindset", category: "Mindset", status: "Live" },
  { id: 4, title: "YouTube SEO Secrets Revealed", category: "Education", status: "Live" },
];

export default function AdminYoutubeManager() {
  const [videos, setVideos] = useState(initialVideos);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({ title: "", category: "Personal Brand", url: "" });

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this video?")) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  const handleEdit = (video: any) => {
    setFormData({ title: video.title, category: video.category, url: "" });
    setEditId(video.id);
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setVideos(videos.map(v => v.id === editId ? { ...v, title: formData.title, category: formData.category } : v));
      setEditId(null);
    } else {
      const newVideo = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        status: "Live"
      };
      setVideos([newVideo, ...videos]);
    }
    setIsAdding(false);
    setFormData({ title: "", category: "Personal Brand", url: "" });
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">YouTube Manager</h1>
          <p className="text-gray-500">Manually manage your channel&apos;s featured videos.</p>
        </div>
        <button 
          onClick={() => {
            setIsAdding(!isAdding);
            if (isAdding) setEditId(null);
          }}
          className="px-6 py-3 bg-brand-primary text-black rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
        >
          {isAdding ? "Cancel" : <><Plus size={18} /> Add Video</>}
        </button>
      </header>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-dark p-8 rounded-[2.5rem] border border-brand-primary/30 shadow-2xl shadow-brand-primary/10"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              {editId ? <Edit2 size={20} className="text-brand-primary" /> : <Plus size={20} className="text-brand-primary" />}
              {editId ? "Edit Video Entry" : "New Video Entry"}
            </h3>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Video Title</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. How to scale a brand"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-primary transition-colors text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">YouTube Link</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="url" 
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-primary transition-colors text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary transition-colors text-white"
                  >
                    <option className="bg-[#111]">Personal Brand</option>
                    <option className="bg-[#111]">Finance</option>
                    <option className="bg-[#111]">Mindset</option>
                    <option className="bg-[#111]">Education</option>
                  </select>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <button type="submit" className="flex-1 py-4 bg-brand-primary text-black rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:scale-[1.02] transition-all">
                    {editId ? "Update Video" : "Save Video"}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setEditId(null);
                    }}
                    className="px-8 py-4 glass rounded-2xl font-bold text-gray-400 hover:text-white transition-colors"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video List */}
      <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xl font-bold">Existing Videos ({videos.length})</h3>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Filter videos..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-primary transition-colors text-white"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-gray-500 text-xs uppercase tracking-widest">
                <th className="px-8 py-4 font-bold">Thumbnail</th>
                <th className="px-8 py-4 font-bold">Title & Category</th>
                <th className="px-8 py-4 font-bold text-center">Status</th>
                <th className="px-8 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredVideos.map((video) => (
                  <motion.tr 
                    layout
                    key={video.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="w-24 aspect-video rounded-lg bg-white/5 overflow-hidden border border-white/10">
                        <div className="w-full h-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                          <FaYoutube size={16} />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-sm mb-1">{video.title}</p>
                      <p className="text-xs text-brand-primary/60 font-medium">{video.category}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                          {video.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(video)}
                          className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(video.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredVideos.length === 0 && (
            <div className="py-20 text-center text-gray-500">No videos found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

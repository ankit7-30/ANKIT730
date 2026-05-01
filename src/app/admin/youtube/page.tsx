"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, Search, ExternalLink, Save, X, Play, Info, Video, Zap, Radio, ListVideo, UploadCloud, ImageIcon } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import { youtubeService } from "@/lib/services";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";

export default function AdminYoutubeHub() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ 
    title: "", 
    videoUrl: "", 
    category: "VIDEOS", 
    thumbnail: "",
    description: "" 
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const data = await youtubeService.getAll();
      setVideos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadToCloudinary(file, "ankit_youtube");
      setFormData({...formData, thumbnail: url});
    } catch (err) {

      alert("Thumbnail upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await youtubeService.update(editId, formData);
        setVideos(videos.map(v => v.id === editId ? { ...v, ...formData } : v));
        setEditId(null);
      } else {
        const res = await youtubeService.add(formData);
        setVideos([{ id: res.id, ...formData, createdAt: { seconds: Date.now()/1000 } }, ...videos]);
      }
      setIsAdding(false);
      setFormData({ title: "", videoUrl: "", category: "VIDEOS", thumbnail: "", description: "" });
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    }
  };

  const handleEdit = (video: any) => {
    setFormData({ 
      title: video.title, 
      videoUrl: video.videoUrl, 
      category: video.category || "VIDEOS", 
      thumbnail: video.thumbnail || "",
      description: video.description || "" 
    });
    setEditId(video.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this entry?")) {
      await youtubeService.delete(id);
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">YouTube Hub</h1>
          <p className="text-gray-500">Manage your cinematic content and custom thumbnails.</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="px-6 py-3 bg-brand-primary text-black rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-primary/20">
            <Plus size={18} /> Add New Content
          </button>
        )}
      </header>

      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-dark p-8 rounded-[3rem] border border-brand-primary/30"
          >
            <form onSubmit={handleSave} className="grid grid-cols-1 xl:grid-cols-3 gap-12">
              
              {/* Thumbnail Upload Area */}
              <div className="xl:col-span-1 space-y-4">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Thumbnail Preview</label>
                 <div className="relative group aspect-video rounded-3xl overflow-hidden bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center hover:border-brand-primary transition-all">
                    {formData.thumbnail ? (
                      <Image src={formData.thumbnail} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="text-center p-6">
                        {isUploading ? (
                          <div className="animate-spin h-8 w-8 border-2 border-brand-primary border-t-transparent rounded-full mx-auto" />
                        ) : (
                          <>
                            <ImageIcon size={32} className="mx-auto mb-2 text-gray-600" />
                            <p className="text-[10px] text-gray-500 font-bold uppercase">Click to Upload</p>
                          </>
                        )}
                      </div>
                    )}
                    <input 
                      type="file" 
                      onChange={handleThumbnailUpload} 
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                      disabled={isUploading}
                    />
                 </div>
                 <p className="text-[10px] text-gray-600 text-center italic">Best size: 1280x720px (16:9)</p>
              </div>

              {/* Data Entry Area */}
              <div className="xl:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Video Title</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-brand-primary font-bold" placeholder="Give your video a hook..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">YouTube URL</label>
                    <input type="url" required value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-brand-primary" placeholder="Paste link here..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Section Classification</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: "VIDEOS", icon: Video },
                      { id: "SHORTS", icon: Zap },
                      { id: "LIVE", icon: Radio },
                      { id: "PLAYLIST", icon: ListVideo },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({...formData, category: type.id})}
                        className={`p-4 rounded-2xl border flex items-center justify-center gap-3 transition-all ${formData.category === type.id ? "bg-brand-primary border-brand-primary text-black font-bold" : "bg-white/5 border-white/10 text-gray-400 hover:text-white"}`}
                      >
                        <type.icon size={18} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">{type.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button type="submit" className="flex-1 py-4 bg-brand-primary text-black rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2">
                    <Save size={18} /> {editId ? "Update Content" : "Publish to Hub"}
                  </button>
                  <button type="button" onClick={() => { setIsAdding(false); setEditId(null); }} className="px-8 py-4 glass rounded-2xl font-bold text-gray-400">Cancel</button>
                </div>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
             <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Live Content Library ({videos.length})</h3>
                <div className="relative w-64 text-white">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white outline-none focus:border-brand-primary" />
                </div>
             </div>
             <div className="divide-y divide-white/5">
                {videos.filter(v => v.title.toLowerCase().includes(search.toLowerCase())).map((video) => (
                  <div key={video.id} className="p-6 flex items-center justify-between group hover:bg-white/[0.02]">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-16 rounded-xl bg-white/5 overflow-hidden border border-white/10 flex items-center justify-center text-brand-primary">
                        {video.thumbnail ? (
                          <Image src={video.thumbnail} alt="thumb" fill className="object-cover" />
                        ) : (
                          <FaYoutube size={24} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-white">{video.title}</p>
                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">{video.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(video)} className="p-3 text-gray-500 hover:text-white transition-colors"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(video.id)} className="p-3 text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

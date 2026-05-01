"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Download, 
  Trash2, 
  Edit2, 
  Search, 
  UploadCloud, 
  FileText, 
  FileArchive, 
  ImageIcon,
  X,
  Save,
  Lock,
  Unlock,
  Key
} from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

const initialAssets = [
  { id: 1, title: "Premium Branding Assets", type: "Asset Pack", format: "ZIP", size: "45 MB", downloads: "2.1K", isProtected: true, password: "AY1" },
  { id: 2, title: "Content Calendar 2026", type: "Template", format: "XLSX", size: "2.4 MB", downloads: "1.2K", isProtected: false },
  { id: 3, title: "Secret Growth Strategy", type: "Guide", format: "PDF", size: "12 MB", downloads: "450", isProtected: true, password: "GOLD" },
];

export default function AdminResourceManager() {
  const [assets, setAssets] = useState(initialAssets);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "", 
    type: "Template",
    isProtected: false,
    password: "" 
  });

  const filteredAssets = assets.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadToCloudinary(file);
      console.log("Uploaded:", url);
    } catch (error) {
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setAssets(assets.map(a => a.id === editId ? { ...a, ...formData } : a));
      setEditId(null);
    } else {
      const newAsset = {
        id: Date.now(),
        ...formData,
        format: "PDF",
        size: "1.0 MB",
        downloads: "0"
      };
      setAssets([newAsset, ...assets]);
    }
    setIsAdding(false);
    setFormData({ title: "", description: "", type: "Template", isProtected: false, password: "" });
  };

  const handleEdit = (asset: any) => {
    setFormData({ 
      title: asset.title, 
      description: "", 
      type: asset.type,
      isProtected: asset.isProtected || false,
      password: asset.password || "" 
    });
    setEditId(asset.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Resource Library</h1>
          <p className="text-gray-500">Upload and manage downloadable assets for your audience.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-brand-primary text-black rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
          >
            <Plus size={18} /> New Resource
          </button>
        )}
      </header>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-dark p-8 rounded-[3rem] border border-brand-primary/30"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-3">
                {formData.isProtected ? <Lock size={20} className="text-brand-primary" /> : <Plus size={20} className="text-brand-primary" />}
                {editId ? "Edit Resource" : "New Secure Resource"}
              </h3>
              <button onClick={() => {
                setIsAdding(false);
                setEditId(null);
              }} className="text-gray-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Asset Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Content Calendar 2026"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary transition-colors text-white"
                  />
                </div>
                
                {/* SECURITY TOGGLE */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${formData.isProtected ? 'bg-brand-primary text-black' : 'bg-white/5 text-gray-500'}`}>
                        <Lock size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Password Protect</p>
                        <p className="text-[10px] text-gray-500">Require a key to download</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, isProtected: !formData.isProtected})}
                      className={`w-12 h-6 rounded-full relative transition-colors ${formData.isProtected ? "bg-brand-primary" : "bg-white/10"}`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${formData.isProtected ? "left-6.5" : "left-0.5"}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {formData.isProtected && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 border-t border-white/5"
                      >
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Set Download Password</label>
                        <div className="relative">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                          <input 
                            type="text"
                            required={formData.isProtected}
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="e.g. ANKIT2026"
                            className="w-full bg-white/10 border border-brand-primary/20 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-brand-primary transition-colors text-white font-mono"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">File Source</label>
                  <div className="relative group">
                    <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" disabled={isUploading} />
                    <div className={`w-full h-32 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 bg-white/5 transition-all group-hover:bg-white/10`}>
                      <div className="p-3 rounded-full bg-brand-primary/10 text-brand-primary"><UploadCloud size={24} /></div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{isUploading ? "Uploading..." : "Select Resource File"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 py-4 bg-brand-primary text-black rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
                    <Save size={18} /> Save Resource
                  </button>
                  <button type="button" onClick={() => {
                    setIsAdding(false);
                    setEditId(null);
                  }} className="px-8 py-4 glass rounded-2xl font-bold text-gray-400">Discard</button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xl font-bold">Manage Assets ({assets.length})</h3>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-primary transition-colors text-white" />
          </div>
        </div>
        
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-gray-500 text-xs uppercase tracking-widest">
              <th className="px-8 py-4 font-bold">Asset</th>
              <th className="px-8 py-4 font-bold text-center">Security</th>
              <th className="px-8 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-500">
                      {asset.format === 'ZIP' ? <FileArchive size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{asset.title}</p>
                      <p className="text-[10px] text-gray-500">{asset.size} • {asset.downloads} Downloads</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  {asset.isProtected ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest border border-brand-primary/20">
                      <Lock size={12} /> Password Required
                    </span>
                  ) : (
                    <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Public</span>
                  )}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(asset)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"><Edit2 size={16} /></button>
                    <button onClick={() => setAssets(assets.filter(a => a.id !== asset.id))} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

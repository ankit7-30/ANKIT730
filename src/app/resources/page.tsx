"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  Search, 
  FileText, 
  FileArchive, 
  Lock,
  Unlock,
  Key,
  X,
  Share2
} from "lucide-react";
import { resourceService, settingsService } from "@/lib/services";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [resData, brandData] = await Promise.all([
        resourceService.getAll(),
        settingsService.get()
      ]);
      setResources(resData);
      setBrand(brandData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter(r => 
    r.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadClick = (resource: any) => {
    if (resource.isProtected) {
      setSelectedResource(resource);
      setPasswordInput("");
      setError(false);
    } else {
      window.open(resource.fileUrl, "_blank");
    }
  };

  const verifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === selectedResource.password) {
      window.open(selectedResource.fileUrl, "_blank");
      setSelectedResource(null);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto space-y-16">
        
          {brand?.resourceTitle && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4 mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                {brand.resourceTitle.split(" ").slice(0, -1).join(" ")} <span className="text-brand-primary">{brand.resourceTitle.split(" ").pop()}</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                {brand.resourceDesc}
              </p>
            </motion.div>
          )}


        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" placeholder="Search resources..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 outline-none focus:border-brand-primary transition-all text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-white/5 rounded-[2.5rem] animate-pulse" />
              ))
            ) : filteredResources.map((resource, i) => (
              <motion.div
                layout key={resource.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group relative glass-dark rounded-[2.5rem] border border-white/5 p-8 hover:border-brand-primary/30 transition-all hover:translate-y-[-5px]"
              >
                <div className="flex flex-col h-full gap-6">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                      <FileText size={28} />
                    </div>
                    {resource.isProtected && (
                      <div className="p-2 bg-brand-primary/10 rounded-full text-brand-primary border border-brand-primary/20"><Lock size={14} /></div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{resource.type}</p>
                  </div>

                  <button 
                    onClick={() => handleDownloadClick(resource)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 flex items-center justify-center gap-2 font-bold text-white hover:bg-brand-primary hover:text-black hover:border-brand-primary transition-all"
                  >
                    {resource.isProtected ? <Lock size={18} /> : <Download size={18} />}
                    {resource.isProtected ? "Unlock Securely" : "Download Now"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!loading && filteredResources.length === 0 && (
          <div className="py-40 text-center text-gray-500">No resources available right now.</div>
        )}
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-md glass-dark rounded-[3rem] border border-brand-primary/30 p-10 text-center space-y-8"
            >
              <button onClick={() => setSelectedResource(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={24} /></button>
              <div className="w-20 h-20 bg-brand-primary rounded-3xl flex items-center justify-center text-black mx-auto shadow-2xl shadow-brand-primary/20"><Lock size={32} /></div>
              <h3 className="text-2xl font-bold text-white">Enter Access Key</h3>
              <form onSubmit={verifyPassword} className="space-y-4">
                <input 
                  autoFocus type="password" value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password..."
                  className={`w-full bg-white/5 border rounded-2xl py-5 px-6 outline-none transition-all text-center font-mono tracking-widest text-white ${error ? 'border-red-500 animate-shake' : 'border-white/10 focus:border-brand-primary'}`}
                />
                <button type="submit" className="w-full bg-brand-primary text-black py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-3">
                  <Unlock size={22} /> Access Content
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

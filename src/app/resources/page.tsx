"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  Search, 
  FileText, 
  FileArchive, 
  ExternalLink,
  Lock,
  Unlock,
  Key,
  X,
  Share2
} from "lucide-react";

// Initial resources - In production, this would come from Firestore
const initialResources = [
  { id: 1, title: "Premium Branding Assets", type: "Asset Pack", format: "ZIP", size: "45 MB", isProtected: true, password: "AY1" },
  { id: 2, title: "Content Calendar 2026", type: "Template", format: "XLSX", size: "2.4 MB", isProtected: false },
  { id: 3, title: "Secret Growth Strategy", type: "Guide", format: "PDF", size: "12 MB", isProtected: true, password: "GOLD" },
  { id: 4, title: "E-mail Marketing Templates", type: "Template", format: "DOCX", size: "1.2 MB", isProtected: false },
];

export default function ResourcesPage() {
  const [resources] = useState(initialResources);
  const [search, setSearch] = useState("");
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);

  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadClick = (resource: any) => {
    if (resource.isProtected) {
      setSelectedResource(resource);
      setPasswordInput("");
      setError(false);
    } else {
      // Trigger normal download
      alert(`Downloading ${resource.title}...`);
    }
  };

  const verifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === selectedResource.password) {
      alert("Password Verified! Starting Download...");
      setSelectedResource(null);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Resource <span className="text-brand-primary">Library</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Exclusive templates, guides, and assets to help you scale your brand and mindset.
          </motion.p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-brand-primary/10 blur-xl group-hover:bg-brand-primary/20 transition-all rounded-full" />
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 outline-none focus:border-brand-primary transition-all text-lg"
            />
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredResources.map((resource, i) => (
              <motion.div
                layout
                key={resource.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group relative glass-dark rounded-[2.5rem] border border-white/5 p-8 hover:border-brand-primary/30 transition-all hover:translate-y-[-5px]"
              >
                <div className="flex flex-col h-full gap-6">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                      {resource.format === 'ZIP' ? <FileArchive size={28} /> : <FileText size={28} />}
                    </div>
                    {resource.isProtected && (
                      <div className="p-2 bg-brand-primary/10 rounded-full text-brand-primary border border-brand-primary/20">
                        <Lock size={14} />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{resource.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="font-mono">{resource.format}</span>
                      <span className="w-1 h-1 bg-gray-700 rounded-full" />
                      <span>{resource.size}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <button 
                      onClick={() => handleDownloadClick(resource)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 flex items-center justify-center gap-2 font-bold hover:bg-brand-primary hover:text-black hover:border-brand-primary transition-all group/btn"
                    >
                      {resource.isProtected ? <Lock size={18} /> : <Download size={18} />}
                      {resource.isProtected ? "Unlock Securely" : "Download Now"}
                    </button>
                    <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-brand-primary transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredResources.length === 0 && (
          <div className="py-40 text-center space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <Search size={32} className="text-gray-700" />
            </div>
            <p className="text-gray-500 text-xl">No resources found matching your search.</p>
          </div>
        )}

      </div>

      {/* Password Prompt Overlay */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedResource(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-dark rounded-[3rem] border border-brand-primary/30 p-10 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setSelectedResource(null)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-brand-primary rounded-3xl flex items-center justify-center text-black mx-auto shadow-2xl shadow-brand-primary/20">
                  <Lock size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Secure Download</h3>
                  <p className="text-gray-400 text-sm">Please enter the password provided in the video to unlock <span className="text-brand-primary font-bold">{selectedResource.title}</span>.</p>
                </div>

                <form onSubmit={verifyPassword} className="space-y-4">
                  <div className="relative">
                    <Key className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-500' : 'text-brand-primary'}`} size={20} />
                    <input 
                      autoFocus
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter password..."
                      className={`w-full bg-white/5 border rounded-2xl py-5 pl-14 pr-6 outline-none transition-all text-lg font-mono tracking-widest ${error ? 'border-red-500 bg-red-500/5 animate-shake' : 'border-white/10 focus:border-brand-primary'}`}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-brand-primary text-black py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                  >
                    <Unlock size={22} />
                    Access Resource
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

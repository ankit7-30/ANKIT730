"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Layout, 
  Shield, 
  FileText, 
  Code, 
  Type, 
  Save, 
  Info,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Palette,
  Zap,
  Globe,
  ImageIcon,
  BookOpen,
  Download,
  Settings
} from "lucide-react";
import { FaYoutube } from "react-icons/fa6";


export default function AdminPageManager() {
  const [activeTab, setActiveTab] = useState("hero"); // hero, legal, headlines, handbook
  const [success, setSuccess] = useState(false);
  const [editMode, setEditMode] = useState<"visual" | "html">("visual");

  // Page Headlines State
  const [headlines, setHeadlines] = useState({
    youtube: { title: "YouTube Channel", subtitle: "Deep dives into financial markets and growth mindset." },
    blog: { title: "The Blog", subtitle: "Insights, strategies, and stories from my journey." },
    resources: { title: "Resource Library", subtitle: "Exclusive templates and guides to help you scale." }
  });

  const [legalContent, setLegalContent] = useState({
    privacy: "<h1>Privacy Policy</h1><p>Your privacy is important to us...</p>",
    terms: "<h1>Terms of Service</h1><p>Rules of engagement for this platform...</p>"
  });

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-12 pb-24 text-white">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Page Content Manager</h1>
          <p className="text-gray-500">Manage visuals, headlines, and legal infrastructure.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
          {[
            { id: "hero", name: "Hero", icon: ImageIcon },
            { id: "headlines", name: "Headlines", icon: Type },
            { id: "legal", name: "Legal", icon: Shield },
            { id: "handbook", name: "Handbook", icon: Cpu },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? "bg-brand-primary text-black shadow-lg" : "text-gray-500 hover:text-white"}`}
            >
              <tab.icon size={14} />
              {tab.name}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            
            {/* HERO MANAGER */}
            {activeTab === "hero" && (
              <motion.section 
                key="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary"><Layout size={20} /></div>
                    <h3 className="text-xl font-bold">Homepage Hero Section</h3>
                  </div>
                  <button onClick={handleSave} className="px-6 py-2 bg-brand-primary text-black rounded-xl font-bold text-xs flex items-center gap-2">
                    <Save size={14} /> Save Hero
                  </button>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Current Brand Image</label>
                    <div className="aspect-square rounded-3xl overflow-hidden border-2 border-white/10 relative shadow-2xl">
                      <Image src="/images/ankit.png" alt="Hero" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-6">
                    <div className="p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-3xl">
                      <p className="text-sm font-bold text-brand-primary mb-2">Technical Dimension</p>
                      <p className="text-xs text-gray-400">1000x1000px (1:1 Square) for max sharpness.</p>
                    </div>
                    <button className="w-full py-12 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:border-brand-primary/30 transition-all group">
                      <ImageIcon size={32} className="text-gray-600 group-hover:text-brand-primary transition-colors" />
                      <span className="text-xs font-bold text-gray-500">Change Brand Photo</span>
                    </button>
                  </div>
                </div>
              </motion.section>
            )}

            {/* HEADLINES MANAGER */}
            {activeTab === "headlines" && (
              <motion.section 
                key="headlines"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary"><Type size={20} /></div>
                    <h3 className="text-xl font-bold">Page Header Content</h3>
                  </div>
                  <button onClick={handleSave} className="px-6 py-2 bg-brand-primary text-black rounded-xl font-bold text-xs flex items-center gap-2">
                    <Save size={14} /> Save Headlines
                  </button>
                </div>
                <div className="p-8 space-y-10">
                  {/* YouTube Headlines */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center"><FaYoutube size={20} /></div>
                      <span className="font-bold text-sm">YouTube</span>
                    </div>

                    <div className="md:col-span-3 space-y-4">
                      <input 
                        type="text" 
                        value={headlines.youtube.title}
                        onChange={(e) => setHeadlines({...headlines, youtube: {...headlines.youtube, title: e.target.value}})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-brand-primary text-sm font-bold"
                        placeholder="Page Title..."
                      />
                      <input 
                        type="text" 
                        value={headlines.youtube.subtitle}
                        onChange={(e) => setHeadlines({...headlines, youtube: {...headlines.youtube, subtitle: e.target.value}})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-brand-primary text-xs text-gray-400"
                        placeholder="Page Subtitle..."
                      />
                    </div>
                  </div>

                  {/* Blog Headlines */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center"><BookOpen size={20} /></div>
                      <span className="font-bold text-sm">Blog</span>
                    </div>
                    <div className="md:col-span-3 space-y-4">
                      <input 
                        type="text" 
                        value={headlines.blog.title}
                        onChange={(e) => setHeadlines({...headlines, blog: {...headlines.blog, title: e.target.value}})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-brand-primary text-sm font-bold"
                      />
                      <input 
                        type="text" 
                        value={headlines.blog.subtitle}
                        onChange={(e) => setHeadlines({...headlines, blog: {...headlines.blog, subtitle: e.target.value}})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-brand-primary text-xs text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Resource Headlines */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center"><Download size={20} /></div>
                      <span className="font-bold text-sm">Resources</span>
                    </div>
                    <div className="md:col-span-3 space-y-4">
                      <input 
                        type="text" 
                        value={headlines.resources.title}
                        onChange={(e) => setHeadlines({...headlines, resources: {...headlines.resources, title: e.target.value}})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-brand-primary text-sm font-bold"
                      />
                      <input 
                        type="text" 
                        value={headlines.resources.subtitle}
                        onChange={(e) => setHeadlines({...headlines, resources: {...headlines.resources, subtitle: e.target.value}})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-brand-primary text-xs text-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* LEGAL MANAGER */}
            {activeTab === "legal" && (
              <motion.section 
                key="legal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary"><Shield size={20} /></div>
                      <h3 className="text-xl font-bold">Legal Pages</h3>
                    </div>
                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                      <button onClick={() => setEditMode("visual")} className={`px-4 py-1 rounded-lg text-[10px] font-bold transition-all ${editMode === "visual" ? "bg-white/10 text-white" : "text-gray-500"}`}>Visual</button>
                      <button onClick={() => setEditMode("html")} className={`px-4 py-1 rounded-lg text-[10px] font-bold transition-all ${editMode === "html" ? "bg-brand-primary text-black shadow-lg" : "text-gray-500"}`}>HTML Code</button>
                    </div>
                  </div>
                  <button onClick={handleSave} className="px-6 py-2 bg-brand-primary text-black rounded-xl font-bold text-xs flex items-center gap-2">
                    <Save size={14} /> Save Legal
                  </button>
                </div>
                <div className="p-8 space-y-8">
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Privacy Policy</label>
                    <textarea 
                      value={legalContent.privacy}
                      onChange={(e) => setLegalContent({...legalContent, privacy: e.target.value})}
                      className="w-full h-48 bg-black/50 border border-white/10 rounded-2xl p-6 text-sm text-gray-300 outline-none focus:border-brand-primary transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Terms of Service</label>
                    <textarea 
                      value={legalContent.terms}
                      onChange={(e) => setLegalContent({...legalContent, terms: e.target.value})}
                      className="w-full h-48 bg-black/50 border border-white/10 rounded-2xl p-6 text-sm text-gray-300 outline-none focus:border-brand-primary transition-all font-mono"
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {/* HANDBOOK */}
            {activeTab === "handbook" && (
              <motion.section 
                key="handbook"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary"><Cpu size={20} /></div>
                    <h3 className="text-xl font-bold">Brand & Technical Handbook</h3>
                  </div>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-6">
                    <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                      <h4 className="flex items-center gap-2 font-bold mb-4 text-brand-primary"><Palette size={16} /> Color System</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs"><span className="text-gray-500">Primary Amber</span><span>#f59e0b</span></div>
                        <div className="flex justify-between font-mono text-xs"><span className="text-gray-500">Dark BG</span><span>#171717</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-3xl space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-brand-primary"><Zap size={16} /> AI Writing Guideline</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      To keep themes consistent, tell your AI agent to use <code className="text-brand-primary">text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-amber-200</code> for main titles.
                    </p>
                  </div>
                </div>
              </motion.section>
            )}

          </AnimatePresence>
        </div>

        {/* SIDEBAR STATUS */}
        <div className="space-y-8">
          <div className="glass-dark p-8 rounded-[3rem] border border-white/5 space-y-6">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">System Status</h4>
             </div>
             {success && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-500"
               >
                 <CheckCircle2 size={16} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Saved Successfully</span>
               </motion.div>
             )}
             <div className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-600">
               <div className="flex justify-between"><span>Page Engine</span><span className="text-white">Active</span></div>
               <div className="flex justify-between"><span>Theme Sync</span><span className="text-white">Verified</span></div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

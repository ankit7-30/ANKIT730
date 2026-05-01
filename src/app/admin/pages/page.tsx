"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Save, 
  CheckCircle2,
  Cpu,
  ImageIcon,
  UploadCloud,
  AtSign,
  User,
  Loader2,
  Zap,
  BookOpen,
  Download
} from "lucide-react";

import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaShield, FaFileContract } from "react-icons/fa6";


import { settingsService, MASTER_SETTINGS_ID } from "@/lib/services";

import { uploadToCloudinary } from "@/lib/cloudinary";

export default function AdminPageManager() {
  const [activeTab, setActiveTab] = useState("hero"); 
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isHeroUploading, setIsHeroUploading] = useState(false);

  const [brand, setBrand] = useState({
    id: "",
    heroImage: "",
    heroTag: "",
    heroHeadline: "",

    heroSubheadline: "",
    heroCtaText: "",
    
    badgeNumber: "",
    badgeText: "",

    pillarsTitle: "",
    pillarsDesc: "",
    
    pillar1Title: "", pillar1Desc: "",
    pillar2Title: "", pillar2Desc: "",
    pillar3Title: "", pillar3Desc: "",
    pillar4Title: "", pillar4Desc: "",

    blogTitle: "",
    blogDesc: "",
    
    resourceTitle: "",
    resourceDesc: "",

    ytChannelName: "",
    ytHandle: "",
    ytAvatar: "",
    ytLink: "",

    footerBio: "",
    socialYoutube: "",
    socialInstagram: "",
    socialTwitter: "",
    socialLinkedin: "",

    // Legal Content
    privacyIntro: "",
    privacyCollect: "",
    privacySecurity: "",
    privacyCookies: "",

    termsIntro: "",
    termsOwnership: "",
    termsUsage: "",
    termsDisclaimer: ""
  });




  useEffect(() => {
    loadBrand();
  }, []);

  const loadBrand = async () => {
    const data = await settingsService.get() as any;
    if (data) {
      setBrand({
        ...brand,
        ...data,
        id: data.id
      });
    }
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsHeroUploading(true);
      const url = await uploadToCloudinary(file, "ankit_branding");
      setBrand({...brand, heroImage: url});
    } catch (err) {
      alert("Hero upload failed.");
    } finally {
      setIsHeroUploading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadToCloudinary(file, "ankit_branding");
      setBrand({...brand, ytAvatar: url});
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      await settingsService.update(MASTER_SETTINGS_ID, brand);


      
      // Silent refresh to ensure local state is 100% synced with Cloud
      await loadBrand();
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Firebase Save Error:", err);
      alert(`Save failed: ${err.message || "Unknown error"}. Check your Firestore Security Rules.`);
    }
  };


  return (
    <div className="space-y-12 pb-24 text-white">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Page Cust</h1>
          <p className="text-gray-500">Universal content control for your entire platform.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
          {[
            { id: "hero", name: "Hero", icon: ImageIcon },
            { id: "pillars", name: "Pillars", icon: Zap },
            { id: "pages", name: "Pages", icon: BookOpen },
            { id: "yt_brand", name: "YT Brand", icon: FaYoutube },
            { id: "footer", name: "Footer", icon: AtSign },
            { id: "legal", name: "Legal", icon: FaShield },

          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? "bg-brand-primary text-black shadow-lg" : "text-gray-500 hover:text-white"}`}
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
              <motion.section key="hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Homepage Hero Section</h3>
                  <button onClick={handleSave} className="px-6 py-2 bg-brand-primary text-black rounded-xl font-bold text-xs flex items-center gap-2"><Save size={14} /> Save Changes</button>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
                   <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Hero Image</label>
                        <div className="aspect-square bg-white/5 rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
                            {isHeroUploading && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                                <Loader2 className="w-8 h-8 text-brand-primary animate-spin mb-2" />
                                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">Uploading...</p>
                              </div>
                            )}
                            {brand.heroImage ? (
                              <img src={brand.heroImage} alt="Hero" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
                                <ImageIcon size={64} className="mb-2" />
                              </div>
                            )}
                            <input type="file" onChange={handleHeroUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" disabled={isHeroUploading} />
                        </div>
                     </div>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Hero Top Tag</label>
                        <input 
                          type="text" value={brand.heroTag} 
                          onChange={(e) => setBrand({...brand, heroTag: e.target.value})}
                          placeholder="e.g. Mastering The Digital Era"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-brand-primary font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Headline Name</label>
                        <input 
                          type="text" value={brand.heroHeadline} 
                          onChange={(e) => setBrand({...brand, heroHeadline: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Subheadline / Bio</label>
                        <textarea 
                          rows={4} value={brand.heroSubheadline} 
                          onChange={(e) => setBrand({...brand, heroSubheadline: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm leading-relaxed resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">CTA Button Text</label>
                        <input 
                          type="text" value={brand.heroCtaText} 
                          onChange={(e) => setBrand({...brand, heroCtaText: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white font-bold"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Badge Number</label>
                           <input type="text" value={brand.badgeNumber} onChange={(e) => setBrand({...brand, badgeNumber: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-brand-primary font-black" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Badge Label</label>
                           <input type="text" value={brand.badgeText} onChange={(e) => setBrand({...brand, badgeText: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-[10px] font-bold uppercase" />
                        </div>
                      </div>
                   </div>

                </div>
              </motion.section>
            )}


            {/* PILLARS MANAGER */}
            {activeTab === "pillars" && (
              <motion.section key="pillars" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Growth Pillars Control</h3>
                  <button onClick={handleSave} className="px-6 py-2 bg-brand-primary text-black rounded-xl font-bold text-xs flex items-center gap-2"><Save size={14} /> Save Strategy</button>
                </div>
                <div className="p-8 space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Section Title</label>
                        <input type="text" value={brand.pillarsTitle} onChange={(e) => setBrand({...brand, pillarsTitle: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white font-bold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Section Description</label>
                        <input type="text" value={brand.pillarsDesc} onChange={(e) => setBrand({...brand, pillarsDesc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[1, 2, 3, 4].map(num => (
                        <div key={num} className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 space-y-4">
                           <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">Pillar {num}</p>
                           <input 
                              type="text" 
                              value={(brand as any)[`pillar${num}Title`]} 
                              onChange={(e) => setBrand({...brand, [`pillar${num}Title`]: e.target.value})}
                              placeholder="Title"
                              className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-brand-primary text-white font-bold"
                           />
                           <textarea 
                              rows={2}
                              value={(brand as any)[`pillar${num}Desc`]} 
                              onChange={(e) => setBrand({...brand, [`pillar${num}Desc`]: e.target.value})}
                              placeholder="Description"
                              className="w-full bg-transparent py-2 outline-none text-gray-400 text-xs leading-relaxed resize-none"
                           />
                        </div>
                      ))}
                   </div>
                </div>
              </motion.section>
            )}

            {/* PAGES MANAGER */}
            {activeTab === "pages" && (
              <motion.section key="pages" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Secondary Pages Control</h3>
                  <button onClick={handleSave} className="px-6 py-2 bg-brand-primary text-black rounded-xl font-bold text-xs flex items-center gap-2"><Save size={14} /> Save Content</button>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6 p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5">
                      <h4 className="font-bold text-brand-primary flex items-center gap-2"><BookOpen size={18} /> Blog Hub</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Main Title</label>
                           <input type="text" value={brand.blogTitle} onChange={(e) => setBrand({...brand, blogTitle: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white font-bold" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Tagline</label>
                           <input type="text" value={brand.blogDesc} onChange={(e) => setBrand({...brand, blogDesc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                        </div>
                      </div>
                   </div>
                   <div className="space-y-6 p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5">
                      <h4 className="font-bold text-brand-primary flex items-center gap-2"><Download size={18} /> Resources Hub</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Main Title</label>
                           <input type="text" value={brand.resourceTitle} onChange={(e) => setBrand({...brand, resourceTitle: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white font-bold" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Tagline</label>
                           <input type="text" value={brand.resourceDesc} onChange={(e) => setBrand({...brand, resourceDesc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                        </div>
                      </div>
                   </div>
                </div>
              </motion.section>
            )}

            {/* YT BRANDING */}
            {activeTab === "yt_brand" && (
              <motion.section key="yt_brand" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 text-red-500 rounded-xl"><FaYoutube size={20} /></div>
                    <h3 className="text-xl font-bold">YouTube Branding</h3>
                  </div>
                  <button onClick={handleSave} className="px-6 py-2 bg-brand-primary text-black rounded-xl font-bold text-xs flex items-center gap-2"><Save size={14} /> Save Brand</button>
                </div>
                
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Channel Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input 
                            type="text" value={brand.ytChannelName} 
                            onChange={(e) => setBrand({...brand, ytChannelName: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-brand-primary text-white font-bold"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Channel Handle</label>
                        <div className="relative">
                          <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input 
                            type="text" value={brand.ytHandle} 
                            onChange={(e) => setBrand({...brand, ytHandle: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-brand-primary text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Channel Link</label>
                        <input 
                          type="url" value={brand.ytLink} 
                          onChange={(e) => setBrand({...brand, ytLink: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm"
                        />
                      </div>
                   </div>

                   <div className="space-y-6 text-center">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 block text-left">Channel Avatar</label>
                      <div className="relative group w-40 h-40 mx-auto">
                         <input type="file" onChange={handleAvatarUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" disabled={isUploading} />
                         <div className="w-full h-full rounded-full border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center overflow-hidden transition-all group-hover:border-brand-primary">
                            {brand.ytAvatar ? (
                              <img src={brand.ytAvatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-center p-4">
                                {isUploading ? <Loader2 className="w-6 h-6 text-brand-primary animate-spin mx-auto" /> : <UploadCloud size={24} className="mx-auto mb-2 text-gray-500" />}
                              </div>
                            )}
                         </div>
                      </div>
                      <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/20">
                         <div className="inline-flex bg-[#f00] text-white px-8 py-2 rounded-full text-sm font-black uppercase">Subscribe</div>
                      </div>
                   </div>
                </div>
              </motion.section>
            )}

            {/* FOOTER MANAGER */}
            {activeTab === "footer" && (
              <motion.section key="footer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Footer & Socials Control</h3>
                  <button onClick={handleSave} className="px-6 py-2 bg-brand-primary text-black rounded-xl font-bold text-xs flex items-center gap-2"><Save size={14} /> Save Footer</button>
                </div>
                <div className="p-8 space-y-8">
                   <div className="space-y-4">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Footer Bio / Description</label>
                      <textarea 
                        rows={3} value={brand.footerBio} 
                        onChange={(e) => setBrand({...brand, footerBio: e.target.value})}
                        placeholder="Official platform of Ankit Yadav..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm leading-relaxed resize-none"
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2"><FaYoutube className="text-red-500" /> YouTube Link</label>
                        <input type="text" value={brand.socialYoutube} onChange={(e) => setBrand({...brand, socialYoutube: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-xs" placeholder="https://youtube.com/..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2"><FaInstagram className="text-pink-500" /> Instagram Link</label>
                        <input type="text" value={brand.socialInstagram} onChange={(e) => setBrand({...brand, socialInstagram: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-xs" placeholder="https://instagram.com/..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2"><FaTwitter className="text-sky-500" /> Twitter Link</label>
                        <input type="text" value={brand.socialTwitter} onChange={(e) => setBrand({...brand, socialTwitter: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-xs" placeholder="https://twitter.com/..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2"><FaLinkedin className="text-blue-600" /> LinkedIn Link</label>
                        <input type="text" value={brand.socialLinkedin} onChange={(e) => setBrand({...brand, socialLinkedin: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-xs" placeholder="https://linkedin.com/in/..." />
                      </div>
                   </div>
                </div>
              </motion.section>
            )}

            {/* LEGAL MANAGER */}
            {activeTab === "legal" && (
              <motion.section key="legal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Legal Documents Control</h3>
                  <button onClick={handleSave} className="px-6 py-2 bg-brand-primary text-black rounded-xl font-bold text-xs flex items-center gap-2"><Save size={14} /> Save Documents</button>
                </div>
                <div className="p-8 space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* PRIVACY POLICY */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 p-4 bg-brand-primary/5 rounded-2xl border border-brand-primary/20">
                        <FaShield className="text-brand-primary" />

                        <h4 className="font-bold">Privacy Policy Sections</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Intro Text</label>
                          <textarea rows={3} value={brand.privacyIntro} onChange={(e) => setBrand({...brand, privacyIntro: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">What I Collect</label>
                          <textarea rows={4} value={brand.privacyCollect} onChange={(e) => setBrand({...brand, privacyCollect: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Data Security</label>
                          <textarea rows={3} value={brand.privacySecurity} onChange={(e) => setBrand({...brand, privacySecurity: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Cookies Policy</label>
                          <textarea rows={3} value={brand.privacyCookies} onChange={(e) => setBrand({...brand, privacyCookies: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                        </div>
                      </div>
                    </div>

                    {/* TERMS OF SERVICE */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 p-4 bg-brand-primary/5 rounded-2xl border border-brand-primary/20">
                        <FaFileContract className="text-brand-primary" />
                        <h4 className="font-bold">Terms of Service Sections</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Intro Text</label>
                          <textarea rows={3} value={brand.termsIntro} onChange={(e) => setBrand({...brand, termsIntro: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Content Ownership</label>
                          <textarea rows={4} value={brand.termsOwnership} onChange={(e) => setBrand({...brand, termsOwnership: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Resource Usage</label>
                          <textarea rows={3} value={brand.termsUsage} onChange={(e) => setBrand({...brand, termsUsage: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Disclaimer</label>
                          <textarea rows={3} value={brand.termsDisclaimer} onChange={(e) => setBrand({...brand, termsDisclaimer: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary text-white text-sm" />
                        </div>
                      </div>
                    </div>
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
               <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Cloud Sync Active</h4>
             </div>
             {success && (
               <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-500">
                 <CheckCircle2 size={16} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Content Saved</span>
               </motion.div>
             )}
             <div className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-600">
               <div className="flex justify-between"><span>Region</span><span className="text-white">Global</span></div>
               <div className="flex justify-between"><span>Status</span><span className="text-white font-black text-brand-primary">MASTER</span></div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}


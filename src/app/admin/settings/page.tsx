"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, 
  User, 
  Globe, 
  Shield, 
  Bell,
  CheckCircle2,
  Key,
  Smartphone,
  Mail,
  Zap,
  Camera,
  Download
} from "lucide-react";

import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { settingsService, MASTER_SETTINGS_ID } from "@/lib/services";


export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dbId, setDbId] = useState("");

  const [profile, setProfile] = useState({
    name: "Ankit Yadav",
    email: "admin@ankityadav.com",
    role: "Full Access Administrator",
    avatar: "AY"
  });

  const [links, setLinks] = useState({
    youtube: "",
    instagram: "",
    twitter: "",
    linkedin: ""
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await settingsService.get();
    if (data) {
      setDbId(data.id);
      setLinks({
        youtube: data.socialYoutube || "",
        instagram: data.socialInstagram || "",
        twitter: data.socialTwitter || "",
        linkedin: data.socialLinkedin || ""
      });
      if (data.heroHeadline) setProfile(prev => ({ ...prev, name: data.heroHeadline }));
      if (data.adminEmail) setProfile(prev => ({ ...prev, email: data.adminEmail }));
    }
  };

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: "24h"
  });

  const [notifications, setNotifications] = useState({
    newComments: true,
    systemUpdates: false,
    resourceDownloads: true,
    securityAlerts: true
  });

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updateData = {
        socialYoutube: links.youtube,
        socialInstagram: links.instagram,
        socialTwitter: links.twitter,
        socialLinkedin: links.linkedin,
        heroHeadline: profile.name, // Keep name in sync
        adminEmail: profile.email // NEW: Persist email to cloud
      };

      await settingsService.update(MASTER_SETTINGS_ID, updateData);


      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Cloud save failed. Check your connection.");
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="space-y-12 pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Platform Settings</h1>
          <p className="text-gray-500">Configure your global brand identity and admin preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 bg-brand-primary text-black rounded-xl font-bold flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 relative overflow-hidden"
        >
          {isSaving ? "Saving..." : <><Save size={18} /> Save Changes</>}
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ y: 50 }} 
                animate={{ y: 0 }} 
                exit={{ y: -50 }}
                className="absolute inset-0 bg-green-500 flex items-center justify-center text-white"
              >
                <CheckCircle2 size={18} className="mr-2" /> Saved!
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Settings Nav */}
        <aside className="w-full lg:w-64 space-y-2">
          {[
            { id: "profile", label: "Profile Info", icon: User },
            { id: "social", label: "Social Links", icon: Globe },
            { id: "security", label: "Security", icon: Shield },
            { id: "notifications", label: "Notifications", icon: Bell },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-sm transition-all border ${
                activeTab === tab.id 
                  ? "bg-brand-primary/10 border-brand-primary text-brand-primary" 
                  : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="glass-dark p-8 md:p-12 rounded-[3rem] border border-white/5 min-h-[600px]">
            
            {/* PROFILE SECTION */}
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                <div className="flex items-center gap-6 pb-10 border-b border-white/5">
                  <div className="w-24 h-24 bg-brand-primary rounded-3xl flex items-center justify-center text-3xl font-bold text-black relative group cursor-pointer shadow-2xl shadow-brand-primary/20">
                    {profile.avatar}
                    <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{profile.name}</h3>
                    <p className="text-brand-primary text-sm font-bold flex items-center gap-2">
                      <Zap size={14} fill="currentColor" /> {profile.role}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-brand-primary transition-colors font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-brand-primary transition-colors font-medium"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* SOCIAL LINKS SECTION */}
            {activeTab === "social" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { id: "youtube", label: "YouTube Channel", icon: FaYoutube, color: "text-red-500", bg: "bg-red-500/10" },
                    { id: "instagram", label: "Instagram Profile", icon: FaInstagram, color: "text-pink-500", bg: "bg-pink-500/10" },
                    { id: "twitter", label: "Twitter (X)", icon: FaTwitter, color: "text-sky-500", bg: "bg-sky-500/10" },
                    { id: "linkedin", label: "LinkedIn Profile", icon: FaLinkedin, color: "text-blue-500", bg: "bg-blue-500/10" },
                  ].map(social => (
                    <div key={social.id} className="group relative">
                      <div className={`absolute inset-y-0 left-0 w-16 flex items-center justify-center ${social.bg} rounded-l-2xl border-r border-white/5`}>
                        <social.icon size={24} className={social.color} />
                      </div>
                      <div className="pl-20 pr-6 py-6 bg-white/5 border border-white/10 rounded-2xl group-within:border-brand-primary transition-colors">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{social.label}</p>
                        <input 
                          type="text" 
                          value={(links as any)[social.id]}
                          onChange={(e) => setLinks({...links, [social.id]: e.target.value})}
                          className="w-full bg-transparent text-white font-medium outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SECURITY SECTION */}
            {activeTab === "security" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-3xl p-8 flex items-center gap-6">
                  <div className="p-4 bg-brand-primary rounded-2xl text-black">
                    <Smartphone size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">Two-Factor Authentication</h4>
                    <p className="text-gray-400 text-sm">Add an extra layer of security to your admin account.</p>
                  </div>
                  <button 
                    onClick={() => setSecurity({...security, twoFactor: !security.twoFactor})}
                    className={`w-14 h-8 rounded-full relative transition-colors ${security.twoFactor ? "bg-brand-primary" : "bg-white/10"}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${security.twoFactor ? "left-7" : "left-1"}`} />
                  </button>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold flex items-center gap-2"><Key size={18} className="text-brand-primary" /> Password Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-brand-primary transition-colors group">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Last Changed</p>
                      <p className="font-medium group-hover:text-brand-primary transition-colors">May 01, 2026</p>
                    </button>
                    <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-brand-primary transition-colors group">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Session Timeout</p>
                      <p className="font-medium group-hover:text-brand-primary transition-colors">After 24 hours</p>
                    </button>
                  </div>
                  <button className="w-full p-4 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-2xl font-bold hover:bg-brand-primary/20 transition-all">
                    Reset Security Keys
                  </button>
                </div>
              </motion.div>
            )}

            {/* NOTIFICATIONS SECTION */}
            {activeTab === "notifications" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                {[
                  { id: "newComments", label: "New Blog Comments", desc: "Get notified when someone leaves a comment on your posts.", icon: Mail },
                  { id: "resourceDownloads", label: "Resource Activity", desc: "Weekly report of how many people downloaded your files.", icon: Download },
                  { id: "securityAlerts", label: "Security Alerts", desc: "Instant notification of new logins or security changes.", icon: Shield },
                  { id: "systemUpdates", label: "System Updates", desc: "Beta features and platform maintenance notifications.", icon: Zap },
                ].map(item => (
                  <div key={item.id} className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-primary/30 transition-all">
                    <div className="p-4 bg-white/5 rounded-2xl text-brand-primary">
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{item.label}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => setNotifications({...notifications, [item.id]: !(notifications as any)[item.id]})}
                      className={`w-12 h-6 rounded-full relative transition-colors ${(notifications as any)[item.id] ? "bg-brand-primary" : "bg-white/10"}`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${(notifications as any)[item.id] ? "left-6.5" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

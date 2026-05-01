"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Search, Video, Zap, Radio, ListVideo } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import { youtubeService, settingsService } from "@/lib/services";

export default function YoutubePage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [brand, setBrand] = useState<any>({
    ytChannelName: "",
    ytHandle: "",
    ytAvatar: "",
    ytLink: "#"
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("VIDEOS");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [videoData, brandData] = await Promise.all([
        youtubeService.getAll(),
        settingsService.get()
      ]);
      setVideos(videoData);
      if (brandData) setBrand(brandData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "VIDEOS", label: "Videos", icon: Video },
    { id: "SHORTS", label: "Shorts", icon: Zap },
    { id: "LIVE", label: "Live", icon: Radio },
    { id: "PLAYLIST", label: "Playlists", icon: ListVideo },
  ];

  const getFilteredAndSortedVideos = () => {
    let filtered = videos.filter(v => 
      (v.category === activeTab) && 
      v.title?.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === "Newest") {
      return [...filtered].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    } else {
      return [...filtered].sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
    }
  };

  const displayVideos = getFilteredAndSortedVideos();

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Channel Branding */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/5 bg-white/5 shrink-0 shadow-2xl relative group">
            {brand.ytAvatar ? (
              <Image 
                src={brand.ytAvatar} 
                alt="Channel" 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-primary bg-brand-primary/10">
                <FaYoutube size={64} />
              </div>
            )}
          </div>
          <div className="text-center md:text-left flex-1 space-y-4">
            <div className="space-y-1">
              {loading ? (
                <>
                  <div className="h-10 w-64 bg-white/5 rounded-xl animate-pulse mb-2" />
                  <div className="h-6 w-32 bg-white/5 rounded-lg animate-pulse" />
                </>
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">{brand.ytChannelName}</h1>
                  <p className="text-gray-500 font-bold text-lg">{brand.ytHandle}</p>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a 
                href={brand.ytLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#f00] hover:bg-[#c00] text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl shadow-red-600/20 active:scale-95"
              >
                Subscribe
              </a>
            </div>

          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-white/10">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 text-sm font-bold tracking-tight transition-all relative whitespace-nowrap ${activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-white"}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="ytActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Controls */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-3">
            {["Newest", "Oldest"].map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-6 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${sortBy === sort ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
              >
                {sort}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" placeholder="Search your favorite content..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 outline-none focus:border-brand-primary text-sm transition-all"
            />
          </div>
        </div>

        {/* Dynamic Content Grid */}
        <div className={`grid gap-x-6 gap-y-10 ${activeTab === "SHORTS" ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
          <AnimatePresence mode="popLayout">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`bg-white/5 rounded-3xl animate-pulse ${activeTab === "SHORTS" ? "aspect-[9/16]" : "aspect-video"}`} />
              ))
            ) : displayVideos.map((video, i) => (
              <motion.div
                layout key={video.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className={`relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 group-hover:border-brand-primary/50 transition-all mb-4 ${activeTab === "SHORTS" ? "aspect-[9/16]" : "aspect-video"}`}>
                  
                  {/* Thumbnail Logic */}
                  {video.thumbnail ? (
                    <Image 
                      src={video.thumbnail} 
                      alt={video.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent flex items-center justify-center">
                      <FaYoutube size={activeTab === "SHORTS" ? 48 : 64} className="text-white/10 group-hover:text-brand-primary/20 transition-all" />
                    </div>
                  )}

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 backdrop-blur-[2px]">
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-brand-primary rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </a>
                  </div>
                </div>
                <div className="px-2 space-y-1">
                  <h3 className={`font-bold line-clamp-2 group-hover:text-brand-primary transition-colors ${activeTab === "SHORTS" ? "text-sm" : "text-lg leading-snug"}`}>{video.title}</h3>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-primary" />
                    {video.createdAt?.seconds ? new Date(video.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Just now"}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!loading && displayVideos.length === 0 && (
          <div className="py-40 text-center text-gray-500">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaYoutube size={40} className="text-gray-800" />
             </div>
             <p className="text-xl font-bold text-white">Section is currently empty.</p>
             <p className="text-sm mt-1">Visit your admin panel to add some fresh content!</p>
          </div>
        )}

      </div>
    </main>
  );
}

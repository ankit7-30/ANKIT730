"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Plus, 
  ArrowUpRight, 
  BookOpen,
  Download,
  Eye,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { 
  subscriberService, 
  blogService, 
  youtubeService, 
  resourceService 
} from "@/lib/services";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    views: "0",
    subs: 0,
    resources: 0,
    blogs: 0
  });
  const [recentSubs, setRecentSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [allSubs, allBlogs, allResources, allVideos] = await Promise.all([
        subscriberService.getAll(),
        blogService.getAll(),
        resourceService.getAll(),
        youtubeService.getAll()
      ]);

      setStats({
        views: "0", // Starts from zero for the new launch
        subs: allSubs.length,

        resources: allResources.length,
        blogs: allBlogs.length
      });

      setRecentSubs(allSubs.slice(0, 5));
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { name: "Total Site Views", value: stats.views, icon: Eye, color: "text-blue-500", trend: "+100%" },
    { name: "Newsletter Subs", value: stats.subs.toString(), icon: Users, color: "text-green-500", trend: `+${stats.subs}` },
    { name: "Active Resources", value: stats.resources.toString(), icon: Download, color: "text-brand-primary", trend: "Live" },
    { name: "Published Blogs", value: stats.blogs.toString(), icon: BookOpen, color: "text-purple-500", trend: "Sync" },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Welcome Back, Ankit.</h1>
          <p className="text-gray-500">Your live platform stats are synced with Firebase.</p>
        </div>
        <Link 
          href="/admin/blog"
          className="px-6 py-3 bg-brand-primary text-black rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
        >
          <Plus size={18} /> Quick Post
        </Link>
      </header>

      {/* Real Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-dark p-6 rounded-3xl border border-white/5 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-widest">
                {stat.trend}
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-white">{loading ? "..." : stat.value}</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.name}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Real-time Health */}
        <div className="glass-dark p-8 rounded-[3.5rem] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Sync Status</h3>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
              <CheckCircle2 size={12} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live Cloud Connection</span>
            </div>
          </div>
          <div className="space-y-6">
             <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl"><BookOpen size={20} /></div>
                  <div>
                    <p className="font-bold text-sm text-white">Firestore Database</p>
                    <p className="text-xs text-gray-500">Articles & Subscribers Syncing</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
             </div>
             <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl"><Download size={20} /></div>
                  <div>
                    <p className="font-bold text-sm text-white">Cloudinary Vault</p>
                    <p className="text-xs text-gray-500">Image Assets Securely Linked</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
             </div>
          </div>
        </div>

        {/* Real-time Signups */}
        <div className="glass-dark p-8 rounded-[3.5rem] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Live Audience</h3>
            <Link href="/admin/subscribers" className="text-xs text-brand-primary font-bold uppercase tracking-widest hover:underline">Manage All</Link>
          </div>
          <div className="space-y-5">
            {loading ? (
              <div className="py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">Pulsing Cloud Data...</div>
            ) : recentSubs.length === 0 ? (
              <div className="py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">Waiting for your first fan!</div>
            ) : recentSubs.map((sub, i) => (
              <motion.div 
                key={sub.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5"
              >
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs">
                  {sub.name?.charAt(0) || "S"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white truncate">{sub.email}</p>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Subscriber Joined</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                  Live
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

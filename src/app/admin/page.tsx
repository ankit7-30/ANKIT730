"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  FileText, 
  MessageSquare, 
  Plus, 
  ArrowUpRight, 
  BookOpen,
  Download,
  Eye
} from "lucide-react";
import { FaYoutube } from "react-icons/fa6";

import Link from "next/link";
import { 
  subscriberService, 
  blogService, 
  youtubeService, 
  resourceService 
} from "@/lib/services";

export default function AdminDashboard() {
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
        views: "0", // Starting point for new launch
        subs: allSubs.length,

        resources: allResources.length,
        blogs: allBlogs.length
      });

      setRecentSubs(allSubs.slice(0, 3));
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Total Site Views", value: stats.views, icon: Eye, trend: "+100%", color: "text-blue-500" },
    { label: "Newsletter Subs", value: stats.subs.toString(), icon: Users, trend: `+${stats.subs}`, color: "text-green-500" },
    { label: "Active Resources", value: stats.resources.toString(), icon: Download, trend: "Live", color: "text-brand-primary" },
    { label: "Total Articles", value: stats.blogs.toString(), icon: BookOpen, trend: "Published", color: "text-purple-500" },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Welcome Back, Ankit.</h1>
          <p className="text-gray-500">Here&apos;s what&apos;s happening across your platform today.</p>
        </div>
        <Link 
          href="/admin/blog"
          className="px-6 py-3 bg-brand-primary text-black rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
        >
          <Plus size={18} /> Quick Post
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark p-6 rounded-3xl border border-white/5 relative overflow-hidden group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-white">{loading ? "..." : stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Content */}
        <div className="glass-dark rounded-[2.5rem] border border-white/5 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Platform Health</h3>
            <span className="text-xs text-brand-primary font-bold uppercase tracking-widest">Real-time</span>
          </div>
          <div className="space-y-6">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center"><BookOpen size={18} /></div>
                  <div>
                    <p className="font-bold text-sm text-white">Articles Database</p>
                    <p className="text-xs text-gray-500">Connected to Firestore</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-gray-600 group-hover:text-brand-primary transition-colors" />
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center"><Download size={18} /></div>
                  <div>
                    <p className="font-bold text-sm text-white">Cloud Assets</p>
                    <p className="text-xs text-gray-500">Synced with Cloudinary</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-gray-600 group-hover:text-brand-primary transition-colors" />
             </div>
          </div>
        </div>

        {/* Recent Signups */}
        <div className="glass-dark rounded-[2.5rem] border border-white/5 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Latest Newsletter Signups</h3>
            <Link href="/admin/subscribers" className="text-xs text-brand-primary font-bold uppercase tracking-widest hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="py-10 text-center text-gray-500 text-sm">Fetching real audience data...</div>
            ) : recentSubs.length === 0 ? (
              <div className="py-10 text-center text-gray-500 text-sm">No subscribers yet. Time to market!</div>
            ) : recentSubs.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-black flex items-center justify-center font-bold text-xs uppercase">
                    {sub.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{sub.email}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Joined Recently</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

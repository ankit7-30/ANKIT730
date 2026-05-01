"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Eye, 
  Users, 
  MessageSquare,
  ArrowUpRight,
  Plus
} from "lucide-react";

const stats = [
  { name: "Total Site Views", value: "45.2K", change: "+12%", icon: Eye, color: "text-blue-500" },
  { name: "Newsletter Subs", value: "2,840", change: "+5.4%", icon: Users, color: "text-green-500" },
  { name: "Active Resources", value: "12", change: "0%", icon: TrendingUp, color: "text-purple-500" },
  { name: "Unread Messages", value: "8", change: "+2", icon: MessageSquare, color: "text-brand-primary" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back, Ankit.</h1>
          <p className="text-gray-500">Here&apos;s what&apos;s happening across your platform today.</p>

        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-brand-primary rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
            <Plus size={18} />
            Quick Post
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-dark p-6 rounded-3xl border border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{stat.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Mockup */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5">
          <h3 className="text-xl font-bold mb-8">Recent Content Updates</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-primary">
                  {i % 2 === 0 ? <Plus size={20} /> : <TrendingUp size={20} />}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm group-hover:text-brand-primary transition-colors">
                    {i % 2 === 0 ? "New resource added: Content Calendar" : "Blog post published: Scaling Personal Brand"}
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5">
          <h3 className="text-xl font-bold mb-8">Newsletter Signups</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs">
                  {String.fromCharCode(64 + i)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">user{i}@example.com</p>
                  <p className="text-xs text-gray-500">Joined May 01, 2026</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                  Active
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

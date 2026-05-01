"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Play, Search, Filter } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";


// Mock data as if from Firestore
const videos = [
  {
    id: "1",
    title: "How to build a personal brand in 2026",
    thumbnail: "/images/yt_sample.png",
    link: "https://youtube.com/watch?v=example1",
    category: "Personal Brand",
    views: "15K",
    date: "2 days ago"
  },
  {
    id: "2",
    title: "10 Tech trends every student should know",
    thumbnail: "/images/yt_sample.png",
    link: "https://youtube.com/watch?v=example2",
    category: "Technology",
    views: "8.2K",
    date: "1 week ago"
  },
  {
    id: "3",
    title: "My daily routine as a creator and student",
    thumbnail: "/images/yt_sample.png",
    link: "https://youtube.com/watch?v=example3",
    category: "Mindset",
    views: "12K",
    date: "2 weeks ago"
  },
  {
    id: "4",
    title: "Why Growth Matrix is the future of learning",
    thumbnail: "/images/yt_sample.png",
    link: "https://youtube.com/watch?v=example4",
    category: "Education",
    views: "25K",
    date: "1 month ago"
  }
];

const categories = ["All", "Personal Brand", "Technology", "Mindset", "Education"];

export default function YoutubePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            <FaYoutube size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Growth Matrix</h1>
        </div>

        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
          Deep dives into mindset, money, and machinery. Explore my full library of 
          educational content curated for the ambitious.
        </p>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 justify-between items-start md:items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-6 py-2 rounded-full text-sm font-medium border border-white/10 hover:border-brand-primary hover:text-brand-primary transition-all bg-white/5"
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search videos..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-brand-primary outline-none transition-colors"
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <motion.a
            key={video.id}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group block"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-xl mb-4">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-14 h-14 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-xl scale-90 group-hover:scale-100 transition-transform">
                  <Play fill="currentColor" size={24} />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                {video.category}
              </div>
            </div>
            
            <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-brand-primary transition-colors">
              {video.title}
            </h3>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
              <span>{video.views} views</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full" />
              <span>{video.date}</span>
              <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Channel CTA */}
      <section className="mt-24 p-8 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-brand-secondary/50 to-brand-accent/50 border border-white/5 relative overflow-hidden text-center">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Never miss a deep dive.</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Subscribe to Growth Matrix on YouTube for weekly insights into the world 
            of high-growth personal branding and tech.
          </p>
          <a 
            href="https://youtube.com/@GrowthMatrix" 
            target="_blank" 
            className="inline-flex items-center gap-3 px-10 py-4 bg-red-600 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-[0_0_25px_rgba(220,38,38,0.3)]"
          >
            <FaYoutube size={24} />
            Subscribe Now
          </a>

        </div>
      </section>
    </div>
  );
}

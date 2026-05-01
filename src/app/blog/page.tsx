"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { blogService, settingsService } from "@/lib/services";

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [blogData, brandData] = await Promise.all([
        blogService.getAll(),
        settingsService.get()
      ]);
      setArticles(blogData);
      setBrand(brandData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(a => 
    a.title?.toLowerCase().includes(search.toLowerCase()) ||
    a.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          {brand?.blogTitle && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 space-y-4"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                {brand.blogTitle.split(" ").slice(0, -1).join(" ")} <span className="text-brand-primary">{brand.blogTitle.split(" ").pop()}</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                {brand.blogDesc}
              </p>

            </motion.div>
          )}
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 outline-none focus:border-brand-primary transition-all text-white"
          />
        </div>

        {/* Blog Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {loading ? (
             [1, 2].map((i) => (
               <div key={i} className="h-[500px] bg-white/5 rounded-[3rem] animate-pulse" />
             ))
          ) : filteredArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/5 group-hover:border-brand-primary/50 transition-all mb-8">
                {article.image ? (
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center text-brand-primary">
                    <BookOpen size={64} />
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 rounded-full bg-brand-primary text-black text-xs font-bold uppercase tracking-widest shadow-xl">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4 px-2">
                <div className="flex items-center gap-6 text-xs text-gray-500 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar size={14} /> {article.date}</span>
                  <span className="flex items-center gap-2"><User size={14} /> Ankit Yadav</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-brand-primary transition-colors leading-tight">
                  {article.title}
                </h3>
                <div 
                   className="text-gray-400 line-clamp-2"
                   dangerouslySetInnerHTML={{ __html: article.content.substring(0, 150) + "..." }}
                />
                <Link 
                  href={`/blog/${article.id}`}
                  className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-4 transition-all pt-4"
                >
                  Read Full Article <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {!loading && filteredArticles.length === 0 && (
          <div className="py-40 text-center text-gray-500 text-xl font-bold">No articles found. Stay tuned!</div>
        )}

      </div>
    </main>
  );
}

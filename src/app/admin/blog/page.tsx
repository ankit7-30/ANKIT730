"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BookOpen, Trash2, Edit2, Search, ArrowRight, Save, X, CheckCircle2, Code, Type } from "lucide-react";
import BlogEditor from "@/components/admin/BlogEditor";

const initialArticles = [
  { id: 1, title: "How to scale a personal brand in 2026", date: "May 01, 2026", category: "Branding", content: "<h1>Master your brand growth</h1><p>Learn the exact framework...</p>" },
  { id: 2, title: "The future of AI in content creation", date: "Apr 28, 2026", category: "Technology", content: "<h1>AI is changing the game</h1><p>How to stay ahead...</p>" },
];

export default function AdminBlogManager() {
  const [articles, setArticles] = useState(initialArticles);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState<"visual" | "html">("visual");
  
  // Form State
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Branding");
  const [blogContent, setBlogContent] = useState("<p>Start writing your masterpiece...</p>");

  const handleSave = () => {
    if (editId) {
      setArticles(articles.map(a => a.id === editId ? { ...a, title: blogTitle, category: blogCategory, content: blogContent } : a));
      setEditId(null);
    } else {
      const newArticle = {
        id: Date.now(),
        title: blogTitle,
        category: blogCategory,
        content: blogContent,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      };
      setArticles([newArticle, ...articles]);
    }
    setIsAdding(false);
    resetForm();
  };

  const handleEdit = (article: any) => {
    setBlogTitle(article.title);
    setBlogCategory(article.category);
    setBlogContent(article.content);
    setEditId(article.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setBlogTitle("");
    setBlogCategory("Branding");
    setBlogContent("<p>Start writing your masterpiece...</p>");
    setEditMode("visual");
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Blog Manager</h1>
          <p className="text-gray-500">Write and manage your articles with dual-mode editing.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-brand-primary text-black rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-primary/20"
          >
            <Plus size={18} /> New Article
          </button>
        )}
      </header>

      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.div 
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between bg-white/[0.02] p-4 rounded-3xl border border-white/5">
              <button onClick={() => { setIsAdding(false); setEditId(null); resetForm(); }} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
                <X size={18} /> Cancel
              </button>
              
              {/* DUAL MODE TOGGLE */}
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setEditMode("visual")}
                  className={`px-6 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${editMode === "visual" ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
                >
                  <Type size={14} /> Visual
                </button>
                <button 
                  onClick={() => setEditMode("html")}
                  className={`px-6 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${editMode === "html" ? "bg-brand-primary text-black shadow-lg" : "text-gray-500 hover:text-white"}`}
                >
                  <Code size={14} /> HTML
                </button>
              </div>

              <button onClick={handleSave} className="px-8 py-3 bg-brand-primary text-black rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all">
                <Save size={18} /> {editId ? "Update Post" : "Publish Post"}
              </button>
            </div>

            <div className="glass-dark p-8 md:p-12 rounded-[3rem] border border-white/5 space-y-8">
              <input 
                type="text" 
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder="Article Title..." 
                className="w-full bg-transparent border-none text-4xl md:text-5xl font-bold tracking-tighter outline-none placeholder:text-white/10 text-white"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-white/5">
                <div className="space-y-2 text-white">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-brand-primary transition-colors"
                  >
                    <option className="bg-[#111]">Branding</option>
                    <option className="bg-[#111]">Technology</option>
                    <option className="bg-[#111]">Mindset</option>
                    <option className="bg-[#111]">Education</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Body Content</label>
                {editMode === "visual" ? (
                  <BlogEditor content={blogContent} onChange={setBlogContent} />
                ) : (
                  <textarea 
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full h-[500px] bg-black/50 border border-brand-primary/20 rounded-2xl p-6 text-brand-primary font-mono text-sm outline-none focus:border-brand-primary transition-all"
                    placeholder="<!-- Paste your AI-generated HTML here -->"
                  />
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <h3 className="text-xl font-bold">Recent Articles ({articles.length})</h3>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-primary transition-colors text-white"
                />
              </div>
            </div>
            
            <div className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase())).map((article) => (
                  <motion.div 
                    layout
                    key={article.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 md:p-8 hover:bg-white/[0.02] transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                        <BookOpen size={24} className="text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1 group-hover:text-brand-primary transition-colors">{article.title}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-widest">
                          <span>{article.date}</span>
                          <span className="w-1 h-1 bg-gray-700 rounded-full" />
                          <span className="text-brand-primary">{article.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(article)} className="p-3 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all"><Edit2 size={18} /></button>
                      <button onClick={() => setArticles(articles.filter(a => a.id !== article.id))} className="p-3 hover:bg-red-500/10 rounded-xl text-gray-500 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

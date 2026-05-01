"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowRight, Tag, Search } from "lucide-react";

// Mock data as if from Firestore

const posts = [
  {
    id: "1",
    slug: "scale-personal-brand-2026",
    title: "How to scale a personal brand from zero in 2026",
    excerpt: "The landscape of social media is changing. In this article, I break down the exact framework I used to reach my first 100k followers across platforms...",
    image: "/images/yt_sample.png",
    category: "Branding",
    date: "May 01, 2026",
    readTime: "5 min read"
  },
  {
    id: "2",
    slug: "ai-tools-for-entrepreneurs",
    title: "10 AI tools every entrepreneur must use today",
    excerpt: "Productivity is the key to success. These 10 AI tools will save you 20+ hours a week and help you automate your content creation workflow...",
    image: "/images/ankit.png",
    category: "Tech",
    date: "April 25, 2026",
    readTime: "8 min read"
  },
  {
    id: "3",
    slug: "mindset-shifts-for-success",
    title: "5 Mindset shifts that changed my life at 20",
    excerpt: "Success is 80% psychology and 20% mechanics. I've documented the biggest mental shifts that helped me transition from a student to an entrepreneur...",
    image: "/images/yt_sample.png",
    category: "Mindset",
    date: "April 18, 2026",
    readTime: "6 min read"
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center border border-brand-primary/20">
            <BookOpen size={28} className="text-brand-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Insights & Articles</h1>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
          Sharing my thoughts on brand building, technology, and the journey of 
          becoming the best version of yourself.
        </p>
      </header>

      {/* Featured Post */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 relative group"
      >
        <Link href={`/blog/${posts[0].slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/[0.02] border border-white/5 rounded-[3rem] p-4 md:p-8 hover:border-brand-primary/30 transition-all">
          <div className="relative aspect-[16/10] md:aspect-square lg:aspect-auto lg:h-[400px] rounded-[2.5rem] overflow-hidden">
            <Image
              src={posts[0].image}
              alt={posts[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="p-4 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full uppercase tracking-widest">
                Featured
              </span>
              <span className="text-gray-500 text-sm">{posts[0].date}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-brand-primary transition-colors leading-tight">
              {posts[0].title}
            </h2>
            <p className="text-gray-400 text-lg mb-8 line-clamp-3">
              {posts[0].excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{posts[0].readTime}</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border border-brand-primary/50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {posts.slice(1).map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/5 mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="w-1 h-1 bg-gray-700 rounded-full" />
                <span className="text-gray-500 text-xs">{post.date}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-primary transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-brand-primary font-bold text-sm">
                Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Newsletter */}
      <section className="mt-32 p-12 md:p-24 bg-white/[0.02] border border-white/5 rounded-[3.5rem] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get my best stuff first.</h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">
            I send a weekly newsletter with exclusive tips on branding and growth 
            that I don&apos;t share anywhere else.
          </p>

          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary transition-colors"
            />
            <button className="px-8 py-4 bg-brand-primary rounded-2xl font-bold hover:bg-brand-primary/90 transition-all shadow-xl">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

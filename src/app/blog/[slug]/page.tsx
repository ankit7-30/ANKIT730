"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, Share2, Loader2, User } from "lucide-react";
import { blogService, settingsService } from "@/lib/services";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null);
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [params.slug]);

  const loadContent = async () => {
    try {
      const [blogData, brandData] = await Promise.all([
        blogService.getById(params.slug),
        settingsService.get()
      ]);
      setPost(blogData);
      setBrand(brandData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-brand-primary font-bold">Back to Articles</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="max-w-4xl mx-auto px-6 py-4 text-white">

        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-primary transition-colors mb-12 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full uppercase tracking-widest">
              {post.category}
            </span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={14} />
              <span>{post.date || "Just now"}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-primary/20 bg-white/5 flex items-center justify-center">
                {brand?.ytAvatar ? (
                  <img src={brand.ytAvatar} alt="Ankit" className="w-full h-full object-cover" />
                ) : (
                  <User size={24} className="text-gray-500" />
                )}
              </div>
              <div>
                <p className="font-bold text-sm text-white">Ankit Yadav</p>
                <p className="text-xs text-gray-500">Author & Founder</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="p-3 glass rounded-xl hover:text-brand-primary transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/5 mb-16 shadow-2xl bg-white/5"
        >
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/10">
               <Image src="/favicon.png" alt="Logo" width={100} height={100} className="opacity-20 grayscale" />
            </div>
          )}
        </motion.div>

        <article className="prose prose-invert prose-brand max-w-none mb-32">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            className="[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-6 [&>h2]:mt-12 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-4 [&>h3]:mt-10 [&>p]:text-gray-300 [&>p]:leading-relaxed [&>p]:mb-6 [&>blockquote]:border-l-4 [&>blockquote]:border-brand-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:my-10 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:text-gray-300 [&>ul>li]:mb-2 text-white"
          />
        </article>
      </div>
    </main>

  );
}

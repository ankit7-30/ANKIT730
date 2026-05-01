"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, Share2 } from "lucide-react";
import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa6";


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Mock post content
  const post = {
    title: "How to scale a personal brand from zero in 2026",
    category: "Branding",
    date: "May 01, 2026",
    readTime: "5 min read",
    image: "/images/yt_sample.png",
    content: `
      <h2>The New Landscape of Branding</h2>
      <p>Social media in 2026 isn't what it used to be. The algorithms have matured, and attention is more fragmented than ever. But one thing remains constant: <strong>Value wins.</strong></p>
      
      <h3>1. Find Your Niche (The Growth Matrix Approach)</h3>
      <p>Don't try to talk to everyone. When you speak to everyone, you speak to no one. I started Growth Matrix specifically for students who want to bridge the gap between academia and real-world tech/finance skills.</p>
      
      <blockquote>"Your personal brand is what people say about you when you're not in the room. Make sure they're saying something useful."</blockquote>
      
      <h3>2. Content over Quality (Initially)</h3>
      <p>Most creators fail because they wait for the perfect camera or the perfect script. I started with my phone and a basic lapel mic. The insight matters more than the 4K resolution.</p>
      
      <ul>
        <li>Focus on the hook</li>
        <li>Deliver the value fast</li>
        <li>Have a clear Call to Action (CTA)</li>
      </ul>
      
      <p>In the next section, we'll discuss the specific platforms you should focus on first...</p>
    `
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
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
            <span>{post.date}</span>
          </div>
          <span className="w-1 h-1 bg-gray-700 rounded-full" />
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex items-center justify-between py-6 border-y border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-primary/20">
              <Image src="/images/ankit.png" alt="Ankit" width={48} height={48} className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-sm">Ankit Yadav</p>
              <p className="text-xs text-gray-500">Author & Founder</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="p-3 glass rounded-xl hover:text-brand-primary transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/5 mb-16 shadow-2xl"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Article Content - TipTap Styled */}
      <article className="prose prose-invert prose-brand max-w-none mb-24">
        <div 
          dangerouslySetInnerHTML={{ __html: post.content }} 
          className="[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-6 [&>h2]:mt-12 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-4 [&>h3]:mt-10 [&>p]:text-gray-400 [&>p]:leading-relaxed [&>p]:mb-6 [&>blockquote]:border-l-4 [&>blockquote]:border-brand-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:my-10 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:text-gray-400 [&>ul>li]:mb-2"
        />
      </article>

      {/* Author Bio Box */}
      <section className="p-8 md:p-12 glass-dark rounded-[3rem] border border-white/5 flex flex-col md:row gap-10 items-center mb-24">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-primary/20 shrink-0 shadow-2xl">
          <Image src="/images/ankit.png" alt="Ankit" width={128} height={128} className="object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-4">About Ankit Yadav</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            I&apos;m a creator and entrepreneur passionate about scaling brands and 
            teaching modern skills through Growth Matrix. I write about the 
            intersection of technology, business, and mindset.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="p-3 bg-white/5 rounded-xl hover:text-red-500 transition-colors"><FaYoutube size={18} /></a>
            <a href="#" className="p-3 bg-white/5 rounded-xl hover:text-pink-500 transition-colors"><FaInstagram size={18} /></a>
            <a href="#" className="p-3 bg-white/5 rounded-xl hover:text-blue-400 transition-colors"><FaTwitter size={18} /></a>
          </div>

        </div>
      </section>
    </div>
  );
}

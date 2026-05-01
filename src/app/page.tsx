"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Users } from "lucide-react";
import { FaYoutube, FaInstagram } from "react-icons/fa6";
import { GlowyWavesHero } from "@/components/home/GlowyWavesHero";



export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section with Glowy Waves */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <GlowyWavesHero className="absolute inset-0 z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-medium mb-6">
              <Star size={14} />
              <span>Official Website</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-6">
              Empowering Minds, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-amber-200">Scaling Growth.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              I&apos;m Ankit Yadav, founder of Growth Matrix. Join 50,000+ others learning 
              about financial literacy, tech trends, and the entrepreneur mindset.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/youtube"
                className="px-8 py-4 bg-brand-primary text-black rounded-xl font-bold flex items-center gap-2 hover:bg-brand-primary/90 transition-all group shadow-[0_0_30px_rgba(245,158,11,0.3)]"

              >
                Watch Channel
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/resources"
                className="px-8 py-4 glass rounded-xl font-bold hover:bg-white/10 transition-all border-white/10"
              >
                Get Resources
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-brand-primary/20 blur-[100px] rounded-full" />
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl">
              <Image
                src="/images/ankit.png"
                alt="Ankit Yadav"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 glass-dark p-6 rounded-3xl border border-white/10 shadow-2xl hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-black">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Total Reach</p>
                  <p className="font-bold text-2xl tracking-tighter text-white">100K+</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Featured Platforms */}
      <section className="px-6 py-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">My Ecosystem</h2>
            <p className="text-gray-400">Where I share most of my knowledge and insights.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-dark p-8 md:p-12 rounded-[2.5rem] border border-white/5 group relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl -z-10" />
              <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                <FaYoutube className="text-brand-primary" size={40} />
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-4">Growth Matrix (YouTube Channel)</h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg max-w-2xl">
                  Deep dives into financial markets, educational technology, and personal 
                  branding strategies. Weekly videos for the ambitious. Join 50k+ subscribers.
                </p>

                <Link href="/youtube" className="text-brand-primary font-bold flex items-center gap-2 group/btn text-lg">
                  Browse Videos <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Blog & Resources Preview */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Latest Articles</h2>
              <Link href="/blog" className="text-brand-primary text-sm font-bold uppercase tracking-widest">View All</Link>
            </div>
            <div className="flex flex-col gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <p className="text-xs text-brand-primary mb-2">MAY 01, 2026 • 5 MIN READ</p>
                  <h4 className="text-xl font-bold group-hover:text-brand-primary transition-colors mb-2">
                    How to scale a personal brand from zero in 2026
                  </h4>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    The landscape of social media is changing. In this article, I break down 
                    the exact framework I used to reach my first 100k...
                  </p>

                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-80">
            <h2 className="text-3xl font-bold mb-8">Free Assets</h2>
            <div className="glass-dark p-6 rounded-2xl border border-white/5">
              <p className="text-sm text-gray-400 mb-6">Download my most requested templates and guides for free.</p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-sm font-medium">Content Calendar 2026</span>
                  <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                    <ArrowRight size={14} />
                  </div>
                </li>
                <li className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-sm font-medium">Growth Mindset Checklist</span>
                  <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                    <ArrowRight size={14} />
                  </div>
                </li>
              </ul>
              <Link href="/resources" className="block text-center mt-6 py-3 border border-brand-primary/50 rounded-xl text-sm font-bold text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                Access Library
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

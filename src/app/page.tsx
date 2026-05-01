"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Download, Zap, TrendingUp, Users, Target } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import Link from "next/link";
import { settingsService } from "@/lib/services";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  const [brand, setBrand] = useState<any>(null);

  useEffect(() => {
    settingsService.get().then(setBrand);
  }, []);

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-brand-primary/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {brand?.heroTag && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-primary text-xs font-bold uppercase tracking-widest">
                <Zap size={14} fill="currentColor" /> {brand.heroTag}
              </div>
            )}

            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
              {brand?.heroHeadline?.split(" ").slice(0, -1).join(" ")} <span className="text-brand-primary">{brand?.heroHeadline?.split(" ").pop()}</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              {brand?.heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/youtube"
                className="px-10 py-5 bg-brand-primary text-black rounded-2xl font-bold flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] active:scale-95 text-lg"
              >
                {brand?.heroCtaText} <ArrowRight size={22} />
              </Link>
            </div>

          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* The Frame Container */}
            <div className="relative z-10 aspect-[4/5] rounded-[4rem] overflow-hidden border-2 border-white/10 group isolate shadow-2xl bg-black" style={{ maskImage: 'linear-gradient(white, white)', WebkitMaskImage: 'linear-gradient(white, white)' }}>
              {brand?.heroImage ? (
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={brand.heroImage} 
                  alt="Ankit Yadav" 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 rounded-[4rem]" 
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center" />
              )}
            </div>

            {/* Achievement Badge - Only shows if data exists in Cloud */}
            {brand?.badgeNumber && (
              <div className="absolute top-10 -right-4 z-20 bg-black/90 backdrop-blur-3xl border border-white/20 p-6 rounded-3xl shadow-2xl transition-all duration-500 group-hover:translate-x-3 group-hover:-translate-y-2">
                <p className="text-brand-primary font-black text-4xl tracking-tighter">{brand.badgeNumber}</p>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">{brand.badgeText}</p>
              </div>
            )}


          </motion.div>
        </div>
      </section>


      {/* Mid Section: Pillars */}
      <section className="py-32 px-6 bg-[#080808] border-y border-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          {/* Pillars of Growth */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[1.1]">
                {brand?.pillarsTitle?.split(" ").slice(0, -2).join(" ")} <span className="bg-gradient-to-r from-amber-200 via-brand-primary to-amber-500 bg-clip-text text-transparent">{brand?.pillarsTitle?.split(" ").slice(-2).join(" ")}</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                {brand?.pillarsDesc}
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: brand?.pillar1Title, desc: brand?.pillar1Desc, icon: TrendingUp },
                { title: brand?.pillar2Title, desc: brand?.pillar2Desc, icon: Users },
                { title: brand?.pillar3Title, desc: brand?.pillar3Desc, icon: Zap },
                { title: brand?.pillar4Title, desc: brand?.pillar4Desc, icon: Target },
              ].map((pillar, i) => (
                pillar.title && (
                  <motion.div 
                    key={pillar.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.01 }}
                    className="p-10 bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-xl rounded-[3rem] border border-white/[0.05] hover:border-brand-primary/40 transition-all group relative overflow-hidden"
                  >
                    {/* Atmospheric Glow */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full group-hover:bg-brand-primary/15 transition-all duration-700" />
                    
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                      <pillar.icon size={30} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{pillar.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-500">{pillar.desc}</p>
                  </motion.div>
                )
              ))}

            </div>
          </div>
        </div>
      </section>



      {/* Content Shortcuts */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           <Link href="/youtube" className="group relative aspect-video rounded-[3.5rem] overflow-hidden border border-white/[0.05] hover:border-brand-primary/40 transition-all duration-700 bg-[#080808]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-brand-primary/[0.03] group-hover:bg-transparent transition-all duration-700" />
              <div className="absolute bottom-12 left-12 z-20 space-y-4">
                 <div className="flex items-center gap-2 text-brand-primary font-bold uppercase text-[11px] tracking-[0.2em] mb-2">
                    <FaYoutube size={18} /> Latest Content
                 </div>
                 <h3 className="text-4xl font-bold text-white tracking-tighter">Cinematic Learning</h3>
                 <p className="text-gray-400 text-sm max-w-xs leading-relaxed group-hover:text-gray-200 transition-colors">High-production education on business and mindset.</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 backdrop-blur-2xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 z-20 border border-white/10 group-hover:shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                 <ArrowRight size={40} className="text-brand-primary" />
              </div>
           </Link>

           <Link href="/blog" className="group relative aspect-video rounded-[3.5rem] overflow-hidden border border-white/[0.05] hover:border-brand-primary/40 transition-all duration-700 bg-[#080808]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
              <div className="absolute bottom-12 left-12 z-20 space-y-4">
                 <div className="flex items-center gap-2 text-brand-primary font-bold uppercase text-[11px] tracking-[0.2em] mb-2">
                    <BookOpen size={18} /> Deep Dives
                 </div>
                 <h3 className="text-4xl font-bold text-white tracking-tighter">Strategic Articles</h3>
                 <p className="text-gray-400 text-sm max-w-xs leading-relaxed group-hover:text-gray-200 transition-colors">Master the concepts behind the content.</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 backdrop-blur-2xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 z-20 border border-white/10 group-hover:shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                 <ArrowRight size={40} className="text-brand-primary" />
              </div>
           </Link>
        </div>
      </section>
 
      {/* Newsletter Section */}
      <Newsletter />
 
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, Lock, Globe } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center border border-brand-primary/20">
            <ShieldCheck size={28} className="text-brand-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Privacy Policy</h1>
        </div>
        <p className="text-xl text-gray-400 leading-relaxed">
          Your privacy matters. I&apos;m committed to being transparent about how I handle 
          any data collected on this platform.
        </p>
      </motion.div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Eye size={20} className="text-brand-primary" />
            What I Collect
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            I only collect basic, non-identifiable information through Google Analytics 
            (like which pages you visit and what country you are from) to help me 
            understand what content is most helpful to you.
          </p>
          <p className="text-gray-400 leading-relaxed">
            If you sign up for my newsletter, I only store your email address. I will 
            never sell or share your email with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Lock size={20} className="text-brand-primary" />
            Data Security
          </h2>
          <p className="text-gray-400 leading-relaxed">
            I use industry-standard security measures (like SSL encryption) to protect 
            the data on this site. Your safety is my priority.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Globe size={20} className="text-brand-primary" />
            Cookies
          </h2>
          <p className="text-gray-400 leading-relaxed">
            This site uses basic cookies to improve your browsing experience and for 
            analytics. You can choose to disable cookies in your browser settings if 
            you prefer.
          </p>
        </section>

        <section className="pt-8 border-t border-white/5">
          <p className="text-sm text-gray-500">
            Last Updated: May 01, 2026. If you have any questions, feel free to reach 
            out on Instagram.
          </p>
        </section>
      </div>
    </div>
  );
}

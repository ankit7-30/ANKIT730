"use client";

import { motion } from "framer-motion";
import { FileText, UserCheck, Copyright, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center border border-brand-primary/20">
            <FileText size={28} className="text-brand-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Terms of Service</h1>
        </div>
        <p className="text-xl text-gray-400 leading-relaxed">
          Welcome to my digital home. By using this website, you agree to these 
          simple and straightforward terms.
        </p>
      </motion.div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Copyright size={20} className="text-brand-primary" />
            Content Ownership
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            All content on this site—including videos, articles, and resources—is 
            owned by Ankit Yadav unless otherwise stated. 
          </p>
          <p className="text-gray-400 leading-relaxed">
            You are free to share links to my content, but please do not re-upload 
            my videos or sell my free resources as your own.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <UserCheck size={20} className="text-brand-primary" />
            Resource Usage
          </h2>
          <p className="text-gray-400 leading-relaxed">
            The resources provided here are for educational and personal use. While 
            they are designed to help you grow, I cannot guarantee specific financial 
            or business results. Your success depends on your own effort and execution!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <AlertCircle size={20} className="text-brand-primary" />
            Disclaimer
          </h2>
          <p className="text-gray-400 leading-relaxed">
            I strive to keep all information accurate, but things change fast in tech 
            and business. Use the information here at your own discretion.
          </p>
        </section>

        <section className="pt-8 border-t border-white/5">
          <p className="text-sm text-gray-500">
            Last Updated: May 01, 2026. Let&apos;s build something great together.
          </p>
        </section>
      </div>
    </div>
  );
}

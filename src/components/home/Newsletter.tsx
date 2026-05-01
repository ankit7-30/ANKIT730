"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { subscriberService } from "@/lib/services";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await subscriberService.add(email);
      setStatus("success");
      setMessage("You're officially in the inner circle!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative pt-4 pb-12 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark border border-white/5 p-12 md:p-20 rounded-[3rem] relative overflow-hidden text-center"
        >
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 right-0 p-8 text-brand-primary/20">
            <Sparkles size={48} />
          </div>

          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-full text-brand-primary text-xs font-bold uppercase tracking-widest border border-brand-primary/20">
              <Mail size={14} /> Newsletter
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                Join the <span className="text-brand-primary italic">Inner Circle</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                Get the latest strategies on digital growth, content creation, and entrepreneurship delivered straight to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto group">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-primary transition-colors" size={18} />
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-brand-primary focus:bg-white/10 transition-all placeholder:text-gray-600"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="px-8 py-4 bg-brand-primary text-black rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-brand-primary/20 whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>Subscribe <Send size={18} /></>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-green-500 font-medium text-sm"
                  >
                    <CheckCircle2 size={16} /> {message}
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -bottom-10 left-0 right-0 text-red-500 font-medium text-sm"
                  >
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">
              No Spam. Only High-Value Content. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

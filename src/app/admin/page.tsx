"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Shield, Zap } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";

const ADMIN_EMAIL = "ankitkumaryadav26548@gmail.com";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If already logged in as admin, redirect straight to dashboard
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === ADMIN_EMAIL) {
        router.replace("/admin/dashboard");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      setSigning(true);
      setError("");
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ login_hint: ADMIN_EMAIL });
      const result = await signInWithPopup(auth, provider);

      if (result.user.email !== ADMIN_EMAIL) {
        // Wrong account — sign them out immediately
        await auth.signOut();
        setError("Access Denied. Only the Master Admin account is permitted.");
        setSigning(false);
        return;
      }

      router.replace("/admin/dashboard");
    } catch (err: any) {
      setError("Sign-in failed. Please try again.");
      setSigning(false);
    }
  };

  // Show loading spinner while checking existing session
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 space-y-8 text-center shadow-2xl backdrop-blur-xl">

          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-brand-primary rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.4)]">
              <Shield size={36} className="text-black" />
            </div>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-brand-primary text-[10px] font-bold uppercase tracking-[0.3em]">
              <Zap size={12} fill="currentColor" /> Sovereign Access
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-gray-500 text-sm">
              Restricted to authorized personnel only.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={signing}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-2xl font-bold text-sm hover:bg-gray-100 active:scale-95 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {signing ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <FaGoogle size={18} />
            )}
            {signing ? "Verifying Identity..." : "Continue with Google"}
          </button>

          <p className="text-gray-700 text-[10px] uppercase tracking-widest font-bold">
            Identity-Locked · Enterprise Security
          </p>
        </div>
      </motion.div>
    </div>
  );
}

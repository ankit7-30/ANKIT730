"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Download, 
  Settings,
  LogOut,
  ChevronRight,
  UserPlus
} from "lucide-react";
import { FaYoutube, FaInstagram } from "react-icons/fa6";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useStore } from "@/store/useStore";


const adminLinks = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Page Content", href: "/admin/pages", icon: BookOpen },
  { name: "YouTube", href: "/admin/youtube", icon: FaYoutube },
  { name: "Blog", href: "/admin/blog", icon: BookOpen },
  { name: "Subscribers", href: "/admin/subscribers", icon: UserPlus },
  { name: "Resources", href: "/admin/resources", icon: Download },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];




export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAdmin, setIsAdmin } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Prevent hydration mismatch by not rendering until client-side is ready
  if (!mounted) return null;


  // If it's the login page, just show children
  if (pathname === "/admin") return <>{children}</>;


  // Basic auth check (will be more robust with Firebase)
  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Unauthorized Access</h2>
        <p className="text-gray-400 mb-8">You must be logged in to view the admin panel.</p>
        <Link href="/admin" className="px-8 py-3 bg-brand-primary rounded-xl font-bold">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="glass-dark p-6 rounded-[2rem] border border-white/5 sticky top-32">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center font-bold">A</div>
            <div>
              <p className="font-bold text-sm">Ankit Yadav</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Administrator</p>
            </div>
          </div>
          
          <nav className="flex flex-col gap-2">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.href 
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon size={18} />
                  <span>{link.name}</span>
                </div>
                {pathname === link.href && <ChevronRight size={14} />}
              </Link>
            ))}
            
            <hr className="border-white/5 my-4" />
            
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all text-left w-full"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>


          </nav>
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}

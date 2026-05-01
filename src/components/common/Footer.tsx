"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { settingsService } from "@/lib/services";


const footerLinks = [
  { name: "Home", href: "/" },
  { name: "YouTube", href: "/youtube" },
  { name: "Blog", href: "/blog" },
  { name: "Resources", href: "/resources" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const [brand, setBrand] = useState<any>(null);

  useEffect(() => {
    loadBrand();
  }, []);

  const loadBrand = async () => {
    const data = await settingsService.get();
    if (data) setBrand(data);
  };

  const socialLinks = [
    { icon: FaYoutube, href: brand?.socialYoutube, color: "hover:text-red-500" },
    { icon: FaInstagram, href: brand?.socialInstagram, color: "hover:text-pink-500" },
    { icon: FaTwitter, href: brand?.socialTwitter, color: "hover:text-sky-500" },
    { icon: FaLinkedin, href: brand?.socialLinkedin, color: "hover:text-blue-600" },
  ];

  return (
    <footer className="bg-black/50 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto mb-12 flex flex-col items-start gap-8">
        
        {/* Social Icons at the Top */}
        <div className="flex items-center gap-6">
          {socialLinks.map((social, idx) => (
            social.href && (
              <a 
                key={idx} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-gray-500 transition-all hover:scale-110 ${social.color}`}
              >
                <social.icon size={24} />
              </a>
            )
          ))}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-110 text-black shadow-[0_0_20px_rgba(245,158,11,0.2)] uppercase">
                {brand?.heroHeadline ? brand.heroHeadline.split(" ").map((n: string) => n[0]).join("").substring(0, 2) : "AY"}
              </div>
              <span className="font-bold text-2xl tracking-tighter text-white">{brand?.heroHeadline || "Ankit Yadav"}</span>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed text-sm">
              {brand?.footerBio || "Mastering the digital era through strategic content and entrepreneurial growth."}
            </p>
            {brand?.adminEmail && (
              <a 
                href={`mailto:${brand.adminEmail}`}
                className="mt-4 flex items-center gap-2 text-brand-primary text-xs font-bold hover:underline transition-all"
              >
                <FaEnvelope size={14} /> {brand.adminEmail}
              </a>
            )}
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-brand-primary">Navigation</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-brand-primary">Legal</h4>
            <ul className="flex flex-col gap-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-xs font-medium tracking-tight">
          &copy; {new Date().getFullYear()} {brand?.heroHeadline || "Ankit Yadav"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}


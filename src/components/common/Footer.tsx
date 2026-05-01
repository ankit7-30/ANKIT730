import Link from "next/link";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa6";

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
  return (
    <footer className="bg-black/50 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto mb-12 flex flex-col items-start gap-8">
        {/* Social Icons at the Top */}
        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-500 hover:text-brand-primary transition-all hover:scale-110"><FaYoutube size={24} /></a>
          <a href="#" className="text-gray-500 hover:text-brand-primary transition-all hover:scale-110"><FaInstagram size={24} /></a>
          <a href="#" className="text-gray-500 hover:text-brand-primary transition-all hover:scale-110"><FaTwitter size={24} /></a>
          <a href="#" className="text-gray-500 hover:text-brand-primary transition-all hover:scale-110"><FaLinkedin size={24} /></a>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-110 text-black shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                AY
              </div>
              <span className="font-bold text-2xl tracking-tighter">Ankit Yadav</span>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Personal brand of Ankit Yadav. Student, content creator, and entrepreneur. 
              Helping you master financial literacy and growth mindset.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-brand-primary">Navigation</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-brand-primary">Legal</h4>
            <ul className="flex flex-col gap-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Ankit Yadav. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

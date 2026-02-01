import { Linkedin, Github, CodeXml } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-headline">
              <CodeXml className="text-primary"/>
              SecureAutomate
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Production-grade AI automation built by software engineers with
              cybersecurity expertise.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#services" className="hover:text-white">AI Automation</Link></li>
              <li><Link href="#services" className="hover:text-white">System Integration</Link></li>
              <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="#why-custom" className="hover:text-white">Why Custom?</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#about" className="hover:text-white">About Us</Link></li>
              <li><Link href="#case-studies" className="hover:text-white">Case Studies</Link></li>
              <li><Link href="#tech-stack" className="hover:text-white">Tech Stack</Link></li>
              <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="mailto:hello@secureautomate.com" className="hover:text-white">hello@secureautomate.com</a></li>
              <li>Response time: &lt; 24 hours</li>
              <li>
                <Link href="#contact" className="text-primary hover:underline">
                  Book Consultation →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SecureAutomate. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

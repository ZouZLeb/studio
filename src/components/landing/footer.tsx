import { Linkedin, Github, CodeXml } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-transparent text-foreground border-t border-border mt-12 md:mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-headline">
              <CodeXml className="text-primary"/>
              AImatic
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Privacy-first automation engineering. We build high-quality systems and custom scripts you own.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Engineering</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#services" className="hover:text-primary transition-colors">Workflow Development</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Custom Scripting</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Ownership Pricing</Link></li>
              <li><Link href="#why-custom" className="hover:text-primary transition-colors">Privacy Audit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Team</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#about" className="hover:text-primary transition-colors">Security Experts</Link></li>
              <li><Link href="#case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="#tech-stack" className="hover:text-primary transition-colors">Tech Stack</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:hello@aimatic.com" className="hover:text-primary transition-colors">hello@aimatic.com</a></li>
              <li>Response time: &lt; 24 hours</li>
              <li>
                <Link href="#contact" className="text-primary hover:underline">
                  Free Architecture Review →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AImatic. All rights reserved. 100% Data Sovereignty.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

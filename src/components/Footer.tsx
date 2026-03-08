import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Bhuvan N.R. All rights reserved.
        </p>
        <div className="flex gap-3">
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Twitter, href: '#', label: 'Twitter' },
            { icon: Mail, href: 'mailto:bhuvannr2006@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className={`p-2 transition-all duration-300 hover:scale-110 ${
                label === 'GitHub' ? 'text-muted-foreground hover:text-foreground' :
                label === 'LinkedIn' ? 'text-muted-foreground hover:text-[#0A66C2]' :
                label === 'Twitter' ? 'text-muted-foreground hover:text-[#1DA1F2]' :
                'text-muted-foreground hover:text-[#EA4335]'
              }`} aria-label={label}>
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

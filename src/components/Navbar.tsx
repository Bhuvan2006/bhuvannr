import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'About' },
  { to: '/resume', label: 'Resume' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground">
          Bhuvan <span className="font-normal text-muted-foreground">N.R</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm tracking-wide transition-all duration-300 hover:text-foreground after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-foreground after:transition-all after:duration-300 ${
                location.pathname === link.to
                  ? 'text-foreground font-medium after:w-full'
                  : 'text-muted-foreground after:w-0 hover:after:w-full'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm py-2 rounded-md px-3 -mx-3 transition-all duration-200 active:scale-[0.97] ${
                    location.pathname === link.to
                      ? 'text-foreground font-medium bg-secondary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

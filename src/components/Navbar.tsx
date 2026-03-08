import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div className="bg-background/80 backdrop-blur-md border border-border rounded-full px-6 py-2.5 flex items-center gap-1 shadow-sm">
        {/* Logo */}
        <Link to="/" className="font-display text-sm font-bold tracking-tight text-foreground mr-4">
          B<span className="font-normal text-muted-foreground">.R</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-3.5 py-1.5 rounded-full text-sm transition-all duration-300 ${
                location.pathname === link.to
                  ? 'text-foreground font-medium bg-secondary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={`ml-2 px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              location.pathname === '/contact'
                ? 'bg-foreground text-background'
                : 'bg-foreground text-background hover:opacity-80'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground ml-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-4 right-4 md:hidden bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-lg z-50"
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm py-2.5 rounded-xl px-4 transition-all duration-200 active:scale-[0.97] ${
                    location.pathname === link.to
                      ? 'text-foreground font-medium bg-secondary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="text-sm py-2.5 rounded-xl px-4 mt-1 bg-foreground text-background font-medium text-center"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

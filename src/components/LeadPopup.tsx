import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
});

export default function LeadPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user || dismissed) return;
    const alreadySubmitted = localStorage.getItem('lead_submitted');
    if (alreadySubmitted) return;
    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, [user, dismissed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse({ name, email });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('leads').insert({ name: result.data.name, email: result.data.email });
    setSubmitting(false);
    if (error) {
      toast.error('Something went wrong. Please try again.');
      return;
    }
    localStorage.setItem('lead_submitted', 'true');
    toast.success('Thanks! We\'ll keep you updated.');
    setShow(false);
  };

  if (user) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 w-80 rounded-lg border border-border bg-card p-6 shadow-2xl"
        >
          <button
            onClick={() => { setShow(false); setDismissed(true); }}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">Stay in the loop</h3>
          <p className="text-sm text-muted-foreground mb-4">Get updates on new projects & articles.</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Subscribe'}
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

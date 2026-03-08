import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Message sent! I\'ll get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
    setSending(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <h1 className="font-display text-4xl font-bold mb-2">Contact</h1>
          <p className="text-muted-foreground">Let's work together. Drop me a message.</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="md:col-span-3 space-y-4"
          >
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Textarea placeholder="Your message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="resize-none" />
            <Button type="submit" disabled={sending} className="w-full">
              {sending ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">bhuvannr2006@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">India</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">Available on request</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

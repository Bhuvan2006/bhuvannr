import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

export default function Index() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="container max-w-3xl py-16">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-2">
          <div className="w-28 h-28 rounded-full bg-secondary border border-border flex items-center justify-center mb-8">
            <span className="text-muted-foreground text-xs">Photo</span>
          </div>
        </motion.div>
        <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-sm text-muted-foreground uppercase tracking-widest mb-3">
          Hello, I'm
        </motion.p>
        <motion.h1 custom={2} variants={fadeUp} initial="hidden" animate="visible" className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Bhuvan N.R
        </motion.h1>
        <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
          A creative developer crafting modern, performant digital experiences. I turn ideas into clean, elegant products.
        </motion.p>
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex gap-3">
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Twitter, href: '#', label: 'Twitter' },
            { icon: Mail, href: '#', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className={`p-2.5 rounded-md transition-all duration-300 hover:scale-110 hover:shadow-md ${
                label === 'GitHub' ? 'text-muted-foreground hover:text-foreground hover:bg-foreground/10' :
                label === 'LinkedIn' ? 'text-muted-foreground hover:text-[#0A66C2] hover:bg-[#0A66C2]/10' :
                label === 'Twitter' ? 'text-muted-foreground hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10' :
                'text-muted-foreground hover:text-[#EA4335] hover:bg-[#EA4335]/10'
              }`}
              aria-label={label}>
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </section>

      {/* About */}
      <section className="container max-w-3xl py-16 border-t border-border">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold mb-6">About Me</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm a passionate developer with a knack for crafting elegant solutions to complex problems. 
            With experience building web applications, I specialize in creating seamless user experiences 
            backed by robust architectures.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
            projects, or sharing knowledge through community events.
          </p>
        </motion.div>
      </section>

      {/* Skills */}
      <section className="container max-w-3xl py-16 border-t border-border">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Python', 'Git', 'Docker', 'AWS'].map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

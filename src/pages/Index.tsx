import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const skills = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Cloud Architecture'];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(160_84%_39%/0.08),transparent_60%),radial-gradient(ellipse_at_bottom_left,hsl(270_60%_55%/0.06),transparent_60%)]" />
        <div className="container relative z-10">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">
            Hello, I'm
          </motion.p>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Your Name
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            A creative developer building modern digital experiences. I turn ideas into polished, performant products.
          </motion.p>
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex gap-4 flex-wrap">
            <Link to="/projects">
              <Button size="lg" className="gap-2">
                View Projects <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/blog">
              <Button size="lg" variant="outline" className="gap-2">
                Read Blog
              </Button>
            </Link>
          </motion.div>
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex gap-4 mt-10">
            {[
              { icon: Github, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Mail, href: '#' },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 border-t border-border">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="aspect-square rounded-2xl bg-secondary/50 border border-border flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Your Photo</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm a passionate developer with a knack for crafting elegant solutions to complex problems.
              With years of experience building web applications, I specialize in creating seamless
              user experiences backed by robust architectures.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source
              projects, or sharing my knowledge through blog posts and community events.
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

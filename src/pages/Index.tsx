import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import profileImg from '@/assets/profile.jpeg';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0, 0, 0.2, 1] as const } }),
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/Bhuvan2006', label: 'GitHub', hoverClass: 'hover:text-foreground hover:bg-foreground/10' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/bhuvan-n-r-957a62315/', label: 'LinkedIn', hoverClass: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10' },
  { icon: Twitter, href: 'https://x.com/Bhuvan_N_R', label: 'Twitter', hoverClass: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10' },
  { icon: Mail, href: '#', label: 'Email', hoverClass: 'hover:text-[#EA4335] hover:bg-[#EA4335]/10' },
];

const placeholderImg = '/placeholder.svg';

const ctaSections = [
  {
    title: "Curious about my journey?",
    description: "Explore my background, skills, and the experiences that shaped my approach to development.",
    link: "/resume",
    linkText: "View My Resume",
  },
  {
    title: "Want to see what I've built?",
    description: "Browse through projects showcasing modern web apps, creative experiments, and real-world solutions.",
    link: "/projects",
    linkText: "Explore Projects",
  },
  {
    title: "Ready to work together?",
    description: "I'm always open to new opportunities, collaborations, and interesting conversations.",
    link: "/contact",
    linkText: "Get In Touch",
  },
];

export default function Index() {
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      {/* Hero — split layout inspired by SheRocks */}
      <section className="min-h-[90vh] flex items-center pt-16">
        <div className="container grid md:grid-cols-2 gap-12 items-center py-16">
          {/* Left — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex justify-center md:justify-end"
          >
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-2xl bg-secondary border border-border overflow-hidden relative">
              <img src={profileImg} alt="Bhuvan N.R" className="w-full h-full object-cover" />
              {/* Decorative accent */}
              <div className="absolute -bottom-2 -right-2 w-72 h-72 md:w-96 md:h-96 rounded-2xl border-2 border-accent -z-10" />
            </div>
          </motion.div>

          {/* Right — Text */}
          <div className="text-center md:text-left">
            <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="text-sm text-muted-foreground uppercase tracking-[0.2em] mb-4">
              Hello, I'm
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.1]">
              Bhuvan N.R
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="font-display text-xl md:text-2xl text-muted-foreground font-medium mb-6">
              B.Tech CSE Student & Developer
            </motion.p>
            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0 mb-8">
              I'm a Computer Science student at Dayananda Sagar University with a strong interest in Web Development and Machine Learning. I thrive in collaborative environments and love turning ideas into elegant solutions.
            </motion.p>

            {/* Social icons */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map(({ icon: Icon, href, label, hoverClass }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className={`p-2.5 rounded-md transition-all duration-300 hover:scale-110 hover:shadow-md text-muted-foreground ${hoverClass}`}
                  aria-label={label}>
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro statement — centered */}
      <section className="border-t border-border">
        <div className="container max-w-3xl py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            <span className="text-foreground font-semibold">I'm a Computer Science UG Engineering student</span> at Dayananda Sagar University with a strong interest in Web Development and Machine Learning. Currently building my foundation with Python, Java, C, HTML, CSS and JS, and gaining real-world exposure through internships at NIT Puducherry and HCF. With a humble mindset, a curious spirit, and a constant drive to learn, I thrive in collaborative environments.
          </motion.p>
        </div>
      </section>

      {/* Featured Projects — Portfolio style like Diogo TC */}
      <section className="border-t border-border">
        <div className="container max-w-5xl py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">A few highlights from my ML & AI work.</p>
            </div>
            <Link to="/projects" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="aspect-[4/3] bg-secondary animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 w-2/3 bg-secondary animate-pulse rounded" />
                    <div className="h-4 w-full bg-secondary animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.github_url || project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group block h-full rounded-xl border border-border bg-card overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img src={project.image_url || placeholderImg} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-lg mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center">No projects yet.</p>
          )}

          <Link to="/projects" className="md:hidden flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mt-8">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA Cards — inspired by SheRocks bottom sections */}
      <section className="border-t border-border">
        <div className="container max-w-5xl py-20">
          <div className="grid md:grid-cols-3 gap-6">
            {ctaSections.map((section, i) => (
              <motion.div
                key={section.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Link
                  to={section.link}
                  className="group block h-full p-8 rounded-xl border border-border bg-card hover:bg-secondary/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <h3 className="font-display text-lg font-bold mb-3 group-hover:text-foreground transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {section.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    {section.linkText}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-border">
        <div className="container max-w-3xl py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-2xl font-bold mb-6 text-center">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Python', 'Git', 'Docker', 'AWS'].map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-full text-xs font-medium bg-secondary text-foreground border border-border hover:bg-accent transition-colors duration-200">
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

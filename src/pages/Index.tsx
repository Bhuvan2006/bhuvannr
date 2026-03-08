import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import profileImg from '@/assets/profile.jpeg';
import projectNeuralImg from '@/assets/project-neural-style.jpg';
import projectSentimentImg from '@/assets/project-sentiment.jpg';
import projectHealthImg from '@/assets/project-health.jpg';
import { Link } from 'react-router-dom';

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

const featuredProjects = [
  {
    title: "Neural Style Transfer",
    description: "A deep learning model that applies the artistic style of one image to the content of another using convolutional neural networks and VGG19 feature extraction.",
    tags: ["Python", "PyTorch", "CNN", "Computer Vision"],
    icon: Eye,
    github: "https://github.com/Bhuvan2006",
  },
  {
    title: "Sentiment Analysis Engine",
    description: "NLP pipeline for real-time sentiment classification of social media text using transformer-based models with 94% accuracy on benchmark datasets.",
    tags: ["Python", "Transformers", "NLP", "HuggingFace"],
    icon: MessageSquare,
    github: "https://github.com/Bhuvan2006",
  },
  {
    title: "Predictive Health Monitor",
    description: "ML system that predicts patient health risks from clinical data using ensemble methods, featuring an interactive dashboard for medical professionals.",
    tags: ["Python", "Scikit-learn", "React", "FastAPI"],
    icon: Brain,
    github: "https://github.com/Bhuvan2006",
  },
];

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
              Creative Developer
            </motion.p>
            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0 mb-8">
              I craft modern, performant digital experiences — turning ideas into clean, elegant products that make a difference.
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
            <span className="text-foreground font-semibold">I'm a passionate developer</span> with a knack for crafting elegant solutions
            to complex problems. With experience building web applications, I specialize in creating seamless user experiences
            backed by robust architectures.
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

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.a
                  key={project.title}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group block h-full p-6 rounded-xl border border-border bg-card hover:border-foreground/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-secondary text-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Github className="h-4 w-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.a>
              );
            })}
          </div>

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

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const experience = [
  {
    role: 'Full-stack Developer',
    company: 'KrowdKraft',
    period: 'Jan 2026 – Present',
    description: 'Building full-stack applications and contributing to product development in a collaborative startup environment.',
  },
  {
    role: 'Management Staff',
    company: 'AI_WORKS@DSU',
    period: 'Jan 2025 – Present',
    description: 'Active member and management staff of the AI_Works club, participating in networking events and taking initiative in team and leadership roles.',
  },
  {
    role: 'Intern',
    company: 'National Institute of Technology Puducherry',
    period: 'May 2025 – Jul 2025',
    description: 'Conducted field interviews with truck drivers for a road safety research initiative. Collected and analyzed data to identify key risk factors and contributed to a Road Safety Audit Report with practical safety recommendations.',
  },
  {
    role: 'Student Intern',
    company: 'Humans Care Foundation',
    period: 'Feb 2025 – Mar 2025',
    description: 'Gained hands-on experience through a student internship program focused on community impact and social initiatives.',
  },
];

const education = [
  {
    degree: 'Bachelor of Technology - BTech, Computer Science',
    school: 'Dayananda Sagar University',
    period: 'Sep 2024 – Dec 2028',
    description: 'Pursuing B.Tech in Computer Science with a strong interest in Web Development and Machine Learning.',
  },
  {
    degree: 'PCMC',
    school: 'Christ Academy Junior College',
    period: 'Jun 2022 – Mar 2024',
    description: 'Completed pre-university education with a focus on Physics, Chemistry, Mathematics, and Computer Science.',
  },
];

const certifications = [
  'Programming In Java',
  'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
  'Aurora Tech Fest 2025 – Codethon',
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Resume() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-3xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }} className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-sans text-4xl font-bold mb-2 text-balance">Resume</h1>
            <p className="text-muted-foreground">My professional journey so far.</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Download CV
          </Button>
        </motion.div>

        {/* Experience */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="mb-16">
          <h2 className="font-sans text-xl font-bold mb-8 uppercase tracking-wider text-muted-foreground text-sm">Experience</h2>
          <div className="space-y-8">
            {experience.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative pl-6 border-l-2 border-border">
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-foreground" />
                <p className="text-xs text-muted-foreground mb-1">{item.period}</p>
                <h3 className="font-sans font-semibold text-lg">{item.role}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="mb-16">
          <h2 className="font-sans text-xl font-bold mb-8 uppercase tracking-wider text-muted-foreground text-sm">Education</h2>
          <div className="space-y-8">
            {education.map((item, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-border">
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-foreground" />
                <p className="text-xs text-muted-foreground mb-1">{item.period}</p>
                <h3 className="font-sans font-semibold text-lg">{item.degree}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.school}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <h2 className="font-sans text-xl font-bold mb-8 uppercase tracking-wider text-muted-foreground text-sm">Certifications</h2>
          <ul className="space-y-3">
            {certifications.map((cert, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                {cert}
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  );
}

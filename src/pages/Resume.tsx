import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const experience = [
  {
    role: 'Full Stack Developer',
    company: 'TechCorp Inc.',
    period: '2023 – Present',
    description: 'Building scalable web applications using React, Node.js, and cloud services. Leading a team of 4 developers on client-facing projects.',
  },
  {
    role: 'Frontend Developer',
    company: 'StartupXYZ',
    period: '2021 – 2023',
    description: 'Developed responsive interfaces and design systems. Improved page load times by 40% through optimization.',
  },
  {
    role: 'Junior Developer',
    company: 'Digital Agency Co.',
    period: '2020 – 2021',
    description: 'Built websites and web apps for various clients. Gained experience with modern JavaScript frameworks.',
  },
];

const education = [
  {
    degree: 'B.Tech in Computer Science',
    school: 'National Institute of Technology',
    period: '2016 – 2020',
    description: 'Graduated with distinction. Focused on software engineering and data structures.',
  },
];

const certifications = [
  'AWS Certified Solutions Architect',
  'Google Cloud Professional Developer',
  'Meta Front-End Developer Certificate',
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
            <h1 className="font-display text-4xl font-bold mb-2">Resume</h1>
            <p className="text-muted-foreground">My professional journey so far.</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Download CV
          </Button>
        </motion.div>

        {/* Experience */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="mb-16">
          <h2 className="font-display text-xl font-bold mb-8 uppercase tracking-wider text-muted-foreground text-sm">Experience</h2>
          <div className="space-y-8">
            {experience.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative pl-6 border-l-2 border-border">
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-foreground" />
                <p className="text-xs text-muted-foreground mb-1">{item.period}</p>
                <h3 className="font-display font-semibold text-lg">{item.role}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="mb-16">
          <h2 className="font-display text-xl font-bold mb-8 uppercase tracking-wider text-muted-foreground text-sm">Education</h2>
          <div className="space-y-8">
            {education.map((item, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-border">
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-foreground" />
                <p className="text-xs text-muted-foreground mb-1">{item.period}</p>
                <h3 className="font-display font-semibold text-lg">{item.degree}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.school}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-xl font-bold mb-8 uppercase tracking-wider text-muted-foreground text-sm">Certifications</h2>
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

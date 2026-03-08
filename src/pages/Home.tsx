import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-16 overflow-hidden">
      <div className="container max-w-6xl">
        <div className="relative flex flex-col items-center">
          {/* Top row: Name + Image + subtitle */}
          <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            {/* Left side - Name */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-left md:flex-1 md:text-right md:pr-8"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2 font-medium">
                Bhuvan N.R
              </p>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.85]">
                Creative
              </h1>
            </motion.div>

            {/* Center - Photo */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="relative z-10 flex-shrink-0"
            >
              <div className="w-48 h-60 md:w-56 md:h-72 rounded-2xl bg-secondary border border-border overflow-hidden flex items-center justify-center">
                <span className="text-muted-foreground text-xs">Photo</span>
              </div>
              {/* Hi bubble */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg"
              >
                <span className="text-primary-foreground font-display text-sm font-bold">Hi</span>
              </motion.div>
            </motion.div>

            {/* Right side - Title */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-left md:flex-1 md:pl-8"
            >
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.85]">
                Developer
              </h1>
              <p className="text-sm text-muted-foreground mt-3 max-w-[240px] leading-relaxed">
                A passionate developer crafting modern, performant digital experiences
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-16"
          >
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary border border-border text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:shadow-lg"
            >
              Learn more about me
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

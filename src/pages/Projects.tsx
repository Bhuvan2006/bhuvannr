import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const placeholderImg = '/placeholder.svg';

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <h1 className="font-display text-4xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">A selection of things I've built.</p>
        </motion.div>

        {isLoading ? (
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
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img src={project.image_url || placeholderImg} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-semibold text-lg">{project.title}</h3>
                    <div className="flex gap-1.5 shrink-0">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No projects yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}

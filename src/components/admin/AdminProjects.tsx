import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function AdminProjects() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', image_url: '', tags: '', link: '', github_url: '' });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').order('display_order');
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('projects').insert({
        title: form.title,
        description: form.description,
        image_url: form.image_url || null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
        link: form.link || null,
        github_url: form.github_url || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setForm({ title: '', description: '', image_url: '', tags: '', link: '', github_url: '' });
      setOpen(false);
      toast.success('Project added!');
    },
    onError: () => toast.error('Failed to add project'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted');
    },
  });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 gap-2"><Plus className="h-4 w-4" /> Add Project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Project</DialogTitle></DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); addMutation.mutate(); }} className="space-y-3">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
            <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            <Input placeholder="Live URL" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
            <Input placeholder="GitHub URL" value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} />
            <Button type="submit" disabled={addMutation.isPending}>{addMutation.isPending ? 'Adding...' : 'Add'}</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-3">
        {projects?.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(p.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

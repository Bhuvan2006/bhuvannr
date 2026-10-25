import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminProjects from '@/components/admin/AdminProjects';
import AdminBlog from '@/components/admin/AdminBlog';
import AdminLeads from '@/components/admin/AdminLeads';

export default function Admin() {
  const { isAdmin, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!isAdmin) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <h1 className="font-sans text-3xl font-bold mb-8 text-balance">Admin Dashboard</h1>
        <Tabs defaultValue="projects">
          <TabsList className="mb-6">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>
          <TabsContent value="projects"><AdminProjects /></TabsContent>
          <TabsContent value="blog"><AdminBlog /></TabsContent>
          <TabsContent value="leads"><AdminLeads /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

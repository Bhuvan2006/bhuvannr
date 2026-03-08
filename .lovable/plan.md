

## Personal Brand Website — Implementation Plan

### 1. Design & Theme
- **Dark & modern** theme with bold accent colors, clean typography, and subtle animations
- Consistent dark background with contrasting text and accent highlights throughout

### 2. Landing / About Page
- Hero section with your name, title/tagline, and a brief intro
- About section with a longer bio, skills/expertise, and a professional photo placeholder
- Social media links (GitHub, LinkedIn, Twitter, etc.)

### 3. Projects Page
- Grid/card layout showcasing your projects
- Each card: title, description, image, tech tags, and external link
- Projects managed via Supabase database (admin can add/edit/remove)

### 4. Blog/Articles Page
- List of blog posts with title, date, excerpt, and featured image
- Full article detail view with rich text content
- **Admin-only**: Create, edit, and delete articles (protected by role-based access)

### 5. Admin Authentication & Roles
- Admin login page for you to manage content
- Role-based access using a `user_roles` table in Supabase (secure, server-side role checks)
- Only admin can create/edit/delete blog posts and projects

### 6. Visitor Lead Capture Popup
- Small, non-intrusive popup for non-logged-in visitors after a short delay
- Collects **Name + Email**
- Stored in a `leads` table in Supabase so you can follow up about products/blogs

### 7. Navigation
- Sticky top nav bar with links: Home, Projects, Blog
- Mobile-responsive hamburger menu

### 8. Backend (Supabase via Lovable Cloud)
- **Tables**: `projects`, `blog_posts`, `leads`, `profiles`, `user_roles`
- **Auth**: Supabase Auth with email/password for admin
- **RLS**: Secure policies so only admin can write content, visitors can read


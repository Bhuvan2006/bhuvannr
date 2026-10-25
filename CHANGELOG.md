# CHANGELOG

All notable changes to the portfolio project are documented in this file.

## [Unreleased] — Premium Apple-inspired UI upgrade

### Done
- Typography: all `font-display` classes → `font-sans` (Geist Sans) across Navbar, Admin, Blog, BlogPost, Contact, Index, Projects, Resume (21 replacements); `text-balance` on display headings for clean wrapping
- Design: refined neutral surfaces, subtle borders, excellent contrast, minimal & premium; no glassmorphism or glowing effects
- Blog: `.prose` readable typography, 65ch measure, heading hierarchy preserved; every article's content unchanged
- Verification: `tsc --noEmit` passed, lint introduces no new errors, `npm run build` passed with Geist fonts bundled

# Bhuvan N.R — portfolio (v2)

React + Vite, GSAP ScrollTrigger, Lenis and Framer Motion. Editorial dark theme with № section markers.
v2 removed the 3D scene, custom cursor and preloader for a simpler, faster site.

Motion: one IntersectionObserver adds `.is-in` to every `[data-reveal]` element and CSS animates
transform/opacity only. GSAP is used for two scrubbed effects (hero wordmark, About statement).
Lenis smooth scroll is off on touch devices and for reduced-motion users.

## Run it

```powershell
cd C:\Users\bhuva\Desktop\portfolio_latest
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Edit content — `src/content/site.js`

Everything on the page lives in one file: profile, about text, projects (GitHub / live links, tags,
optional screenshot), experience, tech stack, achievements, services, packages, prompt store,
payments and nav. Leave a link empty (`''`) and the UI hides it.

- **Project screenshots:** put an image in `public/images/projects/` and set `image: '/images/projects/name.webp'`.
  Without one, each card shows an animated generative preview tinted by its `hue`.
- **Showcase sites:** `services.showcase` — set `live: 'https://…'` once a site is deployed.
- **Portrait:** `public/images/bhuvan-portrait.webp`.
- **Resume:** `public/resume.pdf` (linked from the nav, About and footer). Replace the file to update it.
- **Project filters:** `projectFilters` and each project's `filters` array.

## Turning the Services page off

`features.services` in `src/content/site.js` controls the whole freelance side: the `/services` page
(showcase, packages, ₹20 prompt store), its nav/footer link, the Expertise card that links to it and the
"Website project" / "Design prompt" options in the contact form. Set it to `false` and all of it disappears;
the home page never shows prices or prompts either way.

## Blog — `src/content/blog/`

Drop in a `.tex` (Overleaf) or `.md` file and it appears on `/blog` and in the home "Writing" section.

- `.tex`: uses `\title{}`, `\date{}` and optional `\begin{abstract}`; math renders with KaTeX.
- `.md`: front-matter `title`, `date`, `excerpt`, `tags`; `$…$` and `$$…$$` math supported.
- Images go in `public/blog/images/` (`\includegraphics{cnn.png}` finds them automatically).

## Payments — Razorpay

Stripe is invite-only in India and not open to individuals, so the prompt store uses Razorpay
(UPI, cards, netbanking — money settles to your bank).

1. Sign up at razorpay.com and complete KYC. Razorpay checks that your site has the policy
   pages — they are at `/legal` (review the wording; it's a draft, not legal advice).
2. Dashboard → **Payment Pages** → Create → digital product, price **₹20**.
   Fields: Email (required), Phone, **Website type** (Portfolio / Restaurant–Café / Business landing /
   Personal brand / Other), **Describe what you want**.
3. Paste the published page link into `payments.promptPageUrl` in `src/content/site.js`.

Until that link is set, "Request for ₹20" opens a pre-filled email so requests still reach you.
Website builds are quote-on-request; send clients a Razorpay Payment Link for deposits.

## Contact form

Posts to FormSubmit (`contact.formEndpoint`) — no backend needed. **The first real submission sends a
one-time activation email to bhuvannr2006@gmail.com; click it once and messages flow to your inbox.**
If sending fails, the form offers a direct email link.

## Deploying — GitHub Pages + bhuvannr.in

1. Push this folder to a GitHub repo (branch `main`).
2. Repo → Settings → Pages → Source: **GitHub Actions**. `.github/workflows/deploy.yml` builds and deploys on every push.
3. Custom domain: `public/CNAME` already says `bhuvannr.in`. In Settings → Pages enter `bhuvannr.in`, then tick **Enforce HTTPS** once the certificate is ready.
4. DNS at your domain registrar:
   - `A` records for `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME` for `www` → `<your-github-username>.github.io`
5. `npm run build` also writes `dist/404.html` (a copy of index.html), so links like `/blog/cnn` work on refresh.

## Analytics — Umami (visitors, time on site, what they click)

1. Sign up free at https://cloud.umami.is/signup → Add website → `bhuvannr.in`.
2. Copy the Website ID into `analytics.umamiWebsiteId` in `src/content/site.js`, then push.
3. Watch traffic in the Umami dashboard: visitors, page views, average visit duration, referrers, countries, devices.

Only visits on `bhuvannr.in` are counted, so testing on localhost never shows up in your stats.
Custom events you will see under **Events**:
`section-view` (which sections were read), `resume-download`, `project-github`, `contact-sent`,
`email-click`, `quote-request`, `prompt-buy-click`, `github-profile`.

## Structure

```
src/
  content/site.js       ← all editable content
  content/blog/         ← blog posts (.tex / .md)
  sections/             ← Hero, About, Projects (Work), Experience, TechStack (Expertise), Achievements, Services, Writing, Contact
  pages/                ← BlogIndex, BlogPost, Legal
  components/           ← Nav, Footer, SectionHead, Curtain (route fade), Magnetic, SplitText, Link
  lib/                  ← scroll (Lenis), reveal (IntersectionObserver), analytics (Umami), router, blog loader, LaTeX renderer

Unused since v2 (safe to delete): vercel.json, public/_redirects, src/three/, src/components/Cursor.jsx, Preloader.jsx, ScrollProgress.jsx.
After pulling v2 you can also run `npm uninstall three @react-three/fiber`.
```

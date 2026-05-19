# Nguyen Huynh Minh Tri Portfolio

Personal portfolio website for Nguyen Huynh Minh Tri, a fullstack website developer based in Ho Chi Minh City, Vietnam. The site presents selected projects, case studies, working approach, profile details, and contact links.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Motion
- GSAP
- Lenis

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

- `dev`: starts the local Next.js development server.
- `lint`: runs ESLint.
- `build`: creates a production build.
- `start`: serves the production build locally after `npm run build`.

## Project Structure

```text
app/                  App Router routes, layouts, metadata, and generated OG image
components/home/      Homepage sections
components/layouts/   Shared layout components
components/motion/    Reveal and animation helpers
lib/                  Project data and helpers
public/               Local images and static assets
```

## Deployment

The project is ready for deployment on Vercel or any platform that supports Next.js.

For production metadata, set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Then run:

```bash
npm run build
```

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

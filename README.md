# LMS Frontend

A Next.js 16 frontend for the Learning Management System (LMS) with:

- A public-facing site for course browsing and student enrollment.
- Separate dashboards for students, instructors, and administrators.
- Rich text editing for course content with Tiptap editor.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Tiptap rich text editor
- ESLint 9

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env.local
```

3. Set required variables in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NODE_ENV=development
```

4. Run the development server:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Run dev server.
- `npm run build`: Build production bundle.
- `npm run start`: Start production server.
- `npm run lint`: Run ESLint.

## Project Structure

- `app/(customer)`: Public pages for course browsing.
- `app/admin/(auth)`: Admin authentication pages.
- `app/admin/(dashboard)`: Admin dashboard pages and routes.
- `app/student`: Student dashboard and enrolled courses.
- `app/instructor`: Instructor dashboard and course management.
- `components/`: Reusable UI components.
- `lib/api`: API helper utilities for backend communication.
- `proxy.ts`: Auth guard logic for protected routes.

## Authentication Notes

- Uses Laravel Sanctum token-based authentication.
- Different token storage for admin, instructor, and student roles.
- Proxy protects `/admin`, `/student`, and `/instructor` routes.

## Deployment Notes

- Ensure `NEXT_PUBLIC_API_BASE_URL` points to your live Laravel backend API.
- Use HTTPS in production for secure authentication.
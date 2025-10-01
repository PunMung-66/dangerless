# 🛡️ Dangerless

An application for providing travelers with real-time neighborhood safety ratings and local safety news alerts.

## Quick Start

1. **Clone and install**

   ```bash
   git clone https://github.com/parunchxi/dangerless.git
   cd dangerless
   npm install
   ```

2. **Set up environment**

   ```bash
   cp .env.example .env.local
   ```

   Add your Supabase credentials to `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your_supabase_anon_key
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

## Features (Planned)

- 🗺️ **Real-time Safety Map** - Interactive map with red zone overlays
- 🔐 **Google OAuth Authentication** - Secure user authentication
- 📢 **Community Alerts** - Local safety news and reports
- 📊 **Historical Analysis** - Safety trend analysis over time
- 🏠 **Neighborhood Monitoring** - Area-specific safety ratings

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + PostGIS)
- **Authentication:** Supabase Auth with Google OAuth
- **UI Components:** shadcn/ui
- **Deployment:** Vercel

## Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Project Structure

```
app/
├── page.tsx         # Landing page
├── dashboard/       # Main application
├── protected/       # User area
└── auth/           # Authentication

components/
├── auth-button.tsx # Authentication
├── hero.tsx        # Landing hero
└── ui/             # UI components

lib/
├── supabase/       # Database client
└── utils.ts        # Utilities
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` and `npm run type-check`
5. Submit a pull request

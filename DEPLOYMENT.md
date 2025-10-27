# Deployment Instructions for MU CRM

## Prerequisites
- Node.js installed (v16 or higher)
- A Vercel account (free tier works)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open browser:
Navigate to `http://localhost:5173`

## Deploy to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and Vercel will deploy your app!

### Method 2: Using GitHub + Vercel Dashboard

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)

3. Click "Add New Project"

4. Import your GitHub repository

5. Vercel will auto-detect Vite configuration

6. Click "Deploy"

That's it! Your app will be live in minutes.

## Build for Production

To create a production build locally:
```bash
npm run build
```

The build output will be in the `dist` folder.

## Project Structure

```
mu-crm/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable components (Navbar)
│   ├── pages/        # Page components
│   ├── App.jsx       # Main app component with routing
│   ├── main.jsx      # Entry point
│   └── index.css     # Global styles
├── index.html        # HTML template
├── package.json      # Dependencies
├── vite.config.js    # Vite configuration
└── vercel.json       # Vercel deployment config
```

## Features Implemented

✅ All 10 pages with mock data
✅ Animated midnight black theme with blue accents
✅ Responsive design with mobile navigation
✅ Mock emails: email@example.com
✅ Mock phone numbers: 11111111
✅ Ready for Vercel deployment

## Notes

- No server-side code required
- All data is mock data (no API calls)
- Vercel auto-detects Vite and handles SPA routing
- Mobile-friendly with hamburger menu


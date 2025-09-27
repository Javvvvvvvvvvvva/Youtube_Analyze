# YouTube Analytics Dashboard

A modern, feature-rich YouTube channel analytics tool built with Next.js, TypeScript, and TailwindCSS. Analyze any YouTube channel's performance, revenue estimates, and get AI-powered insights.

## ✨ Features

- **Real-time Analytics**: Get live data from YouTube Data API
- **AI-Powered Insights**: Smart recommendations based on channel performance
- **Advanced Visualizations**: Interactive charts with line/area views
- **Multi-language Support**: English, Korean, and Chinese
- **Data Export**: CSV and HTML report generation
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Beautiful theme switching
- **Revenue Estimates**: Conservative, base, and aggressive projections

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📊 Analytics Features

### Core Metrics
- Subscriber count and growth
- Total and recent view counts
- Upload frequency analysis
- Average video duration
- Engagement rate calculations

### Advanced Analytics
- Trending topics analysis
- Content strategy insights
- Revenue potential assessment
- Growth trend analysis
- Performance benchmarking

### AI Insights
- Engagement rate recommendations
- Upload frequency optimization
- Content strategy suggestions
- Revenue optimization tips
- Growth trend analysis

## 🌍 Internationalization

- **English**: Complete professional analytics
- **Korean**: 한국어 지원
- **Chinese**: 中文支持

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- YouTube Data API key

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd youtube-analytics
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment setup
Create a `.env.local` file in the root directory:
```env
YOUTUBE_API_KEY=your_youtube_data_api_key_here
```

### 4. Get YouTube Data API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key to your `.env.local` file

### 5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `YOUTUBE_API_KEY`
   - Click "Deploy"

3. **Environment Variables**
   - `YOUTUBE_API_KEY`: Your YouTube Data API key

### Alternative Deployment Options

- **Netlify**: Similar process, add environment variables in site settings
- **Railway**: Connect GitHub repo, add environment variables
- **DigitalOcean App Platform**: Connect repo, configure environment

## 📁 Project Structure

```
youtube-analytics/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   ├── AdvancedAnalytics.tsx
│   ├── AIInsights.tsx
│   ├── AnalyticsDashboard.tsx
│   └── ...
├── contexts/             # React contexts
│   └── LanguageContext.tsx
├── lib/                  # Utilities
│   └── translations.ts
├── public/               # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### TailwindCSS
The project uses a custom Tailwind configuration with:
- Custom color palette
- Glass morphism effects
- Dark mode support
- Custom animations

### TypeScript
Strict TypeScript configuration with:
- Path aliases (`@/` for root)
- Strict type checking
- Next.js optimizations

## 📈 API Usage

The app uses YouTube Data API v3 to fetch:
- Channel information
- Video statistics
- View counts
- Engagement metrics

**Rate Limits**: YouTube API has quotas. The app is optimized to minimize API calls.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- YouTube Data API v3
- Next.js team
- TailwindCSS
- Recharts
- Framer Motion
- Lucide React

## 📞 Support

If you encounter any issues:
1. Check the [Issues](https://github.com/your-username/youtube-analytics/issues) page
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

---

**Made with ❤️ using Next.js and modern web technologies**

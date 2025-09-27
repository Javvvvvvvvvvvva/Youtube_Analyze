# Deployment Guide

This guide will help you deploy your YouTube Analytics Dashboard to Vercel and GitHub.

## Prerequisites

- GitHub account
- Vercel account (free)
- YouTube Data API key

## Step 1: Get YouTube Data API Key

1. **Go to Google Cloud Console**
   - Visit [console.cloud.google.com](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create or Select Project**
   - Click "Select a project" → "New Project"
   - Name it "YouTube Analytics" (or any name)
   - Click "Create"

3. **Enable YouTube Data API**
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"

4. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key
   - **Important**: Restrict the key to YouTube Data API v3

## Step 2: Prepare Files for GitHub

### Files to Include in GitHub:
```
youtube-analytics/
├── app/                    ✅ Include
├── components/             ✅ Include
├── contexts/               ✅ Include
├── lib/                    ✅ Include
├── public/                 ✅ Include (if exists)
├── .gitignore              ✅ Include
├── .env.example            ✅ Include
├── README.md               ✅ Include
├── DEPLOYMENT.md           ✅ Include
├── package.json            ✅ Include
├── package-lock.json       ✅ Include
├── next.config.js          ✅ Include
├── tailwind.config.js      ✅ Include
├── tsconfig.json           ✅ Include
├── postcss.config.js       ✅ Include
└── next-env.d.ts           ❌ Don't include (auto-generated)
```

### Files to Exclude (handled by .gitignore):
- `node_modules/` - Dependencies
- `.next/` - Build output
- `.env.local` - Your API key (keep secret!)
- `*.tsbuildinfo` - TypeScript cache

## Step 3: Create GitHub Repository

1. **Create New Repository**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name: `youtube-analytics` (or your choice)
   - Description: "YouTube Analytics Dashboard with AI insights"
   - Make it **Public** (for free Vercel deployment)
   - **Don't** initialize with README (we already have one)

2. **Push Your Code**
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit: YouTube Analytics Dashboard"
   
   # Add remote origin
   git remote add origin https://github.com/YOUR_USERNAME/youtube-analytics.git
   
   # Push to GitHub
   git push -u origin main
   ```

## Step 4: Deploy to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add: `YOUTUBE_API_KEY` = `your_actual_api_key_here`
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at: `https://your-project-name.vercel.app`

## Step 5: Verify Deployment

1. **Test Your App**
   - Visit your Vercel URL
   - Try analyzing a YouTube channel
   - Check if all features work

2. **Check Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Ensure `YOUTUBE_API_KEY` is set correctly

## Troubleshooting

### Common Issues:

1. **"API Key Invalid" Error**
   - Check if API key is correctly set in Vercel
   - Ensure YouTube Data API v3 is enabled
   - Verify API key restrictions

2. **Build Fails**
   - Check Vercel build logs
   - Ensure all dependencies are in package.json
   - Verify TypeScript compilation

3. **App Loads but No Data**
   - Check browser console for errors
   - Verify API key is working locally
   - Check YouTube API quotas

### Debug Steps:
```bash
# Test locally first
npm run dev

# Check build locally
npm run build

# Test production build
npm start
```

## Monitoring

### Vercel Analytics
- Go to Vercel Dashboard → Your Project → Analytics
- Monitor performance and usage

### YouTube API Quotas
- Check [Google Cloud Console](https://console.cloud.google.com/)
- Monitor API usage and quotas
- Free tier: 10,000 units/day

## Updates

To update your deployed app:
```bash
# Make changes locally
git add .
git commit -m "Update: Add new feature"
git push origin main

# Vercel will automatically redeploy
```

## Success!

Your YouTube Analytics Dashboard is now live! 

**Next Steps:**
- Share your app with others
- Monitor usage and performance
- Add new features
- Consider custom domain

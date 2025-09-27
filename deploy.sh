#!/bin/bash

# YouTube Analytics Dashboard - Deployment Script
# This script helps you deploy to GitHub and Vercel

echo "🚀 YouTube Analytics Dashboard - Deployment Helper"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found"
    echo "📝 Please create .env.local with your YouTube API key:"
    echo "   YOUTUBE_API_KEY=your_api_key_here"
    echo ""
    read -p "Press Enter to continue after creating .env.local..."
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Deploy: YouTube Analytics Dashboard with AI insights"
    echo "✅ Changes committed"
fi

# Check if remote origin exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Remote origin already configured"
else
    echo "🔗 Please add your GitHub repository as remote origin:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/youtube-analytics.git"
    echo ""
    read -p "Press Enter after adding remote origin..."
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main
echo "✅ Pushed to GitHub"

echo ""
echo "🎉 Deployment to GitHub complete!"
echo ""
echo "📋 Next steps for Vercel deployment:"
echo "1. Go to https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Click 'New Project'"
echo "4. Import your repository"
echo "5. Add environment variable: YOUTUBE_API_KEY"
echo "6. Click 'Deploy'"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo "🌐 Your app will be live at: https://your-project-name.vercel.app"

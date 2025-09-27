'use client';

import { useState } from 'react';
import { Search, Loader2, BarChart3, Sparkles, TrendingUp, Users, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import LanguageToggle from '@/components/LanguageToggle';
import RefreshButton from '@/components/RefreshButton';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError('');
    setAnalyticsData(null);

    try {
      console.log('Fetching analytics for URL:', url);
      const response = await fetch(`/api/youtube/summary?url=${encodeURIComponent(url)}`);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch analytics');
      }

      setAnalyticsData(data);
      setError(''); // Clear any previous errors
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    setError('');

    try {
      console.log('Refreshing analytics for URL:', url);
      const response = await fetch(`/api/youtube/summary?url=${encodeURIComponent(url)}`);
      console.log('Refresh response status:', response.status);
      
      const data = await response.json();
      console.log('Refresh response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to refresh analytics');
      }

      setAnalyticsData(data);
      setError('');
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error refreshing analytics:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-display text-xl font-bold">
                <span className="gradient-text">{t.header.title}</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="hidden sm:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{t.header.channels}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{t.header.analytics}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{t.header.insights}</span>
                </div>
              </div>
              <LanguageToggle />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.hero.badge}</span>
          </motion.div>
          
          <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {t.hero.title}
            <br />
            <span className="gradient-text">{t.hero.titleHighlight}</span>
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
        </motion.div>

        {/* Analyze Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="glass-card p-8 rounded-3xl">
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl font-semibold mb-2">
                {t.form.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {t.form.subtitle}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t.form.placeholder}
                  className="input-field w-full pl-12 pr-4 py-4 text-lg"
                  disabled={isLoading}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.form.analyzingButton}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>{t.form.analyzeButton}</span>
                  </div>
                )}
              </button>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              >
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
              </motion.div>
            )}

            <div className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                {t.form.supportedFormats}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>{t.form.channelFormat}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>{t.form.customFormat}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>{t.form.handleFormat}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span>{t.form.videoFormat}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

            {/* Analytics Dashboard */}
            {analyticsData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-200">
                    Analytics Dashboard
                  </h2>
                  <RefreshButton 
                    onRefresh={handleRefresh}
                    isRefreshing={isLoading}
                    lastUpdated={lastUpdated || undefined}
                  />
                </div>
                <AnalyticsDashboard data={analyticsData} />
              </motion.div>
            )}
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-slate-400" />
                  <span className="font-display text-lg font-semibold text-slate-600 dark:text-slate-400">
                    {t.header.title} Dashboard
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-500 max-w-2xl mx-auto">
                  {t.footer.disclaimer}
                </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Clock, TrendingUp, Hash, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdvancedAnalyticsProps {
  data: {
    totalLikes: number;
    totalComments: number;
    avgEngagementRate: number;
    avgDurationMinutes: number;
    trendingTopics: string[];
    uploadFrequency: number;
    totalVideos: number;
  };
}

export default function AdvancedAnalytics({ data }: AdvancedAnalyticsProps) {
  const { t } = useLanguage();
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Engagement Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">{t.advancedAnalytics.totalLikes}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t.advancedAnalytics.allTimeEngagement}</p>
            </div>
          </div>
          <div className="text-3xl font-bold font-display bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            {formatNumber(data.totalLikes)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">{t.advancedAnalytics.totalComments}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t.advancedAnalytics.communityInteraction}</p>
            </div>
          </div>
          <div className="text-3xl font-bold font-display bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {formatNumber(data.totalComments)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">{t.advancedAnalytics.engagementRate}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t.advancedAnalytics.likesCommentsViews}</p>
            </div>
          </div>
          <div className="text-3xl font-bold font-display bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {data.avgEngagementRate}%
          </div>
        </motion.div>
      </div>

      {/* Content Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">{t.advancedAnalytics.avgVideoDuration}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t.advancedAnalytics.contentLengthAnalysis}</p>
            </div>
          </div>
          <div className="text-3xl font-bold font-display bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            {formatDuration(data.avgDurationMinutes)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">{t.advancedAnalytics.uploadFrequency}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t.advancedAnalytics.videosPerWeek}</p>
            </div>
          </div>
          <div className="text-3xl font-bold font-display bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            {data.uploadFrequency}
          </div>
        </motion.div>
      </div>

      {/* Trending Topics */}
      {data.trendingTopics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">{t.advancedAnalytics.trendingTopics}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t.advancedAnalytics.mostUsedTags}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {data.trendingTopics.map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-full border border-indigo-200 dark:border-indigo-700"
              >
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  #{topic}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

'use client';

import { Users, Eye, TrendingUp, Video, Calendar, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import KPICard from './KPICard';
import RevenueCard from './RevenueCard';
import ViewsChart from './ViewsChart';
import EnhancedChart from './EnhancedChart';
import AdvancedAnalytics from './AdvancedAnalytics';
import ExportData from './ExportData';
import AIInsights from './AIInsights';
import { useLanguage } from '@/contexts/LanguageContext';

interface AnalyticsData {
  channelTitle: string;
  subscriberCount: number;
  totalViewCount: number;
  views30d: number;
  views90d: number;
  uploads90d: number;
  avgViewsLast10: number;
  viewSeries: Array<{ date: string; views: number }>;
  // Advanced analytics
  totalLikes: number;
  totalComments: number;
  avgEngagementRate: number;
  avgDurationMinutes: number;
  trendingTopics: string[];
  uploadFrequency: number;
  totalVideos: number;
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export default function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const { t } = useLanguage();
  // Calculate revenue estimates based on RPM bands
  const calculateRevenue = (views: number, rpm: number) => {
    return (views / 1000) * rpm;
  };

  const monthlyRevenueEstimates = {
    conservative: calculateRevenue(data.views30d, 1.5),
    base: calculateRevenue(data.views30d, 3),
    aggressive: calculateRevenue(data.views30d, 6),
  };

  const yearlyRevenueEstimates = {
    conservative: monthlyRevenueEstimates.conservative * 12,
    base: monthlyRevenueEstimates.base * 12,
    aggressive: monthlyRevenueEstimates.aggressive * 12,
  };

  // Calculate sponsorship estimates based on CPM bands
  const calculateSponsorship = (avgViews: number, cpm: number) => {
    return (avgViews / 1000) * cpm;
  };

  const sponsorshipEstimates = {
    conservative: calculateSponsorship(data.avgViewsLast10, 5),
    base: calculateSponsorship(data.avgViewsLast10, 15),
    aggressive: calculateSponsorship(data.avgViewsLast10, 30),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      {/* Channel Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass-card p-8 rounded-3xl"
      >
        <div className="flex items-center gap-6 mb-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
            <PlayCircle className="w-8 h-8 text-white" />
          </div>
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight gradient-text mb-2">
                  {data.channelTitle}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  {t.header.title} Dashboard
                </p>
              </div>
        </div>
        
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
            <KPICard
              title={t.kpi.subscribers}
              value={data.subscriberCount}
              icon={<Users className="w-6 h-6" />}
            />
        <KPICard
          title={t.kpi.totalViews}
          value={data.totalViewCount}
          icon={<Eye className="w-6 h-6" />}
        />
        <KPICard
          title={t.kpi.dailyAvgViews}
          value={Math.round(data.views30d / 30)}
          subtitle={t.kpi.last30Days}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <KPICard
          title={t.kpi.avgViewsPerVideo}
          value={Math.round(data.avgViewsLast10)}
          subtitle={t.kpi.last10Videos}
          icon={<Video className="w-6 h-6" />}
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-8"
      >
        {/* Views Chart */}
        <EnhancedChart 
          data={data.viewSeries} 
          title={t.charts.viewsOverTime}
          subtitle={t.charts.weeklyViewTotals}
          chartType="line"
        />
        
        {/* Advanced Analytics */}
        <AdvancedAnalytics 
          data={{
            totalLikes: data.totalLikes,
            totalComments: data.totalComments,
            avgEngagementRate: data.avgEngagementRate,
            avgDurationMinutes: data.avgDurationMinutes,
            trendingTopics: data.trendingTopics,
            uploadFrequency: data.uploadFrequency,
            totalVideos: data.totalVideos
          }}
        />
      </motion.div>

      {/* View Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8 rounded-3xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-1">
                    {t.performance.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {t.performance.subtitle}
                  </p>
                </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700">
              <div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{t.performance.days30}</span>
                <div className="text-xs text-blue-600 dark:text-blue-400">{t.performance.recentPerformance}</div>
              </div>
              <span className="text-xl font-bold text-blue-900 dark:text-blue-100">
                {data.views30d.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700">
              <div>
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">{t.performance.days90}</span>
                <div className="text-xs text-purple-600 dark:text-purple-400">{t.performance.quarterlyView}</div>
              </div>
              <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
                {data.views90d.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700">
              <div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">{t.performance.dailyAverage}</span>
                <div className="text-xs text-green-600 dark:text-green-400">{t.performance.last30Days}</div>
              </div>
              <span className="text-xl font-bold text-green-900 dark:text-green-100">
                {Math.round(data.views30d / 30).toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Revenue & Sponsorship Estimates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
            <RevenueCard
              title={t.revenue.monthlyAdRevenue}
              estimates={monthlyRevenueEstimates}
              tooltip={t.revenue.monthlyTooltip}
              helpLink="https://support.google.com/youtube/answer/72857"
              conservativeLabel={t.revenue.conservative}
              baseLabel={t.revenue.base}
              aggressiveLabel={t.revenue.aggressive}
            />
            
            <RevenueCard
              title={t.revenue.yearlyAdRevenue}
              estimates={yearlyRevenueEstimates}
              tooltip={t.revenue.yearlyTooltip}
              helpLink="https://support.google.com/youtube/answer/72857"
              conservativeLabel={t.revenue.conservative}
              baseLabel={t.revenue.base}
              aggressiveLabel={t.revenue.aggressive}
            />
      </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <RevenueCard
              title={t.revenue.perVideoSponsorship}
              estimates={sponsorshipEstimates}
              tooltip={t.revenue.sponsorshipTooltip}
              conservativeLabel={t.revenue.conservative}
              baseLabel={t.revenue.base}
              aggressiveLabel={t.revenue.aggressive}
            />
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <AIInsights data={data} />
          </motion.div>

          {/* Data Export */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <ExportData data={data} />
          </motion.div>
    </motion.div>
  );
}

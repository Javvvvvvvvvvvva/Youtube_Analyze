'use client';

import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, Clock, Users, Zap, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AIInsightsProps {
  data: {
    channelTitle: string;
    subscriberCount: number;
    totalViewCount: number;
    views30d: number;
    views90d: number;
    uploads90d: number;
    avgViewsLast10: number;
    totalLikes: number;
    totalComments: number;
    avgEngagementRate: number;
    avgDurationMinutes: number;
    trendingTopics: string[];
    uploadFrequency: number;
    totalVideos: number;
  };
}

interface Insight {
  type: 'success' | 'warning' | 'info' | 'tip';
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: string;
}

export default function AIInsights({ data }: AIInsightsProps) {
  const { t } = useLanguage();

  // AI-powered analysis logic
  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];

    // Engagement Analysis
    if (data.avgEngagementRate > 4) {
      insights.push({
        type: 'success',
        icon: <CheckCircle className="w-5 h-5" />,
        title: t.aiInsights.highEngagement.title,
        description: t.aiInsights.highEngagement.description,
        action: t.aiInsights.highEngagement.action
      });
    } else if (data.avgEngagementRate < 1.5) {
      insights.push({
        type: 'warning',
        icon: <AlertCircle className="w-5 h-5" />,
        title: t.aiInsights.lowEngagement.title,
        description: t.aiInsights.lowEngagement.description,
        action: t.aiInsights.lowEngagement.action
      });
    }

    // Upload Frequency Analysis
    if (data.uploadFrequency > 3) {
      insights.push({
        type: 'success',
        icon: <Clock className="w-5 h-5" />,
        title: t.aiInsights.highFrequency.title,
        description: t.aiInsights.highFrequency.description,
        action: t.aiInsights.highFrequency.action
      });
    } else if (data.uploadFrequency < 1) {
      insights.push({
        type: 'warning',
        icon: <AlertCircle className="w-5 h-5" />,
        title: t.aiInsights.lowFrequency.title,
        description: t.aiInsights.lowFrequency.description,
        action: t.aiInsights.lowFrequency.action
      });
    }

    // Video Duration Analysis
    if (data.avgDurationMinutes > 15) {
      insights.push({
        type: 'info',
        icon: <Clock className="w-5 h-5" />,
        title: t.aiInsights.longVideos.title,
        description: t.aiInsights.longVideos.description,
        action: t.aiInsights.longVideos.action
      });
    } else if (data.avgDurationMinutes < 5) {
      insights.push({
        type: 'tip',
        icon: <Lightbulb className="w-5 h-5" />,
        title: t.aiInsights.shortVideos.title,
        description: t.aiInsights.shortVideos.description,
        action: t.aiInsights.shortVideos.action
      });
    }

    // Growth Analysis
    const growthRate = data.views30d / (data.views90d / 3);
    if (growthRate > 1.2) {
      insights.push({
        type: 'success',
        icon: <TrendingUp className="w-5 h-5" />,
        title: t.aiInsights.growingChannel.title,
        description: t.aiInsights.growingChannel.description,
        action: t.aiInsights.growingChannel.action
      });
    }

    // Content Strategy Tips
    if (data.trendingTopics.length > 0) {
      insights.push({
        type: 'tip',
        icon: <Target className="w-5 h-5" />,
        title: t.aiInsights.contentStrategy.title,
        description: t.aiInsights.contentStrategy.description.replace('{topics}', data.trendingTopics.slice(0, 3).join(', ')),
        action: t.aiInsights.contentStrategy.action
      });
    }

    // Revenue Optimization
    const estimatedMonthlyRevenue = (data.views30d / 1000) * 3; // Conservative RPM
    if (estimatedMonthlyRevenue > 1000) {
      insights.push({
        type: 'success',
        icon: <Zap className="w-5 h-5" />,
        title: t.aiInsights.revenuePotential.title,
        description: t.aiInsights.revenuePotential.description,
        action: t.aiInsights.revenuePotential.action
      });
    }

    return insights.slice(0, 6); // Limit to 6 insights
  };

  const insights = generateInsights();

  const getInsightStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
          border: 'border-green-200 dark:border-green-700',
          icon: 'text-green-600 dark:text-green-400',
          title: 'text-green-900 dark:text-green-100',
          description: 'text-green-700 dark:text-green-300'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
          border: 'border-orange-200 dark:border-orange-700',
          icon: 'text-orange-600 dark:text-orange-400',
          title: 'text-orange-900 dark:text-orange-100',
          description: 'text-orange-700 dark:text-orange-300'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
          border: 'border-blue-200 dark:border-blue-700',
          icon: 'text-blue-600 dark:text-blue-400',
          title: 'text-blue-900 dark:text-blue-100',
          description: 'text-blue-700 dark:text-blue-300'
        };
      case 'tip':
        return {
          bg: 'bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
          border: 'border-purple-200 dark:border-purple-700',
          icon: 'text-purple-600 dark:text-purple-400',
          title: 'text-purple-900 dark:text-purple-100',
          description: 'text-purple-700 dark:text-purple-300'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20',
          border: 'border-slate-200 dark:border-slate-700',
          icon: 'text-slate-600 dark:text-slate-400',
          title: 'text-slate-900 dark:text-slate-100',
          description: 'text-slate-700 dark:text-slate-300'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Brain className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold mb-1">
            {t.aiInsights.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {t.aiInsights.subtitle}
          </p>
        </div>
      </div>

      {insights.length > 0 ? (
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const styles = getInsightStyles(insight.type);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border ${styles.bg} ${styles.border} hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.icon}`}>
                    {insight.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-2 ${styles.title}`}>
                      {insight.title}
                    </h4>
                    <p className={`text-sm leading-relaxed mb-3 ${styles.description}`}>
                      {insight.description}
                    </p>
                    {insight.action && (
                      <div className={`text-xs font-medium ${styles.description}`}>
                        💡 {insight.action}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Brain className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            {t.aiInsights.noInsights}
          </p>
        </div>
      )}

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 border border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb className="w-3 h-3 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-slate-100">{t.aiInsights.disclaimer.title}:</strong> {t.aiInsights.disclaimer.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

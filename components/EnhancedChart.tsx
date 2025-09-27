'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Activity, BarChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedChartProps {
  data: Array<{ date: string; views: number }>;
  title?: string;
  subtitle?: string;
  chartType?: 'line' | 'area';
}

export default function EnhancedChart({ 
  data, 
  title, 
  subtitle,
  chartType = 'line'
}: EnhancedChartProps) {
  const { t } = useLanguage();
  const [activeChart, setActiveChart] = useState<'line' | 'area'>(chartType);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
            {formatDate(label)}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formatNumber(payload[0].value)} views
            </p>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const maxValue = Math.max(...data.map(d => d.views));
  const minValue = Math.min(...data.map(d => d.views));
  const range = maxValue - minValue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold mb-1">
              {title || t.enhancedChart.viewsOverTime}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {subtitle || t.enhancedChart.interactiveViewAnalytics}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
          <motion.button
            onClick={() => setActiveChart('line')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeChart === 'line'
                ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BarChart3 className="w-4 h-4" />
            {t.enhancedChart.line}
          </motion.button>
          <motion.button
            onClick={() => setActiveChart('area')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeChart === 'area'
                ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Activity className="w-4 h-4" />
            {t.enhancedChart.area}
          </motion.button>
        </div>
      </div>

      {/* Chart Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{t.enhancedChart.peak}</p>
          <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
            {formatNumber(maxValue)}
          </p>
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700">
          <p className="text-sm font-medium text-green-700 dark:text-green-300">{t.enhancedChart.average}</p>
          <p className="text-xl font-bold text-green-900 dark:text-green-100">
            {formatNumber(data.reduce((sum, d) => sum + d.views, 0) / data.length)}
          </p>
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700">
          <p className="text-sm font-medium text-purple-700 dark:text-purple-300">{t.enhancedChart.range}</p>
          <p className="text-xl font-bold text-purple-900 dark:text-purple-100">
            {formatNumber(range)}
          </p>
        </div>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === 'line' ? (
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e2e8f0" 
                strokeWidth={1}
                opacity={0.3}
              />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                tickFormatter={formatNumber}
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b' }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '3 3' }}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="url(#gradient)" 
                strokeWidth={4}
                dot={{ 
                  fill: '#3b82f6', 
                  strokeWidth: 3, 
                  r: 6,
                  stroke: 'white',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
                activeDot={{ 
                  r: 8, 
                  stroke: '#3b82f6', 
                  strokeWidth: 3,
                  fill: 'white',
                  filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))'
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </LineChart>
          ) : (
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e2e8f0" 
                strokeWidth={1}
                opacity={0.3}
              />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                tickFormatter={formatNumber}
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b' }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '3 3' }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="url(#areaGradient)"
                fill="url(#areaGradient)"
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      
      {data.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center h-64 text-slate-500 dark:text-slate-400"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <BarChart3 className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium">{t.enhancedChart.noViewDataAvailable}</p>
            <p className="text-sm mt-1">{t.enhancedChart.tryDifferentChannel}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface ViewData {
  date: string;
  views: number;
}

interface ViewsChartProps {
  data: ViewData[];
  title?: string;
  subtitle?: string;
}

export default function ViewsChart({ data, title = "Views Over Time", subtitle }: ViewsChartProps) {
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
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1 font-medium">
            {formatDate(label)}
          </p>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {formatNumber(payload[0].value)} views
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-3xl"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <TrendingUp className="w-7 h-7 text-white" />
        </div>
            <div>
              <h3 className="font-display text-xl font-semibold mb-1">
                {title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {subtitle || "Weekly view totals for the last 90 days"}
              </p>
            </div>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
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
            <p className="text-lg font-medium">No view data available</p>
            <p className="text-sm mt-1">Try analyzing a different channel</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

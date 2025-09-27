'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
  isRefreshing?: boolean;
  lastUpdated?: Date;
}

export default function RefreshButton({ onRefresh, isRefreshing = false, lastUpdated }: RefreshButtonProps) {
  const { t } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRefresh = async () => {
    try {
      await onRefresh();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Refresh failed:', error);
    }
  };

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return t.refreshButton.justNow;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}${t.refreshButton.minutesAgo}`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}${t.refreshButton.hoursAgo}`;
    return `${Math.floor(diffInSeconds / 86400)}${t.refreshButton.daysAgo}`;
  };

  return (
    <div className="flex items-center gap-4">
      {lastUpdated && (
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {t.refreshButton.lastUpdated}: {formatLastUpdated(lastUpdated)}
        </div>
      )}
      
      <motion.button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
          isRefreshing 
            ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
            : showSuccess
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
        }`}
        whileHover={!isRefreshing ? { scale: 1.02 } : {}}
        whileTap={!isRefreshing ? { scale: 0.98 } : {}}
      >
        {isRefreshing ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>{t.refreshButton.refreshing}</span>
          </>
        ) : showSuccess ? (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>{t.refreshButton.updated}</span>
          </>
        ) : (
          <>
            <RefreshCw className="w-4 h-4" />
            <span>{t.refreshButton.refreshData}</span>
          </>
        )}
      </motion.button>
    </div>
  );
}

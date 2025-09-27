'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Table, Loader2, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExportDataProps {
  data: {
    channelTitle: string;
    subscriberCount: number;
    totalViewCount: number;
    views30d: number;
    views90d: number;
    uploads90d: number;
    avgViewsLast10: number;
    viewSeries: Array<{ date: string; views: number }>;
    totalLikes: number;
    totalComments: number;
    avgEngagementRate: number;
    avgDurationMinutes: number;
    trendingTopics: string[];
    uploadFrequency: number;
    totalVideos: number;
  };
}

export default function ExportData({ data }: ExportDataProps) {
  const { t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const exportToCSV = () => {
    setIsExporting(true);
    
    // Create CSV content
    const csvContent = [
      // Channel Overview
      ['Channel Analytics Report', ''],
      ['Channel Name', data.channelTitle],
      ['Generated Date', new Date().toLocaleDateString()],
      ['', ''],
      
      // Basic Stats
      ['Basic Statistics', ''],
      ['Subscribers', data.subscriberCount.toLocaleString()],
      ['Total Views', data.totalViewCount.toLocaleString()],
      ['Total Videos', data.totalVideos],
      ['', ''],
      
      // Performance Metrics
      ['Performance Metrics', ''],
      ['Views (30 days)', data.views30d.toLocaleString()],
      ['Views (90 days)', data.views90d.toLocaleString()],
      ['Uploads (90 days)', data.uploads90d],
      ['Avg Views/Video', Math.round(data.avgViewsLast10).toLocaleString()],
      ['Daily Avg Views', Math.round(data.views30d / 30).toLocaleString()],
      ['', ''],
      
      // Engagement Metrics
      ['Engagement Metrics', ''],
      ['Total Likes', data.totalLikes.toLocaleString()],
      ['Total Comments', data.totalComments.toLocaleString()],
      ['Engagement Rate', `${data.avgEngagementRate}%`],
      ['Avg Video Duration', `${Math.round(data.avgDurationMinutes)} minutes`],
      ['Upload Frequency', `${data.uploadFrequency} videos/week`],
      ['', ''],
      
      // Trending Topics
      ['Trending Topics', ''],
      ...data.trendingTopics.map(topic => [topic, '']),
      ['', ''],
      
      // Weekly View Data
      ['Weekly View Data', ''],
      ['Date', 'Views'],
      ...data.viewSeries.map(item => [item.date, item.views])
    ];

    const csvString = csvContent.map(row => row.join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${data.channelTitle.replace(/[^a-z0-9]/gi, '_')}_analytics.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const exportToPDF = () => {
    setIsExporting(true);
    
    // Create a simple HTML report
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>YouTube Analytics Report - ${data.channelTitle}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; }
          .section { margin: 30px 0; }
          .metric { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px; background: #f8fafc; border-radius: 8px; }
          .metric-label { font-weight: 600; color: #374151; }
          .metric-value { font-weight: bold; color: #1f2937; }
          .chart-placeholder { text-align: center; padding: 40px; background: #f1f5f9; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 40px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>YouTube Analytics Report</h1>
          <h2>${data.channelTitle}</h2>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
          <h3>Channel Overview</h3>
          <div class="metric">
            <span class="metric-label">Subscribers</span>
            <span class="metric-value">${data.subscriberCount.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Total Views</span>
            <span class="metric-value">${data.totalViewCount.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Total Videos</span>
            <span class="metric-value">${data.totalVideos}</span>
          </div>
        </div>
        
        <div class="section">
          <h3>Performance Metrics</h3>
          <div class="metric">
            <span class="metric-label">Views (30 days)</span>
            <span class="metric-value">${data.views30d.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Views (90 days)</span>
            <span class="metric-value">${data.views90d.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Daily Average Views</span>
            <span class="metric-value">${Math.round(data.views30d / 30).toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Average Views per Video</span>
            <span class="metric-value">${Math.round(data.avgViewsLast10).toLocaleString()}</span>
          </div>
        </div>
        
        <div class="section">
          <h3>Engagement Metrics</h3>
          <div class="metric">
            <span class="metric-label">Total Likes</span>
            <span class="metric-value">${data.totalLikes.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Total Comments</span>
            <span class="metric-value">${data.totalComments.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Engagement Rate</span>
            <span class="metric-value">${data.avgEngagementRate}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Average Video Duration</span>
            <span class="metric-value">${Math.round(data.avgDurationMinutes)} minutes</span>
          </div>
          <div class="metric">
            <span class="metric-label">Upload Frequency</span>
            <span class="metric-value">${data.uploadFrequency} videos per week</span>
          </div>
        </div>
        
        <div class="section">
          <h3>Trending Topics</h3>
          <p>${data.trendingTopics.join(', ')}</p>
        </div>
        
        <div class="chart-placeholder">
          <h4>Weekly View Trends</h4>
          <p>Chart data available in CSV export</p>
        </div>
        
        <div class="footer">
          <p>Report generated by YouTube Analytics Dashboard</p>
          <p>Data accuracy depends on YouTube API availability</p>
        </div>
      </body>
      </html>
    `;
    
    // Create and download HTML file (can be converted to PDF by browser)
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${data.channelTitle.replace(/[^a-z0-9]/gi, '_')}_analytics_report.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
          <Download className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold mb-1">
            {t.exportData.exportAnalyticsData}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {t.exportData.downloadComprehensiveReports}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          onClick={exportToCSV}
          disabled={isExporting}
          className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-200 ${
            isExporting
              ? 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700 hover:shadow-lg'
          }`}
          whileHover={!isExporting ? { scale: 1.02 } : {}}
          whileTap={!isExporting ? { scale: 0.98 } : {}}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <Table className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
              {t.exportData.csvExport}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t.exportData.rawDataSpreadsheet}
            </p>
          </div>
          {isExporting ? (
            <Loader2 className="w-5 h-5 animate-spin text-slate-500 ml-auto" />
          ) : exportSuccess ? (
            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
          ) : null}
        </motion.button>

        <motion.button
          onClick={exportToPDF}
          disabled={isExporting}
          className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-200 ${
            isExporting
              ? 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700 hover:shadow-lg'
          }`}
          whileHover={!isExporting ? { scale: 1.02 } : {}}
          whileTap={!isExporting ? { scale: 0.98 } : {}}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
              {t.exportData.htmlReport}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t.exportData.formattedReportSharing}
            </p>
          </div>
          {isExporting ? (
            <Loader2 className="w-5 h-5 animate-spin text-slate-500 ml-auto" />
          ) : exportSuccess ? (
            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
          ) : null}
        </motion.button>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong className="text-slate-900 dark:text-slate-100">{t.exportData.note}:</strong> {t.exportData.csvExportsInclude} 
          {t.exportData.htmlReportsFormatted} {t.exportData.convertedToPdf}
        </p>
      </div>
    </motion.div>
  );
}

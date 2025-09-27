import { Info, DollarSign, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface RevenueCardProps {
  title: string;
  estimates: {
    conservative: number;
    base: number;
    aggressive: number;
  };
  tooltip: string;
  helpLink?: string;
  conservativeLabel?: string;
  baseLabel?: string;
  aggressiveLabel?: string;
}

export default function RevenueCard({ 
  title, 
  estimates, 
  tooltip, 
  helpLink, 
  conservativeLabel = 'Conservative', 
  baseLabel = 'Base', 
  aggressiveLabel = 'Aggressive' 
}: RevenueCardProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const estimateItems = [
    {
      label: conservativeLabel,
      value: estimates.conservative,
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-300',
      description: 'Lower RPM/CPM estimates'
    },
    {
      label: baseLabel,
      value: estimates.base,
      icon: <DollarSign className="w-4 h-4" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-700 dark:text-purple-300',
      description: 'Typical RPM/CPM range'
    },
    {
      label: aggressiveLabel,
      value: estimates.aggressive,
      icon: <Zap className="w-4 h-4" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-700 dark:text-green-300',
      description: 'Higher RPM/CPM estimates'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-3xl"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <DollarSign className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold mb-1">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Revenue estimates based on industry averages
            </p>
          </div>
        </div>
        
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            <Info className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </motion.button>
          <div className="absolute bottom-full right-0 mb-3 w-80 p-4 glass-card border border-slate-200 dark:border-slate-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{tooltip}</p>
            {helpLink && (
              <a 
                href={helpLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline mt-2 inline-block text-sm font-medium"
              >
                Learn more about YouTube monetization →
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {estimateItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                <div className="text-white">
                  {item.icon}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.bgColor} ${item.textColor}`}>
                    {item.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-display text-green-600 dark:text-green-400">
                {formatCurrency(item.value)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 border border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="w-3 h-3 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-slate-100">Important:</strong> These are rough estimates based on industry averages. 
              Actual revenue varies significantly by region, niche, audience demographics, 
              ad fill rates, and other factors. Use this data for informational purposes only.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

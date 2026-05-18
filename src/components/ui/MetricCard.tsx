import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  trend,
  color = 'text-ecotrophy-blue' 
}) => {
  return (
    <div className="glass-card p-6 flex flex-col transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-slate-50 ${color}`}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </span>
        )}
      </div>
      <span className="text-sm font-medium text-slate-500 mb-1">{label}</span>
      <span className="text-2xl font-bold text-ecotrophy-navy">{value}</span>
    </div>
  );
};

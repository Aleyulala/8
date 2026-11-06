import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface DashboardItemProps {
  name: string;
  value: number;
  icon: LucideIcon | React.FC<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
  subtitle?: string;
  onClick?: () => void;
}

export const DashboardItem: React.FC<DashboardItemProps> = ({
  name,
  value,
  icon: Icon,
  color = '#38bdf8',
  subtitle,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex items-center justify-between w-full rounded-2xl border border-transparent p-3.5 sm:p-4 bg-[#252526] hover:bg-[#28282b] shadow-sm transition-all duration-200 select-none ${
        onClick
          ? 'cursor-pointer hover:shadow-md hover:shadow-black/40 active:scale-[0.98]'
          : ''
      }`}
      style={{
        // subtle border accent on hover
      }}
    >
      <div 
        className="w-11 h-11 sm:w-12 sm:h-12 aspect-square flex justify-center items-center rounded-xl select-none shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ 
          backgroundColor: `${color}18`,
          border: `1px solid ${color}35`,
          boxShadow: `0 0 15px ${color}15`
        }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm" style={{ color }} />
      </div>
      <div className="ml-3 flex flex-col justify-center text-right flex-1 min-w-0">
        <p className="text-[#a1a1aa] text-xs uppercase tracking-wider font-semibold group-hover:text-white transition-colors truncate">
          {name}
        </p>
        <p 
          className="font-extralight text-2xl sm:text-3xl lg:text-4xl mt-0.5 font-mono tracking-tight"
          style={{ color }}
        >
          {value || 0}
        </p>
        {subtitle && (
          <p className="text-[10px] text-[#71717a] mt-0.5 truncate hidden sm:block">
            {subtitle}
          </p>
        )}
      </div>

      {onClick && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-3.5 h-3.5 text-[#71717a] group-hover:text-white" />
        </div>
      )}
    </div>
  );
};

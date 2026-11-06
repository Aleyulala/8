import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardItemProps {
  name: string;
  value: number;
  icon: LucideIcon;
  color?: string;
}

export const DashboardItem: React.FC<DashboardItemProps> = ({
  name,
  value,
  icon: Icon,
  color = '#38bdf8'
}) => {
  return (
    <div className="flex items-center justify-between w-full rounded-xl border border-[#404040] p-3.5 bg-gradient-to-tr from-[#333333]/50 to-50% to-[#262626] shadow-sm hover:border-[#525252] transition-colors">
      <div 
        className="w-13 h-13 aspect-square flex justify-center items-center rounded-xl select-none shrink-0"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon className="w-7 h-7 drop-shadow-sm" style={{ color }} />
      </div>
      <div className="ml-3 flex flex-col justify-center">
        <p className="text-[#a3a3a3] text-xs tracking-wider text-right font-medium">{name}</p>
        <p className="font-extralight text-3xl sm:text-4xl text-[#38bdf8] mt-0.5 text-right font-mono">
          {value || 0}
        </p>
      </div>
    </div>
  );
};

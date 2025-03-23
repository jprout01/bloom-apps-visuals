
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { StatCard as StatCardType } from '../../data/mockData';
import { counterAnimation } from '../../lib/animations';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  data: StatCardType;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ data, delay = 0 }) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const Icon = data.icon;

  useEffect(() => {
    const animate = counterAnimation(0, data.value);
    if (counterRef.current) {
      animate(counterRef.current);
    }
  }, [data.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white dark:bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{data.title}</p>
          <div className="flex items-baseline">
            <div ref={counterRef} className="text-3xl font-semibold mr-2">
              {data.value}
            </div>
            {data.change !== undefined && (
              <div className={cn(
                "flex items-center text-xs font-medium",
                data.changeType === 'positive' ? 'text-emerald-500' : 
                data.changeType === 'negative' ? 'text-rose-500' : 'text-muted-foreground'
              )}>
                {data.changeType === 'positive' ? (
                  <ArrowUp className="h-3 w-3 mr-0.5" />
                ) : data.changeType === 'negative' ? (
                  <ArrowDown className="h-3 w-3 mr-0.5" />
                ) : (
                  <Minus className="h-3 w-3 mr-0.5" />
                )}
                {Math.abs(data.change)}%
              </div>
            )}
          </div>
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          data.color && data.color.includes('blue') ? 'bg-blue-50 dark:bg-blue-900/20' :
          data.color && data.color.includes('amber') ? 'bg-amber-50 dark:bg-amber-900/20' :
          data.color && data.color.includes('emerald') ? 'bg-emerald-50 dark:bg-emerald-900/20' :
          data.color && data.color.includes('rose') ? 'bg-rose-50 dark:bg-rose-900/20' :
          'bg-secondary'
        )}>
          <Icon className={cn(
            "h-5 w-5",
            data.color || "text-foreground"
          )} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;

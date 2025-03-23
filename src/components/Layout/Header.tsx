
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center justify-between px-8 py-4 bg-white dark:bg-card border-b border-border dark:border-border/50",
        className
      )}
    >
      <div className="flex-1">
        <h1 className="text-xl font-semibold">Application Tracker</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative max-w-md w-full mr-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-background dark:bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
        </Button>
        
        <Button className="ml-2">
          <Plus className="h-4 w-4 mr-1" /> New Application
        </Button>
        
        <div className="ml-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <span className="text-sm font-medium">JD</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

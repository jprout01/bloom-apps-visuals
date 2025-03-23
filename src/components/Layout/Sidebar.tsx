
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Cog, Grid, HelpCircle, LayoutDashboard, LogOut, MessageSquare, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Briefcase, label: 'Applications' },
  { icon: MessageSquare, label: 'Interviews' },
  { icon: Calendar, label: 'Calendar' },
  { icon: Users, label: 'Companies' },
  { icon: Grid, label: 'Stats' },
];

const bottomNavItems: NavItem[] = [
  { icon: HelpCircle, label: 'Help' },
  { icon: Cog, label: 'Settings' },
  { icon: LogOut, label: 'Logout' }
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "h-screen py-4 w-64 bg-white dark:bg-card border-r border-border dark:border-border/50 flex flex-col justify-between",
        className
      )}
    >
      <div>
        <div className="px-6 py-6">
          <h1 className="text-xl font-bold">Bloom Apps</h1>
        </div>
        
        <nav className="mt-8 px-3">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href="#"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    item.active 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground hover:bg-secondary dark:hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="mt-auto border-t border-border dark:border-border/50 pt-4 px-3">
        <ul className="space-y-1">
          {bottomNavItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <a
                href="#"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  item.active 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-secondary dark:hover:bg-secondary/50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

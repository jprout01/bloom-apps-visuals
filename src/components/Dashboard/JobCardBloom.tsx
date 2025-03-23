
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { bloomAnimation, createParticles } from '../../lib/animations';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Job } from '@/data/mockData';

interface JobCardBloomProps {
  job: Job;
  index: number;
  isNew?: boolean;
}

const JobCardBloom: React.FC<JobCardBloomProps> = ({ job, index, isNew = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Stagger the initial appearance of cards
    const timeout = setTimeout(() => {
      setIsVisible(true);
      
      if (isNew && !hasAnimated) {
        setTimeout(() => {
          if (cardRef.current) {
            createParticles(cardRef.current, 12, ['#6366F1', '#8B5CF6', '#EC4899']);
            setHasAnimated(true);
          }
        }, 300);
      }
    }, index * 100);
    
    return () => clearTimeout(timeout);
  }, [index, isNew, hasAnimated]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'status-badge-applied';
      case 'Interview':
        return 'status-badge-interview';
      case 'Rejected':
        return 'status-badge-rejected';
      case 'Offer':
        return 'status-badge-offer';
      default:
        return 'status-badge-applied';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative bg-white dark:bg-card rounded-2xl p-6 overflow-hidden card-hoverable",
        isNew && "ring-1 ring-primary/30",
        !isVisible && "opacity-0"
      )}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      exit="exit"
      variants={isNew ? bloomAnimation : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
      }}
    >
      {isNew && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
            New
          </span>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          {job.companyLogo ? (
            <img 
              src={job.companyLogo} 
              alt={job.company} 
              className="h-8 w-8 object-contain"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-medium">
              {job.company.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{job.position}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div className={getStatusBadgeClass(job.status)}>
              {job.status}
            </div>
          </div>
          
          <div className="mt-3 flex items-center text-muted-foreground text-xs">
            <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
              {job.platform}
            </div>
            <div className="mx-2 h-1 w-1 rounded-full bg-muted-foreground"></div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Arrived {job.daysSinceArrival} days ago</span>
            </div>
          </div>
          
          {job.description && (
            <p className="mt-3 text-sm line-clamp-2 text-muted-foreground">
              {job.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobCardBloom;

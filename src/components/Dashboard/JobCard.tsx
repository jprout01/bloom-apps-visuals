
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Job } from '@/data/mockData';

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
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
      className="bg-white dark:bg-card rounded-2xl p-6 card-hoverable"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
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

export default JobCard;

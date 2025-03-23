
import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import StatCard from '@/components/Dashboard/StatCard';
import JobCard from '@/components/Dashboard/JobCard';
import JobCardBloom from '@/components/Dashboard/JobCardBloom';
import DemoControls from '@/components/Dashboard/DemoControls';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { 
  Calendar,
  Filter, 
  ListFilter, 
  RefreshCw, 
  Settings, 
  User, 
  Users
} from 'lucide-react';
import { jobs as initialJobs, stats, Job, JobStatus } from '@/data/mockData';
import { Button } from '@/components/ui/button';

// Function to get a random company logo
const getRandomCompanyLogo = () => {
  const logos = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/800px-IBM_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/800px-Firefox_logo%2C_2019.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/800px-Pinterest-logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Spotify_logo_without_text.svg/800px-Spotify_logo_without_text.svg.png',
  ];
  return logos[Math.floor(Math.random() * logos.length)];
};

// Function to create a new job application
const createNewJob = (): Job => {
  const positions = ['Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 'UI/UX Designer', 'Product Manager'];
  const platforms = ['LinkedIn', 'Indeed', 'Glassdoor', 'AngelList', 'Job-Rapido', 'ZipRecruiter'];
  const companies = ['Dropbox', 'Slack', 'Airbnb', 'Twilio', 'Stripe', 'Figma', 'Notion'];
  
  const randomPosition = positions[Math.floor(Math.random() * positions.length)];
  const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
  const randomCompany = companies[Math.floor(Math.random() * companies.length)];
  
  return {
    id: Date.now().toString(),
    company: randomCompany,
    companyLogo: getRandomCompanyLogo(),
    position: randomPosition,
    platform: randomPlatform,
    status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0],
    daysSinceArrival: 0,
    description: `Apply for the ${randomPosition} position at ${randomCompany}. Great opportunity to work with a talented team in a fast-paced environment.`,
    isNew: true,
    salary: '$120,000 - $150,000',
    location: 'San Francisco, CA',
    remote: Math.random() > 0.5,
  };
};

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [bloomingJobId, setBloomingJobId] = useState<string | null>(null);

  // Function to trigger the bloom effect for a new job application
  const handleTriggerBloom = useCallback(() => {
    const newJob = createNewJob();
    setJobs(prevJobs => [newJob, ...prevJobs]);
    setBloomingJobId(newJob.id);
    
    // Remove the blooming effect after a delay
    setTimeout(() => {
      setBloomingJobId(null);
    }, 3000);
  }, []);

  // Function to change the status of the first job
  const handleChangeStatus = useCallback((status: JobStatus) => {
    setJobs(prevJobs => {
      const updatedJobs = [...prevJobs];
      if (updatedJobs.length > 0) {
        updatedJobs[0] = { ...updatedJobs[0], status };
        toast(`Status changed to ${status}`, {
          description: `Job application for ${updatedJobs[0].position} at ${updatedJobs[0].company} updated.`,
        });
      }
      return updatedJobs;
    });
  }, []);

  // Function to reset the demo
  const handleResetDemo = useCallback(() => {
    setJobs(initialJobs);
    setBloomingJobId(null);
  }, []);

  // Auto-demo effect that triggers the bloom effect after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      handleTriggerBloom();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [handleTriggerBloom]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          <div className="container py-8 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-5 space-y-6">
                {/* Stats */}
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                >
                  {stats.map((stat, index) => (
                    <StatCard key={stat.id} data={stat} delay={index} />
                  ))}
                </motion.section>
                
                {/* Recent Applications */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Recent Applications</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <ListFilter className="h-4 w-4" /> Filter
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {jobs.map((job, index) => (
                      job.id === bloomingJobId ? (
                        <JobCardBloom key={job.id} job={job} index={index} isNew={true} />
                      ) : (
                        <JobCard key={job.id} job={job} index={index} />
                      )
                    ))}
                  </div>
                </section>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Demo Controls */}
                <DemoControls 
                  onTriggerBloom={handleTriggerBloom}
                  onChangeStatus={handleChangeStatus}
                  onResetDemo={handleResetDemo}
                />
                
                {/* Upcoming Events */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white dark:bg-card rounded-2xl p-6 shadow-soft"
                >
                  <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Interview with Apple</p>
                        <p className="text-xs text-muted-foreground">June 15, 2023 • 10:00 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="h-10 w-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Technical Assessment: Netflix</p>
                        <p className="text-xs text-muted-foreground">June 18, 2023 • 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View Calendar
                  </Button>
                </motion.div>
                
                {/* Application Statistics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white dark:bg-card rounded-2xl p-6 shadow-soft"
                >
                  <h3 className="font-semibold text-lg mb-4">Application Sources</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">LinkedIn</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary dark:bg-secondary/50 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Indeed</span>
                      <span className="text-sm font-medium">27%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary dark:bg-secondary/50 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '27%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Glassdoor</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary dark:bg-secondary/50 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other</span>
                      <span className="text-sm font-medium">13%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary dark:bg-secondary/50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '13%' }}></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

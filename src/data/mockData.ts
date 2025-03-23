
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  MessageSquare, 
  Users, 
  XCircle 
} from 'lucide-react';

export type JobStatus = 'Applied' | 'Interview' | 'Rejected' | 'Offer';

export interface Job {
  id: string;
  company: string;
  companyLogo?: string;
  position: string;
  platform: string;
  status: JobStatus;
  dateApplied: string;
  daysSinceArrival: number;
  description?: string;
  isNew?: boolean;
  salary?: string;
  location?: string;
  remote?: boolean;
  color?: string;
}

export interface StatCard {
  id: string;
  title: string;
  value: number;
  icon: any;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: string;
}

// Generate random job colors
const jobColors = [
  'bg-blue-50 dark:bg-blue-900/20',
  'bg-purple-50 dark:bg-purple-900/20',
  'bg-amber-50 dark:bg-amber-900/20',
  'bg-emerald-50 dark:bg-emerald-900/20',
  'bg-rose-50 dark:bg-rose-900/20',
  'bg-cyan-50 dark:bg-cyan-900/20',
];

// Sample job data
export const jobs: Job[] = [
  {
    id: '1',
    company: 'Google',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
    position: 'Programmer Analyst',
    platform: 'Job-Rapido',
    status: 'Applied',
    dateApplied: '2023-06-10',
    daysSinceArrival: 2,
    description: 'Google is looking for an experienced programmer analyst to join their team. The ideal candidate will have strong analytical skills and experience with data structures and algorithms.',
    isNew: true,
    salary: '$120,000 - $150,000',
    location: 'Mountain View, CA',
    remote: false,
    color: jobColors[0],
  },
  {
    id: '2',
    company: 'Apple',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png',
    position: 'Frontend Developer',
    platform: 'LinkedIn',
    status: 'Interview',
    dateApplied: '2023-06-05',
    daysSinceArrival: 5,
    description: 'Join our team to help build the next generation of Apple products. We are looking for a frontend developer with strong experience in React and TypeScript.',
    isNew: false,
    salary: '$130,000 - $160,000',
    location: 'Cupertino, CA',
    remote: false,
    color: jobColors[1],
  },
  {
    id: '3',
    company: 'Microsoft',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/800px-Microsoft_logo.svg.png',
    position: 'Software Engineer',
    platform: 'Indeed',
    status: 'Rejected',
    dateApplied: '2023-05-28',
    daysSinceArrival: 10,
    description: 'Help build innovative solutions at Microsoft. We need a software engineer with strong skills in C# and .NET.',
    isNew: false,
    salary: '$125,000 - $155,000',
    location: 'Redmond, WA',
    remote: false,
    color: jobColors[2],
  },
  {
    id: '4',
    company: 'Amazon',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/800px-Amazon_logo.svg.png',
    position: 'Backend Developer',
    platform: 'AngelList',
    status: 'Offer',
    dateApplied: '2023-05-15',
    daysSinceArrival: 12,
    description: 'Join Amazon Web Services to help build scalable cloud solutions. Experience with distributed systems and AWS is a plus.',
    isNew: false,
    salary: '$135,000 - $165,000',
    location: 'Seattle, WA',
    remote: true,
    color: jobColors[3],
  },
  {
    id: '5',
    company: 'Meta',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png',
    position: 'Full Stack Engineer',
    platform: 'Job-Rapido',
    status: 'Applied',
    dateApplied: '2023-06-08',
    daysSinceArrival: 3,
    description: 'Join the team building the next generation of social experiences at Meta. We are looking for a full stack engineer with experience in React and Node.js.',
    isNew: true,
    salary: '$140,000 - $170,000',
    location: 'Menlo Park, CA',
    remote: true,
    color: jobColors[4],
  },
  {
    id: '6',
    company: 'Netflix',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/800px-Netflix_2015_logo.svg.png',
    position: 'UI/UX Developer',
    platform: 'Glassdoor',
    status: 'Interview',
    dateApplied: '2023-06-01',
    daysSinceArrival: 7,
    description: 'Help build the future of streaming at Netflix. We are looking for a UI/UX developer with experience in designing and implementing responsive interfaces.',
    isNew: false,
    salary: '$145,000 - $175,000',
    location: 'Los Gatos, CA',
    remote: false,
    color: jobColors[5],
  },
];

// Statistics data
export const stats: StatCard[] = [
  {
    id: '1',
    title: 'Applications',
    value: 26,
    icon: Briefcase,
    change: 8,
    changeType: 'positive',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: '2',
    title: 'Interviews',
    value: 7,
    icon: MessageSquare,
    change: 2,
    changeType: 'positive',
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: '3',
    title: 'Offers',
    value: 3,
    icon: CheckCircle,
    change: 1,
    changeType: 'positive',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: '4',
    title: 'Rejections',
    value: 12,
    icon: XCircle,
    change: 3,
    changeType: 'negative',
    color: 'text-rose-600 dark:text-rose-400',
  },
];

export const recentActivities = [
  {
    id: '1',
    company: 'Google',
    action: 'Applied',
    date: '2 days ago',
  },
  {
    id: '2',
    company: 'Apple',
    action: 'Interview Scheduled',
    date: '3 days ago',
  },
  {
    id: '3',
    company: 'Netflix',
    action: 'Application Viewed',
    date: '4 days ago',
  },
];

export const upcomingEvents = [
  {
    id: '1',
    title: 'Interview with Apple',
    date: 'June 15, 2023',
    time: '10:00 AM',
  },
  {
    id: '2',
    title: 'Technical Assessment: Netflix',
    date: 'June 18, 2023',
    time: '2:00 PM',
  },
];

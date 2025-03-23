
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Paperclip, Play, Plus, Refresh, X } from 'lucide-react';
import { toast } from 'sonner';
import { JobStatus } from '@/data/mockData';

interface DemoControlsProps {
  onTriggerBloom: () => void;
  onChangeStatus: (status: JobStatus) => void;
  onResetDemo: () => void;
}

const DemoControls: React.FC<DemoControlsProps> = ({ 
  onTriggerBloom, 
  onChangeStatus,
  onResetDemo 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white dark:bg-card rounded-2xl p-6 shadow-soft"
    >
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Demo Controls</h3>
        
        <div className="grid gap-3">
          <Button 
            className="w-full flex items-center justify-start gap-2" 
            variant="outline"
            onClick={() => {
              onTriggerBloom();
              toast("New job application added!", {
                description: "A new job application has bloomed into your list.",
                icon: <Plus className="h-4 w-4 text-green-500" />,
              });
            }}
          >
            <Play className="h-4 w-4 mr-1" /> Trigger Bloom Effect
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="bg-status-applied/10 border-status-applied/30 hover:bg-status-applied/20 text-status-applied"
              onClick={() => onChangeStatus('Applied')}
            >
              <Paperclip className="h-4 w-4 mr-1" /> Applied
            </Button>
            <Button 
              variant="outline" 
              className="bg-status-interview/10 border-status-interview/30 hover:bg-status-interview/20 text-status-interview"
              onClick={() => onChangeStatus('Interview')}
            >
              <Paperclip className="h-4 w-4 mr-1" /> Interview
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="bg-status-rejected/10 border-status-rejected/30 hover:bg-status-rejected/20 text-status-rejected"
              onClick={() => onChangeStatus('Rejected')}
            >
              <X className="h-4 w-4 mr-1" /> Rejected
            </Button>
            <Button 
              variant="outline" 
              className="bg-status-offer/10 border-status-offer/30 hover:bg-status-offer/20 text-status-offer"
              onClick={() => onChangeStatus('Offer')}
            >
              <Check className="h-4 w-4 mr-1" /> Offer
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={() => {
              onResetDemo();
              toast("Demo reset", {
                description: "All job applications have been reset to their original state.",
              });
            }}
          >
            <Refresh className="h-4 w-4 mr-1" /> Reset Demo
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoControls;

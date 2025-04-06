
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";
import { Calendar, MapPin, Briefcase } from "lucide-react";

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
}

const JobCard = ({ job, onApply }: JobCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApply(job.id);
  };
  
  return (
    <div 
      className="bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={toggleExpand}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={job.company.logo}
                alt={job.company.name}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{job.company.name}</p>
              
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{job.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Posted {job.postedDate}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            {job.salary && <p className="text-sm font-medium text-gray-700">{job.salary}</p>}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 5 && (
            <span className="px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded-full">
              +{job.skills.length - 5} more
            </span>
          )}
        </div>

        {expanded && (
          <div className="mt-4 border-t pt-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-gray-600">{job.description}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Requirements</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
            
            {job.deadline && (
              <div className="text-sm text-gray-600 mb-4">
                <strong>Application Deadline:</strong> {job.deadline}
              </div>
            )}
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={toggleExpand}>
            {expanded ? "Show Less" : "Show More"}
          </Button>
          <Button size="sm" onClick={handleApply}>Apply Now</Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

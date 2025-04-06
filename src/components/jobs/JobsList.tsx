
import { useState } from "react";
import { mockJobs } from "@/data/mockData";
import { Job } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import JobCard from "./JobCard";

const JobsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobType, setJobType] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const { toast } = useToast();
  
  // Extract unique locations and job types for filters
  const locations = [...new Set(mockJobs.map(job => job.location))];
  const jobTypes = [...new Set(mockJobs.map(job => job.type))];
  
  const handleSearch = () => {
    const filtered = mockJobs.filter(job => {
      // Search query filter
      const matchesQuery = 
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Job type filter
      const matchesType = 
        !jobType ||
        job.type === jobType;
      
      // Location filter
      const matchesLocation = 
        !location ||
        job.location === location;
      
      return matchesQuery && matchesType && matchesLocation;
    });
    
    setFilteredJobs(filtered);
  };
  
  const handleReset = () => {
    setSearchQuery("");
    setJobType(undefined);
    setLocation(undefined);
    setFilteredJobs(mockJobs);
  };
  
  const handleApply = (jobId: string) => {
    toast({
      title: "Application Submitted",
      description: "Your job application has been submitted successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Search Jobs</h2>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, skills, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/4">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleSearch}>
              <Filter className="mr-2 h-4 w-4" />
              Filter Jobs
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Available Jobs ({filteredJobs.length})</h2>
        </div>
        
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium">No jobs found</h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters or search query
            </p>
            <Button className="mt-4" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;

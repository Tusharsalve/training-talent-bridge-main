
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockJobs } from "@/data/mockData";
import { User, Users, ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = ({ companyId }: { companyId: string }) => {
  const navigate = useNavigate();
  
  // Filter jobs for this company
  const companyJobs = mockJobs.filter(job => job.company.id === companyId);
  
  // Calculate total applicants across all jobs
  const totalApplicants = companyJobs.reduce(
    (sum, job) => sum + job.applicants.length,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <Button onClick={() => alert("This would create a new job listing")}>
          <Plus className="mr-2 h-4 w-4" /> Post New Job
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyJobs.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently active job listings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplicants}</div>
            <p className="text-xs text-muted-foreground">
              Candidates applied to your jobs
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Candidates shortlisted for interview
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-8">Your Job Listings</h2>
      
      <div className="space-y-4">
        {companyJobs.length > 0 ? (
          companyJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => alert(`View details for job: ${job.title}`)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                  <div className="flex space-x-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{job.type}</p>
                    </div>
                    {job.salary && (
                      <div>
                        <p className="text-sm text-gray-500">{job.salary}</p>
                      </div>
                    )}
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    job.status === "Open"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">{job.applicants.length}</span> applicants
                  </p>
                  <p className="text-sm text-gray-500">Posted on {job.postedDate}</p>
                </div>
                <Button variant="outline" size="sm">
                  View Applicants <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium">No jobs posted yet</h3>
            <p className="text-gray-500 mt-2">
              Post your first job to start receiving applications
            </p>
            <Button className="mt-4" onClick={() => alert("This would create a new job listing")}>
              <Plus className="mr-2 h-4 w-4" /> Post New Job
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;

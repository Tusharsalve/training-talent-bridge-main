
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockJobs } from "@/data/mockData";
import { Search, FileText, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = ({ studentId }: { studentId: string }) => {
  const navigate = useNavigate();
  
  // In a real app, we would have an applications array linked to the student
  // For demo purposes, let's pretend the student has applied to the first job
  const mockApplications = [
    {
      id: "app-1",
      job: mockJobs[0],
      status: "Under Review",
      appliedDate: "2023-03-26",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              Jobs you've applied to
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              Applications under review
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              You've been shortlisted
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center justify-between mt-8">
        <h2 className="text-xl font-semibold">Your Applications</h2>
        <Button onClick={() => navigate("/jobs")}>
          <Search className="mr-2 h-4 w-4" /> Browse Jobs
        </Button>
      </div>
      
      <div className="space-y-4">
        {mockApplications.length > 0 ? (
          mockApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {application.job.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {application.job.company.name} • {application.job.location}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    application.status === "Under Review"
                      ? "bg-yellow-50 text-yellow-700"
                      : application.status === "Shortlisted"
                      ? "bg-green-50 text-green-700"
                      : application.status === "Rejected"
                      ? "bg-red-50 text-red-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {application.status}
                </span>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    Applied on {application.appliedDate}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium">No applications yet</h3>
            <p className="text-gray-500 mt-2">
              Start applying to jobs to see your applications here
            </p>
            <Button className="mt-4" onClick={() => navigate("/jobs")}>
              <Search className="mr-2 h-4 w-4" /> Browse Jobs
            </Button>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Recommended Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {mockJobs.slice(0, 4).map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    {job.title}
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="h-6 w-6 flex-shrink-0">
                      <img
                        className="h-6 w-6 rounded-full"
                        src={job.company.logo}
                        alt={job.company.name}
                      />
                    </div>
                    <p className="text-sm text-gray-500 ml-2">
                      {job.company.name}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{job.location}</span>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {job.skills.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Posted on {job.postedDate}
                </p>
                <Button variant="outline" size="sm" onClick={() => alert(`Apply to job: ${job.title}`)}>
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

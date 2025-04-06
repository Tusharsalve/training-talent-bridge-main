
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ArrowRight, Briefcase, User, Building } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import { mockJobs } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Featured jobs for homepage
  const featuredJobs = mockJobs.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="gradient-bg text-white py-16 md:py-24">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Find Your Dream Job in the Tech Industry
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Connecting students with top companies for internships, part-time,
                and full-time opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate("/jobs")}
                >
                  Browse Jobs
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="flex flex-col cursor:flex-row items-center justify-center"
                  onClick={() => navigate("/employers")}
                >
                  For Employers
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <LoginForm />
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Featured Jobs</h2>
              <p className="text-gray-600 mt-2">
                Explore the latest opportunities from top companies
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={job.company.logo}
                          alt={job.company.name}
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Briefcase className="mr-2 h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Building className="mr-2 h-4 w-4" />
                      {job.location}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm line-clamp-2 text-gray-600 mb-4">
                      {job.description}
                    </p>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => navigate("/jobs")}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg"
                onClick={() => navigate("/jobs")}
              >
                View All Jobs <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="text-gray-600 mt-2">
                Simple steps to start your career journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up and build your professional profile with your skills,
                  education, and experience.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Discover Opportunities</h3>
                <p className="text-gray-600">
                  Browse through job listings that match your skills and
                  preferences.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Apply and Connect</h3>
                <p className="text-gray-600">
                  Apply to positions with a single click and get connected with
                  hiring managers.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="gradient-bg text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of students and companies already using our platform
              for their career and hiring needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
              >
                Sign Up as Student
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent text-white border-white hover:text-primary hover:bg-white"
              >
                Register Company
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

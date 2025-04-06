
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import JobsList from "@/components/jobs/JobsList";

const Jobs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse Jobs</h1>
        <JobsList />
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;

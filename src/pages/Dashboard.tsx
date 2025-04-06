
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { currentUser } from "@/data/mockData";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import CompanyDashboard from "@/components/dashboard/CompanyDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  
  // If user is not logged in, show loading or nothing
  if (!currentUser) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentUser.role === "admin" && <AdminDashboard />}
        {currentUser.role === "company" && <CompanyDashboard companyId={currentUser.id} />}
        {currentUser.role === "student" && <StudentDashboard studentId={currentUser.id} />}
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { currentUser, mockStudents, mockCompanies } from "@/data/mockData";
import StudentProfile from "@/components/profile/StudentProfile";
import CompanyProfile from "@/components/profile/CompanyProfile";

const Profile = () => {
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
  
  // Find the full user data based on role and id
  let userData;
  if (currentUser.role === "student") {
    userData = mockStudents.find(student => student.id === currentUser.id);
  } else if (currentUser.role === "company") {
    userData = mockCompanies.find(company => company.id === currentUser.id);
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        
        {currentUser.role === "admin" && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold">Admin Profile</h2>
            <p className="mt-2 text-gray-500">Admin profiles cannot be edited</p>
          </div>
        )}
        
        {currentUser.role === "student" && userData && (
          <StudentProfile student={userData} />
        )}
        
        {currentUser.role === "company" && userData && (
          <CompanyProfile company={userData} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;

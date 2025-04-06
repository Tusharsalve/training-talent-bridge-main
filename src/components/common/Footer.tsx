
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Placement Portal</span>
            </div>
            <p className="text-gray-600 text-sm">
              Connecting talent with opportunities at top companies.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-primary transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-600 hover:text-primary transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Search Candidates
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Recruitment Solutions
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
          <p>&copy; {new Date().getFullYear()} Placement Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

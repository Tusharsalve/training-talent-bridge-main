
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  
} from "@/components/ui/sheet";
import { currentUser, logoutUser } from "@/data/mockData";
import { Menu, X, User, Briefcase, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Placement Portal</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/jobs"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              to="/companies"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Companies
            </Link>
            {!currentUser ? (
              <Button onClick={() => navigate("/")}>Log In</Button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/profile")}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{currentUser.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                </SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through Placement Portal
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex flex-col space-y-4 mt-6">
                  <Link 
                    to="/jobs" 
                    className="flex items-center space-x-2 text-lg" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>Browse Jobs</span>
                  </Link>
                  <Link 
                    to="/companies" 
                    className="flex items-center space-x-2 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Companies</span>
                  </Link>
                  {currentUser && (
                    <Link 
                      to="/dashboard" 
                      className="flex items-center space-x-2 text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  {currentUser && (
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                  )}
                  {!currentUser ? (
                    <Button onClick={() => { 
                      navigate("/");
                      setIsMenuOpen(false);
                    }}>
                      Log In
                    </Button>
                  ) : (
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Log Out
                    </Button>
                  )}
                </div>
            {/* </SheetContent> */}
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

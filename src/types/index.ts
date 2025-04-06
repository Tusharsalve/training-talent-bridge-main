
export type UserRole = "admin" | "company" | "student";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Student extends User {
  role: "student";
  education: Education[];
  skills: string[];
  experience: Experience[];
  resume?: string;
  bio?: string;
}

export interface Company extends User {
  role: "company";
  description: string;
  location: string;
  industry: string;
  website?: string;
  logo?: string;
}

export interface Admin extends User {
  role: "admin";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | "Present";
  grade?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  description: string;
  requirements: string[];
  skills: string[];
  salary?: string;
  postedDate: string;
  deadline?: string;
  status: "Open" | "Closed";
  applicants: Application[];
}

export interface Application {
  id: string;
  job: Job;
  student: Student;
  status: "Applied" | "Under Review" | "Shortlisted" | "Rejected" | "Offered" | "Accepted" | "Withdrawn";
  appliedDate: string;
  coverLetter?: string;
}

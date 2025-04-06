
import { Admin, Company, Job, Student, User,UserRole } from "@/types";

// Mock Admin
export const mockAdmin: Admin = {
  id: "admin-01",
  email: "admin@placementportal.com",
  name: "Admin User",
  role: "admin",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
};

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: "company-01",
    email: "hr@techcorp.com",
    name: "TechCorp Solutions",
    role: "company",
    description: "Leading technology solutions provider with global reach",
    location: "Bangalore, India",
    industry: "Information Technology",
    website: "https://techcorp.example.com",
    logo: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "company-02",
    email: "careers@financeplus.com",
    name: "Finance Plus",
    role: "company",
    description: "Innovative financial services company",
    location: "Mumbai, India",
    industry: "Finance",
    website: "https://financeplus.example.com",
    logo: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "company-03",
    email: "jobs@edulearn.com",
    name: "EduLearn Technologies",
    role: "company",
    description: "Educational technology company focused on e-learning solutions",
    location: "Delhi, India",
    industry: "EdTech",
    website: "https://edulearn.example.com",
    logo: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: "student-01",
    email: "rahul@example.com",
    name: "Rahul Sharma",
    role: "student",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    education: [
      {
        id: "edu-01",
        institution: "Delhi Technical University",
        degree: "B.Tech",
        field: "Computer Science",
        startDate: "2020-08-01",
        endDate: "2024-05-30",
        grade: "8.7 CGPA",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    experience: [
      {
        id: "exp-01",
        title: "Web Development Intern",
        company: "StartUp Tech",
        location: "Remote",
        startDate: "2023-05-01",
        endDate: "2023-08-01",
        description: "Developed responsive web applications using React and Node.js",
      },
    ],
    bio: "Passionate computer science student with interest in web development and AI",
  },
  {
    id: "student-02",
    email: "priya@example.com",
    name: "Priya Singh",
    role: "student",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    education: [
      {
        id: "edu-02",
        institution: "Mumbai Institute of Technology",
        degree: "M.Tech",
        field: "Data Science",
        startDate: "2022-08-01",
        endDate: "Present",
        grade: "9.2 CGPA",
      },
      {
        id: "edu-03",
        institution: "Pune University",
        degree: "B.Tech",
        field: "Information Technology",
        startDate: "2018-08-01",
        endDate: "2022-05-30",
        grade: "8.9 CGPA",
      },
    ],
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL", "TensorFlow"],
    experience: [
      {
        id: "exp-02",
        title: "Data Science Intern",
        company: "Analytics Pro",
        location: "Pune, India",
        startDate: "2022-01-01",
        endDate: "2022-06-01",
        description: "Worked on machine learning models for customer segmentation",
      },
    ],
    bio: "Data science enthusiast with strong analytical skills",
  },
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: "job-01",
    title: "Frontend Developer",
    company: mockCompanies[0],
    location: "Bangalore, India",
    type: "Full-time",
    description: "We're looking for a skilled Frontend Developer to join our team. You'll be responsible for building user interfaces for our web applications.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "2+ years of experience with React",
      "Strong knowledge of JavaScript, HTML, CSS",
      "Experience with responsive design",
    ],
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    salary: "₹8-12 LPA",
    postedDate: "2023-03-25",
    deadline: "2023-04-25",
    status: "Open",
    applicants: [],
  },
  {
    id: "job-02",
    title: "Financial Analyst",
    company: mockCompanies[1],
    location: "Mumbai, India",
    type: "Full-time",
    description: "Join our finance team to analyze financial data and provide insights for business decisions.",
    requirements: [
      "Bachelor's degree in Finance, Accounting, or related field",
      "1-3 years of experience in financial analysis",
      "Proficiency in Excel and financial modeling",
      "Knowledge of financial statements and accounting principles",
    ],
    skills: ["Financial Analysis", "Excel", "Financial Modeling", "Accounting"],
    salary: "₹7-10 LPA",
    postedDate: "2023-03-20",
    deadline: "2023-04-20",
    status: "Open",
    applicants: [],
  },
  {
    id: "job-03",
    title: "Content Developer",
    company: mockCompanies[2],
    location: "Delhi, India (Remote)",
    type: "Part-time",
    description: "Create engaging educational content for our e-learning platform.",
    requirements: [
      "Bachelor's degree in Education, English, or related field",
      "Experience in content creation for educational purposes",
      "Strong writing and editing skills",
      "Knowledge of e-learning principles",
    ],
    skills: ["Content Creation", "Instructional Design", "E-learning", "Writing"],
    salary: "₹4-6 LPA",
    postedDate: "2023-03-22",
    deadline: "2023-04-22",
    status: "Open",
    applicants: [],
  },
  {
    id: "job-04",
    title: "Backend Developer",
    company: mockCompanies[0],
    location: "Bangalore, India (Hybrid)",
    type: "Full-time",
    description: "Develop and maintain server-side applications and databases for our enterprise solutions.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in backend development",
      "Proficiency in Node.js and Express",
      "Experience with MongoDB or other NoSQL databases",
    ],
    skills: ["Node.js", "Express", "MongoDB", "API Development", "Cloud Services"],
    salary: "₹10-15 LPA",
    postedDate: "2023-03-18",
    deadline: "2023-04-18",
    status: "Open",
    applicants: [],
  },
];

// All users (for authentication simulation)
export const mockUsers: User[] = [
  mockAdmin,
  ...mockCompanies,
  ...mockStudents,
];

// Current user for auth simulation (default: no user logged in)
export let currentUser: User | null = null;

// Helper function to simulate login
export const loginUser = (email: string, password: string): User | null => {
  // In a real app, you would validate password here
  // For demo, we just check if email exists
  const user = mockUsers.find(user => user.email === email);
  if (user) {
    currentUser = user;
    return user;
  }
  return null;
};

// Helper function to simulate logout
export const logoutUser = (): void => {
  currentUser = null;
};

export const registerUser = (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  // In a real app, this would call your API
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (users.some((u: any) => u.email === email)) {
    return null; // Email exists
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    role,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem('users', JSON.stringify([...users, newUser]));
  return newUser;
};
export const useStudents = () => {
    const fetchStudents = async () => {
      const res = await fetch('/api/students');
      return await res.json();
    };
  
    return { fetchStudents };
  };
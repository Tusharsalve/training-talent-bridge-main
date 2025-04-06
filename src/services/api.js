export const StudentService = {
    getAll: async () => {
      const res = await fetch('/api/students');
      return res.json();
    }
  };
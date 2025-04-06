"use client";
import { StudentService } from '../services/api';
import { use } from 'react';
import { useEffect, useState } from 'react';

export default function Students() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await fetch('/api/students');
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      {students.map(student => (
        <div key={student._id}>{student.name}</div>
      ))}
    </div>
  );
}
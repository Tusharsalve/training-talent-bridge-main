
// import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Mail,
  FileText,
  Book,
  Briefcase,
  Code,
  Plus,
  Pencil,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student } from "@/types";

interface StudentProfileProps {
  student: Student;
}

const StudentProfile = ({ student }: StudentProfileProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={student.avatar} />
                <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
              </Avatar>

              <h2 className="mt-4 text-xl font-semibold">{student.name}</h2>
              <p className="text-sm text-gray-500">{student.email}</p>
              
              <Button variant="outline" className="mt-4 w-full">
                <Pencil className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Resume</h3>
                  {student.resume ? (
                    <p className="text-sm text-gray-500">Uploaded</p>
                  ) : (
                    <Button variant="link" className="p-0 h-auto text-sm text-primary">
                      Upload Resume
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Contact Info</h3>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
              </div>
              
              {student.bio && (
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Bio</h3>
                    <p className="text-sm text-gray-500">{student.bio}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-2 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Education</CardTitle>
              <CardDescription>Your academic background</CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {student.education.map((edu) => (
              <div key={edu.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <h3 className="text-base font-medium">
                    {edu.degree} in {edu.field}
                  </h3>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm">{edu.institution}</p>
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                  <span>
                    {edu.startDate} - {edu.endDate}
                  </span>
                  {edu.grade && <span>{edu.grade}</span>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Experience</CardTitle>
              <CardDescription>Your work history</CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {student.experience.length > 0 ? (
              student.experience.map((exp) => (
                <div key={exp.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium">{exp.title}</h3>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm">{exp.company}</p>
                  <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <span>
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <span>{exp.location}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Briefcase className="h-10 w-10 mx-auto text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-800">
                  No experience added yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add your work experience to showcase your skills
                </p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" /> Add Experience
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Your technical and soft skills</CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {skill}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;

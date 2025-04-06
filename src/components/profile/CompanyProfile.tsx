
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Company } from "@/types";
import {
  Building,
  Mail,
  MapPin,
  Briefcase,
  Globe,
  Pencil,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CompanyProfileProps {
  company: Company;
}

const CompanyProfile = ({ company }: CompanyProfileProps) => {
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
                <AvatarImage src={company.logo} />
                <AvatarFallback>{getInitials(company.name)}</AvatarFallback>
              </Avatar>

              <h2 className="mt-4 text-xl font-semibold">{company.name}</h2>
              <p className="text-sm text-gray-500">{company.industry}</p>

              <Button variant="outline" className="mt-4 w-full">
                <Pencil className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Location</h3>
                  <p className="text-sm text-gray-500">{company.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Contact</h3>
                  <p className="text-sm text-gray-500">{company.email}</p>
                </div>
              </div>

              {company.website && (
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Website</h3>
                    <a
                      href={company.website}
                      className="text-sm text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.website.replace(/(^\w+:|^)\/\//, "")}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About Company</CardTitle>
            <CardDescription>Company overview and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-gray-700">{company.description}</p>
            </div>
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">Industry</h3>
              <div className="bg-blue-50 text-blue-700 inline-block px-3 py-1 rounded-full text-sm">
                {company.industry}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Open Positions</CardTitle>
              <CardDescription>Currently hiring for these roles</CardDescription>
            </div>
            <Button>
              <Briefcase className="mr-2 h-4 w-4" /> Post New Job
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-12 text-gray-500">
              <Building className="h-12 w-12 mx-auto text-gray-300" />
              <p className="mt-2">No active job listings</p>
              <Button variant="outline" className="mt-4">
                Create Your First Job Posting
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Benefits</CardTitle>
            <CardDescription>What you offer to employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-gray-500">
                Add information about benefits, work culture, and perks that your
                company offers to attract top talent.
              </p>
              <Button variant="outline" className="mt-4">
                <Pencil className="mr-2 h-4 w-4" /> Add Benefits
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfile;

import ArcjetLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";
import OlaLogo from "@/public/OlaLogo.png"
import MetaLogo from "@/public/MetaLogo.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CreateJobForm } from "@/components/forms/CreateJobForm";
import { requireUser } from "@/app/utils/requireUser";
import { prisma } from "@/app/utils/db";

const companies = [
  { id: 0, name: "ArcJet", logo: ArcjetLogo },
  { id: 1, name: "Inngest", logo: InngestLogo },
  { id: 2, name: "Meta", logo: MetaLogo },
  { id: 3, name: "Ola", logo: OlaLogo },
  { id: 4, name: "ArcJet", logo: ArcjetLogo },
  { id: 5, name: "Inngest", logo: InngestLogo },
];

const testimonials = [
  {
    quote:
      "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!",
    author: "Satya Nadela",
    company: "Microsoft",
  },
  {
    quote:
      "The platform made hiring remote talent incredibly simple. Highly recommended!",
    author: "Sundar Pichai",
    company: "Google",
  },
  {
    quote:
      "We've consistently found high-quality candidates here. It's our go-to platform for all our hiring needs.",
    author: "Bhavesh Aggrawal",
    company: "Ola",
  },
];

const stats = [
  { id: 0, value: "10k+", label: "Monthly active job seekers" },
  { id: 1, value: "48h", label: "Average time to hire" },
  { id: 2, value: "95%", label: "Employer satisfaction rate" },
  { id: 3, value: "500+", label: "Companies hiring remotely" },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    return redirect("/");
  }

  return data;
}

export default async function PostJobPage() {
  const session = await requireUser();

  const data = await getCompany(session?.id as string);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyName={data.name}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />

      {/* Right side companies and testimonials */}
      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of copmaines hiring top talent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Logos array displaying on website */}

            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial.author}, {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            {/* render stats here */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.id} className="rounded-lg bg-muted p-4">
                  <h4 className="text-2xl font-bold">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

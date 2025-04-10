import { OnboardingForm } from "@/components/forms/onboarding/OnboardingForm";
import { requireUser } from "../utils/requireUser";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";

async function checkIfUserHasFinishedOnboarding(userId: string){
  const user = await prisma.user.findUnique({
    where: {
      id: userId  
    },
    select: {
      onboardingCompleted: true
    }
  })

  if(user?.onboardingCompleted === true){
    redirect("/")
  }

  return user;
}


export default async function onboardingPage() {
  const session = await requireUser();
  await checkIfUserHasFinishedOnboarding(session?.id as string);
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
}


// select is fetching status of onboarding from db
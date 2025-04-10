import { OnboardingForm } from "@/components/forms/onboarding/OnboardingForm";
import { requireUser } from "../utils/requireUser";



export default async function onboardingPage() {
  const session = await requireUser();
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
}

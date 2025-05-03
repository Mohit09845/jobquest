import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { Themetoggle } from "./Themetoggle";
import { auth } from "@/app/utils/auth";
import { UserDropdown } from "./UserDropdown";
import { prisma } from "@/app/utils/db";

export async function Navbar() {
  const session = await auth();

  let isCompany = false;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { userType: true },
    });

    isCompany = user?.userType === "COMPANY";
  }

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo Job Marshal" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Job<span className="text-primary">Quest</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5">
        <Themetoggle />
        {isCompany && (
          <Link className={buttonVariants({ size: "lg" })} href="/post-job">
            Post Job
          </Link>
        )}
        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            image={session.user.image as string}
            name={session.user.name as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}


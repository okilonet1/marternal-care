import { Button } from "@/components/ui/moving-border";
import { Button as OrdButton } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h4>Welcome to </h4>
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        MaternaAI
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-4 gap-4">
        <Link href="/sign-in">
          <OrdButton className="text-white rounded-[1.75rem] h-[62px] w-[158px] border-slate-800 bg-sky-500/85 hover:bg-transparent hover:border-sky-500/85 animate-shimmer">
            Sign In
          </OrdButton>
        </Link>
        <Link href="/sign-up">
          <Button className="bg-transparent text-white dark:border-slate-800 hover:bg-sky-500 transition-all duration-200">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { SignUpForm } from "@/components/SignUpForm";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { FC } from "react";

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}) => {
  return (
    <CardContainer className="inter-var my-3">
      <CardBody className="group/card bg-blur-sm relative  flex h-auto w-auto flex-col items-center justify-center rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black/35 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
        <Link href="/">
          <CardItem
            translateZ="50"
            className="text-center text-xl font-bold text-neutral-600 dark:text-white"
          >
            MaternaAI
          </CardItem>
        </Link>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
        >
          Please fill form to register
        </CardItem>
        <SignUpForm />
      </CardBody>
    </CardContainer>
  );
};

export default SignUp;

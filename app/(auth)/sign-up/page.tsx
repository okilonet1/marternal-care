import { SignUpForm } from "@/components/SignUpForm";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { FC } from "react";

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}) => {
  return (
    <CardContainer className="inter-var my-3">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black/35 bg-blur-sm dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border items-center justify-center flex flex-col">
        <Link href="/">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white text-center"
          >
            MaternaAI
          </CardItem>
        </Link>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Please fill form to register
        </CardItem>
        <SignUpForm />
      </CardBody>
    </CardContainer>
  );
};

export default SignUp;

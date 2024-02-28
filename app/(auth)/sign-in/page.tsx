import { SignInForm } from "@/components/SignInForm";
import { FC } from "react";

interface SignInProps {}

const SignIn: FC<SignInProps> = ({}) => {
  return (
    <div>
      <SignInForm />
    </div>
  );
};

export default SignIn;

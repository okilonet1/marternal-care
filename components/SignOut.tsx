import { FC } from "react";
import { Button } from "./ui/button";
import { signOut } from "@/actions/auth.actions";

interface SignOutProps {}

const SignOut: FC<SignOutProps> = ({}) => {
  return (
    <form action={signOut}>
      <Button type="submit">Sign Out</Button>
    </form>
  );
};

export default SignOut;

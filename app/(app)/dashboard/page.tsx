import { PregHealthTips } from "@/components/PregHealthTips";
import SignOut from "@/components/SignOut";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <div className=" gap-2">
      <PregHealthTips />
      <SignOut />
    </div>
  );
};

export default Dashboard;

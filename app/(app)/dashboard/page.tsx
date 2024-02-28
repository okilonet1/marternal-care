import SignOut from "@/components/SignOut";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <div>
      dashboard
      <SignOut />
    </div>
  );
};

export default Dashboard;

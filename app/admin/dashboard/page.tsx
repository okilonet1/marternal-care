import SignOut from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface DashboardProps {}

const AdminDashboard: FC<DashboardProps> = ({}) => {
  return (
    <div>
      <h1>admin dashboard</h1>
      <Link href="/admin/resources">
        <Button>Go to Resources</Button>
      </Link>
      <SignOut />
    </div>
  );
};

export default AdminDashboard;

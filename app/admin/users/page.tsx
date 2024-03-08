import ResourceListTable from "@/components/ResourceListTable";
import SignOut from "@/components/SignOut";

import prisma from "@/lib/prismadb";

import { FC } from "react";

interface AdminResourcesProps {}

const getUsers = async () => {
  const articles = await prisma.user.findMany();
  return articles;
};

const AdminResources: FC<AdminResourcesProps> = async ({}) => {
  const users = await getUsers();
  return (
    <div>
      <h1>admin dashboard</h1>
      <SignOut />
      <pre>{JSON.stringify(users, null, 2)}</pre>
      {/* <ResourceListTable resources={resources} />
       */}
    </div>
  );
};

export default AdminResources;

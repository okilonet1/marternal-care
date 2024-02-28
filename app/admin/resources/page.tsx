import AddResourceForm from "@/components/AddResourceForm";
import SignOut from "@/components/SignOut";

import prisma from "@/lib/prismadb";

import { FC } from "react";

interface AdminResourcesProps {}

const getResources = async () => {
  const articles = await prisma.article.findMany();
  return articles;
};

const AdminResources: FC<AdminResourcesProps> = async ({}) => {
  const resources = await getResources();
  return (
    <div>
      <h1>admin dashboard</h1>
      <AddResourceForm />
      <SignOut />
    </div>
  );
};

export default AdminResources;

import prisma from "@/lib/prismadb";
import { Metadata } from "next";

import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";

const getUsers = async () => {
  const articles = await prisma.user.findMany();
  return articles;
};

export const metadata: Metadata = {
  title: "Users",
  description: "",
};

export default async function Users() {
  const users = await getUsers();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Users</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your users
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <DataTable data={users} columns={columns} />
      </div>
    </>
  );
}

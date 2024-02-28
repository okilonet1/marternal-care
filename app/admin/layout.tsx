import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user?.role !== "ADMIN") {
    return redirect("/");
  }

  return <>{children}</>;
}

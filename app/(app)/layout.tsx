import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/");
  }

  return <div className="mx-auto max-w-6xl p-4">{children}</div>;
}

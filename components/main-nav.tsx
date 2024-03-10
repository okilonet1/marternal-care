import Link from "next/link";

import { cn } from "@/lib/utils";
import { validateRequest } from "@/lib/auth";

export async function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { user } = await validateRequest();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <h2 className="text-3xl font-bold tracking-tight">MaternaAI</h2>

      <Link
        href={user?.role !== "ADMIN" ? "/dashboard" : "/admin/dashboard"}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      {user?.role === "ADMIN" && (
        <>
          <Link
            href="/admin/users"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Users
          </Link>
        </>
      )}
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}

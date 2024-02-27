"use client";

import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  if (false) {
    router.push("/dashboard");
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
}

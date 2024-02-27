"use client";

import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  //   if (true) {
  //     router.push("/sign-in");
  //   }

  return (
    <>
      <main>{children}</main>
    </>
  );
}

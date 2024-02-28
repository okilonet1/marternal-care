"use client";
import { FC, ReactNode } from "react";
import { Toaster } from "sonner";
interface ProviderProps {
  children: ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      {children}
    </>
  );
};

export default Providers;

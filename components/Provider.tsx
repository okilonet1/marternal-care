"use client";
import { FC, ReactNode } from "react";
import { Toaster } from "sonner";
interface ProviderProps {
  children: ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <div>
      <Toaster richColors closeButton position="top-right" />
      {children}
    </div>
  );
};

export default Providers;

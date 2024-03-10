"use client";
import { MessagesProvider } from "@/contexts/messagesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { Toaster } from "sonner";
interface ProviderProps {
  children: ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors closeButton position="top-right" />
        <MessagesProvider>{children}</MessagesProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;

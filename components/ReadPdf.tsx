"use client";

import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { Spinner } from "@nextui-org/react";

interface ReadPdfProps {
  iframeSrc: string;
  className?: string;
}

const ReadPdf: FC<ReadPdfProps> = ({ iframeSrc, className }) => {
  const [loading, setLoading] = useState(true);

  const hideSpinner = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Spinner className="text-center" size="lg" />}
      <iframe
        src={iframeSrc}
        onLoad={hideSpinner}
        className={cn("h-full w-full", className)}
      />
    </>
  );
};

export default ReadPdf;

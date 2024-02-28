import ReadPdf from "@/components/ReadPdf";

import { FC } from "react";

interface ResourceProps {
  params: {
    id: string;
  };
}

const Resource: FC<ResourceProps> = ({ params: { id } }) => {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center">
      <ReadPdf
        iframeSrc={`https://drive.google.com/file/d/1GgeaPAB-GEI0tXgo_Jnc7x9D2hHG2N-c/preview?embedded=true`}
      />
    </div>
  );
};

export default Resource;

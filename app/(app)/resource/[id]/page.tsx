import ReadPdf from "@/components/ReadPdf";
import prisma from "@/lib/prismadb";

import { FC } from "react";

interface ResourceProps {
  params: {
    id: string;
  };
}

async function getResource(id: string) {
  const res = await prisma.article.findUnique({
    where: {
      id,
    },
  });

  return res;
}

const Resource: FC<ResourceProps> = async ({ params: { id } }) => {
  const article = await getResource(id);

  return (
    <div className="flex h-[100vh] w-full flex-col items-center">
      <ReadPdf
        iframeSrc={article!.url!.replace(
          "/view?usp=drivesdk",
          "/preview?embedded=true",
        )}
      />
    </div>
  );
};

export default Resource;

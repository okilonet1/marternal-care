import { generatePublicUrl, uploadFile } from "@/lib/helpers";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const doc = formData.get("resume") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const author = formData.get("author") as string;

  try {
    const articleUpload = await uploadFile(doc, title);

    if (!articleUpload) {
      throw new Error("Error uploading file");
    }

    const docUploadedUrl = await generatePublicUrl(articleUpload.id);

    if (!docUploadedUrl) {
      throw new Error("Error generating public url for resume");
    }

    const article = await prisma.article.create({
      data: {
        title: title,
        url: docUploadedUrl?.webContentLink!,
        author: author,
        description: description,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error", {
      status: 400,
    });
  }
}

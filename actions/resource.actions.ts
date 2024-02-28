"use server";

import { generatePublicUrl, uploadFile } from "@/lib/helpers";
import prisma from "@/lib/prismadb";

export async function addResource(formData: FormData) {
  try {
    const doc = formData.get("doc") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const author = formData.get("author") as string;

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

    console.log(formData);
    return {
      success: true,
      data: {
        title,
        description,
        author,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error?.message,
    };
  }
}

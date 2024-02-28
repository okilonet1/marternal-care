import { google } from "googleapis";
import { Readable, PassThrough } from "stream";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const folderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID!;

export async function generatePublicUrl(id: string) {
  try {
    await drive.permissions.create({
      fileId: id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: id,
      fields: "webViewLink, webContentLink",
    });

    return result.data as { webViewLink: string; webContentLink: string };
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function uploadFile(file: File, fileName: string) {
  if (!file) {
    console.log("No file selected");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const readableStream = new Readable();
  readableStream.push(buffer);
  readableStream.push(null);

  const fileExtension = file.name.split(".").pop();

  try {
    const response = await drive.files.create({
      requestBody: {
        parents: [folderId],
        name: `${fileName}.${fileExtension}`,
      },
      media: {
        mimeType: file.type,
        body: readableStream,
      },
    });

    return response.data as {
      kind: string;
      id: string;
      name: string;
      mimeType: string;
    };
  } catch (error: any) {
    console.log(error.message);
  }
}

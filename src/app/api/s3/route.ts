import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESSKEY!,
    secretAccessKey: process.env.AWS_S3_SECRETKEY!,
  },
});

async function uploadToS3({
  file,
  fileName,
}: {
  file: Buffer;
  fileName: string;
}) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKETNAME,
    Key: fileName,
    Body: file,
    ContentType: "image/*",
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);
  return NextResponse.json(
    { status: "Uploaded Image", file: file },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const images = formData.getAll("image") as File[];
    const user = formData.get("user");

    if (images.length == 0) {
      return NextResponse.json(
        { error: "Image is required." },
        { status: 400 }
      );
    }

    for (const image of images) {
      const imgBuffer = Buffer.from(await image.arrayBuffer());
      await uploadToS3({
        file: imgBuffer,
        fileName: `${user}${image.lastModified}.${image.type.split("/")[1]}`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function GET() {
  return NextResponse.json({ working: true });
}

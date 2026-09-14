import {
  NextRequest,
  NextResponse,
} from "next/server";

import { v2 as cloudinary } from "cloudinary";

function getCloudinaryConfig() {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME?.trim();

  const apiKey =
    process.env.CLOUDINARY_API_KEY?.trim();

  const apiSecret =
    process.env.CLOUDINARY_API_SECRET?.trim();

  if (!cloudName) {
    throw new Error(
      "CLOUDINARY_CLOUD_NAME is not configured."
    );
  }

  if (!apiKey) {
    throw new Error(
      "CLOUDINARY_API_KEY is not configured."
    );
  }

  if (!apiSecret) {
    throw new Error(
      "CLOUDINARY_API_SECRET is not configured."
    );
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
  };
}

export async function POST(
  request: NextRequest
) {
  try {
    const config =
      getCloudinaryConfig();

    cloudinary.config({
      cloud_name:
        config.cloudName,

      api_key:
        config.apiKey,

      api_secret:
        config.apiSecret,
    });

    const formData =
      await request.formData();

    const file =
      formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Image file is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only image files are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    const MAX_SIZE =
      15 * 1024 * 1024;

    if (
      file.size >
      MAX_SIZE
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Image must be smaller than 15 MB.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const result =
      await new Promise<any>(
        (
          resolve,
          reject
        ) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder:
                  "lappy-care/device-photos",

                resource_type:
                  "image",

                transformation: [
                  {
                    width: 1600,
                    height: 1600,
                    crop: "limit",
                  },
                  {
                    quality:
                      "auto:good",
                  },
                  {
                    fetch_format:
                      "auto",
                  },
                ],
              },
              (
                error,
                uploaded
              ) => {
                if (error) {
                  reject(
                    error
                  );

                  return;
                }

                resolve(
                  uploaded
                );
              }
            );

          uploadStream.end(
            buffer
          );
        }
      );

    if (
      !result?.secure_url
    ) {
      throw new Error(
        "Cloudinary did not return an image URL."
      );
    }

    return NextResponse.json(
      {
        success: true,

        url:
          result.secure_url,

        publicId:
          result.public_id,

        width:
          result.width,

        height:
          result.height,

        bytes:
          result.bytes,

        format:
          result.format,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Cloudinary upload API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Cloudinary upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}
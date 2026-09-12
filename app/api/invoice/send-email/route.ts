import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const to =
      typeof body?.to === "string"
        ? body.to.trim()
        : "";

    const subject =
      typeof body?.subject === "string"
        ? body.subject.trim()
        : "Lappy Care Invoice";

    const html =
      typeof body?.html === "string"
        ? body.html
        : `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="margin-bottom: 8px;">Lappy Care</h2>

            <p>Dear Customer,</p>

            <p>
              Please find your Lappy Care invoice attached.
            </p>

            <p>
              Thank you for choosing Lappy Care.
            </p>

            <p>
              📞 95950 57006
            </p>

            <p>
              Regards,<br />
              Lappy Care<br />
              Laptop Repair & Service
            </p>
          </div>
        `;

    const pdfBase64 =
      typeof body?.pdfBase64 === "string"
        ? body.pdfBase64
        : "";

    const filename =
      typeof body?.filename === "string" &&
      body.filename.trim()
        ? body.filename.trim()
        : "Lappy-Care-Invoice.pdf";

    // ==========================================
    // API KEY
    // ==========================================

    if (
      !process.env.RESEND_API_KEY
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "RESEND_API_KEY is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // EMAIL
    // ==========================================

    if (!to) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Customer email address is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // PDF
    // ==========================================

    if (!pdfBase64) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invoice PDF attachment is missing.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // FROM EMAIL
    // ==========================================

    const from =
      process.env.RESEND_FROM_EMAIL ||
      "Lappy Care <onboarding@resend.dev>";

    // ==========================================
    // SEND EMAIL
    // ==========================================

    const result =
      await resend.emails.send({
        from,

        to: [to],

        subject,

        html,

        attachments: [
          {
            filename,

            content:
              Buffer.from(
                pdfBase64,
                "base64"
              ),
          },
        ],
      });

    // ==========================================
    // RESEND ERROR
    // ==========================================

    if (
      result.error
    ) {
      console.error(
        "Resend email error:",
        result.error
      );

      return NextResponse.json(
        {
          success: false,

          error:
            result.error.message ||
            "Failed to send invoice email.",
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // SUCCESS
    // ==========================================

    return NextResponse.json({
      success: true,

      message:
        "Invoice email sent successfully.",

      emailId:
        result.data?.id || "",
    });
  } catch (error) {
    console.error(
      "Invoice email route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Failed to send invoice email.",
      },
      {
        status: 500,
      }
    );
  }
}
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(), // Anti-spam field
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    // Anti-spam honeypot check
    if (validated.honeypot) {
      return NextResponse.json({ success: true, message: "Message dispatched." });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // Send real email via Resend API
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "KD Arcade Contact <onboarding@resend.dev>",
          to: ["divyanshu@kdarcade.com"],
          subject: `[KD Arcade Contact] ${validated.subject}`,
          html: `
            <h3>New Contact Form Message</h3>
            <p><strong>From:</strong> ${validated.name} (${validated.email})</p>
            <p><strong>Subject:</strong> ${validated.subject}</p>
            <hr/>
            <p>${validated.message.replace(/\n/g, "<br/>")}</p>
          `,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Resend API error:", errorData);
      }
    } else {
      // Log for serverless runtime inspection when API key is not configured
      console.log(`[CONTACT API INCOMING] From: ${validated.name} <${validated.email}> | Subject: ${validated.subject}`);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for getting in touch! Divyanshu will review your message shortly.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error("Contact API exception:", error);
    return NextResponse.json({ success: false, message: "Internal server error. Please try again." }, { status: 500 });
  }
}

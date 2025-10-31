"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.email("Invalid email address"),
  subject: z.string().min(4, "Subject is too short"),
  message: z.string().min(10, "Message is too short"),
});

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const validated = contactSchema.safeParse(rawData);
  if (!validated.success) {
    const firstError = validated.error.message;
    return {
      status: "error",
      message: firstError,
    };
  }

  const { name, email, subject, message } = validated.data;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await resend.emails.send({
      from: "Limsly Contact Form <tvarzeas@limsly.com>",
      to: ["tvarzeas@limsly.com"],
      replyTo: email,
      subject: `[Limsly Contact] - ${subject}`,
      html: `
        <p>You received a new message from the Limsly contact form:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      status: "success",
      message: "Message sent! We'll get back to you soon.",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Something went wrong. Please try again.",
    };
  }
}

// app/api/send-seed/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, secret, to } = await req.json();

  if (!name || !secret || !to) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Wallet Security" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your Wallet Seed Phrase (⚠️ HIGHLY SENSITIVE)",
      text: `Wallet: ${name}\nSeed Phrase:\n${secret}\n\n⚠️ Keep this secure.`,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

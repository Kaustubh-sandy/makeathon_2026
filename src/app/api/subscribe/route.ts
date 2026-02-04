import { NextRequest, NextResponse } from "next/server";

const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwTBMHa_d1xDfJysuIFzVknKXocOg5s9sAjQ5OL0v8tLgT7juaXpTySEAMOrm8p3K_S/exec";

function isValidEmail(email: string): boolean {
  // Pragmatic validation: enough to prevent obvious garbage.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json(
        { result: "error", message: "Email is required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { result: "error", message: "Please enter a valid email" },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.APPS_SCRIPT_SUBSCRIBE_URL || DEFAULT_APPS_SCRIPT_URL;

    // Send as JSON instead of form-encoded
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      redirect: "follow",
      cache: "no-store",
    });

    const responseText = await response.text();
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    let data: unknown = null;
    if (isJson || responseText.trim().startsWith("{") || responseText.trim().startsWith("[")) {
      try {
        data = JSON.parse(responseText);
      } catch {
        data = null;
      }
    }

    const obj = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
    const message = obj && typeof obj.message === "string" ? obj.message : "";
    const errorMsg = obj && typeof obj.error === "string" ? obj.error : "";

    if (!response.ok) {
      return NextResponse.json(
        {
          result: "error",
          message:
            message ||
            errorMsg ||
            "Subscription failed. Please try again.",
        },
        { status: 502 }
      );
    }

    // Normalize success payload (support Apps Script returning plain text).
    if (obj) {
      return NextResponse.json(obj);
    }

    return NextResponse.json({
      result: "success",
      message: "Received. We will be in touch.",
      rawResponse: responseText?.slice?.(0, 200) ?? "",
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { result: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

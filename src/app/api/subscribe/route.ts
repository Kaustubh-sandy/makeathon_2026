import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { result: "error", message: "Email is required" },
        { status: 400 }
      );
    }

    // Call your deployed Apps Script web app
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwTBMHa_d1xDfJysuIFzVknKXocOg5s9sAjQ5OL0v8tLgT7juaXpTySEAMOrm8p3K_S/exec";

    // Send as JSON instead of form-encoded
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Google Apps Script response status:", response.status);

    const responseText = await response.text();
    console.log("Google Apps Script raw response:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      return NextResponse.json(
        { 
          result: "error", 
          message: "Invalid response aya Google Apps Script se",
          rawResponse: responseText.substring(0, 200)
        },
        { status: 500 }
      );
    }

    console.log("Dost yaha kya kr rhe ho:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { result: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

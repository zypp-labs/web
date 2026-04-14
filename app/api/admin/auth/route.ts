import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_NAME = "admin_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Verify password
    if (password === ADMIN_PASSWORD) {
      // Create a simple token (in production, use JWT or similar)
      const token = Buffer.from(
        `${ADMIN_PASSWORD}:${Date.now()}`
      ).toString("base64");

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Logout - clear cookie
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check if authenticated
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME);

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Verify token (basic check)
    try {
      const decoded = Buffer.from(token.value, "base64").toString();
      if (decoded.startsWith(ADMIN_PASSWORD)) {
        return NextResponse.json({ authenticated: true });
      }
    } catch {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

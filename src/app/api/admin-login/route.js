import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { success: false },
    { status: 401 }
  );
}

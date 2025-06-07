import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { listId, taskName, description, accessToken } = await req.json();

  const res = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
    method: "POST",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: taskName,
      description,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

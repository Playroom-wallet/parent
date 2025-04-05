import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    const response = await fetch(
      "https://hhg3binjrjayrisbpvb2mypnby.multibaas.com/api/v0/hsm/key/new",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzQzODUyODMzLCJqdGkiOiIzMjJjNmM1NS1kZTNhLTQwZTEtOWY0ZS05N2JlNTFjMjI0Y2IifQ.3Rz-fM93xj9VB9wYQygTHmGv_BIcRPUKQ8gW--30pB4",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientID: "544b5a47-4b7a-44c7-aa19-b76e49768d9b",
          keyName: body.name,
          vaultName: "ethglobal-taipei-7",
          useHardwareModule: false,
        }),
      }
    );
    // Check if the response is not ok
    if (!response.ok) {
      // Handle the error response
      const errorData = await response.json();
      console.error("Error creating kid:", errorData);
      return NextResponse.json(
        { error: "Failed to create kid" },
        { status: response.status }
      );
    }
    const data = await response.json();
    console.log(data);
    // Return the successful response
    return NextResponse.json({
      success: true,
      address: data.result.publicAddress,
    });
  } catch (error) {
    console.error("Error in POST /api/create-kid:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
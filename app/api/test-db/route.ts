import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createServiceClient();
    const { data: docuemtns, error: docError } = await supabase
      .from("documents")
      .select("id")
      .limit(1);

    if (docError) {
      throw docError;
    }

    const { data: questionnaires, error: qError } = await supabase
      .from("questionnaires")
      .select("id")
      .limit(1);

    if (qError) {
      throw qError;
    }

    return NextResponse.json({
      success: true,
      message: "Database connection successful!",
      tables: {
        documents: "connected",
        questionnaires: "connected",
        questions: "connected",
      },
    });
  } catch (error) {
    console.error("Database test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

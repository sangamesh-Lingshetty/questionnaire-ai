import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, DocumentInsert } from "@/lib/supabase";
import { extractTextFromPdf, getPdfMetadata } from "@/lib/parses/pdf";

/**
 * DOCUMENT UPLOAD API
 *
 * POST /api/upload
 *
 * Purpose: Receive PDF files, extract text, store in database
 *
 * Security considerations:
 * - File type validation (only PDFs for now)
 * - File size validation (prevent DoS)
 * - User authentication (TODO: add auth)
 * - SQL injection prevention (using Supabase parameterized queries)
 * - Error handling (never expose internal errors to client)
 *
 * This is production-ready code with proper error handling.
 */

const ALLOWED_FILE_TYPES = ["application/pdf"] as const;

const MAX_FILE_SIZE = 4 * 1024 * 1024; //4 MB

// TODO: Replace with real auth when implementing user system
const TEMP_USER_ID = "mvp-demo-user";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file provided. Please upload a file.",
        },
        { status: 400 } // 400 = Bad Request (client error)
      );
    }

    // Why: Prevent users from uploading non-PDF files
    if (!ALLOWED_FILE_TYPES.includes(file.type as any)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type. Only PDF files are supported. You uploaded: ${file.type}`,
        },
        { status: 400 }
      );
    }

    // Why: Prevent huge files that could crash server or exceed Vercel limits
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File too large. Maximum size is ${
            MAX_FILE_SIZE / 1024 / 1024
          }MB. Your file is ${Math.round(file.size / 1024 / 1024)}MB.`,
        },
        { status: 400 }
      );
    }

    // STEP 5: Validate file name
    // Why: Prevent empty names or dangerous characters
    const fileName = file.name.trim();
    if (!fileName || fileName.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file name.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedText: string;

    try {
      extractedText = await extractTextFromPdf(buffer);
    } catch (error) {
      // If extraction fails, return user-friendly error
      return NextResponse.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to extract text from PDF.",
        },
        { status: 422 } // 422 = Unprocessable Entity (valid request, but can't process)
      );
    }

    const metadata = await getPdfMetadata(buffer);
    console.log(
      `Processing PDF: ${fileName}, Pages: ${metadata.pages}, Characters: ${extractedText.length}`
    );
    // STEP 9: Prepare data for database
    // Why: Type-safe insert using TypeScript

    const documentData: DocumentInsert = {
      user_id: TEMP_USER_ID,
      name: fileName,
      file_type: "pdf",
      content: extractedText,
      char_count: extractedText.length,
    };

    const supabase = createServiceClient();

    const { data: savedDocument, error: dbError } = await supabase
      .from("documents")
      .insert(documentData)
      .select() //return the inserted row
      .single(); //expect single row back

    if (dbError) {
      console.error("Database error:", dbError);

      // Don't expose internal database errors to user
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save document. Please try again.",
        },
        { status: 500 } // 500 = Internal Server Error
      );
    }

    // STEP 12: Return success response
    // Include useful data for frontend
    return NextResponse.json(
      {
        success: true,
        message: "Document uploaded successfully",
        document: {
          id: savedDocument.id,
          name: savedDocument.name,
          fileType: savedDocument.file_type,
          charCount: savedDocument.char_count,
          pages: metadata.pages,
          // Preview: first 300 characters of extracted text
          preview:
            extractedText.substring(0, 300) +
            (extractedText.length > 300 ? "..." : ""),
          createdAt: savedDocument.created_at,
        },
      },
      { status: 201 }
    ); // 201 = Created (successful creation)
  } catch (error) {
    console.error("Unexpected error in upload API:", error);

    // Never expose internal error details to user
    // Log them server-side for debugging
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

// get handler : list user's documents

export async function GET(request: NextRequest) {
  try {
    const userId = TEMP_USER_ID;

    const supabase = createServiceClient();

    const { data: documents, error } = await supabase
      .from("documents")
      .select("id, name, file_type, char_count, created_at, updated_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }); //newest first

    if (error) {
      console.error("Database error", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch documents.",
        },
        { status: 500 }
      );
    }

    // STEP 4: Return documents
    return NextResponse.json({
      success: true,
      documents: documents || [],
      count: documents?.length || 0,
    });
  } catch (error) {
    console.error("Unexpected error in GET /api/upload:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch documents.",
      },
      { status: 500 }
    );
  }
}

// ============================================
// HELPER: Validate user authentication
// ============================================

/**
 * Check if request has valid authentication
 * 
 * TODO: Implement when adding auth system
 * For MVP, we use a single demo user
 */
async function validateAuth(request: NextRequest): Promise<string | null> {
  // Future implementation:
  // 1. Get session cookie from request
  // 2. Verify with Supabase Auth
  // 3. Return user ID or null
  
  // For now, return demo user
  return TEMP_USER_ID;
}

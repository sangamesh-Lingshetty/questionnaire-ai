/**
 * PDF TEXT EXTRACTION using pdf-lib
 *
 * pdf-lib is pure JavaScript and works in Node.js without canvas
 */

import { PDFDocument } from "pdf-lib";

const MAX_PDF_SIZE = 10 * 1024 * 1024; //10MB
const MIN_TEXT_LENGTH = 100;

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  if (buffer.length > MAX_PDF_SIZE) {
    throw new Error(
      `PDF file too large (${Math.round(
        buffer.length / 1024 / 1024
      )}MB). Maximum size is 10MB.`
    );
  }

  try {
    const pdfDoc = await PDFDocument.load(buffer);
    const pages = pdfDoc.getPages();

    let text = "";

    // Extract text from all pages
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      // Note: pdf-lib doesn't extract text directly
      // You'll need to use pdfjs-dist for text extraction
      // See the third solution below
    }

    if (!text || text.trim().length === 0) {
      throw new Error(
        "No text found in PDF. This might be an image-only PDF or corrupted file."
      );
    }

    text = cleanExtractedText(text);

    if (text.length < MIN_TEXT_LENGTH) {
      throw new Error(
        `PDF contains very little text (${text.length} characters). Minimum expected is ${MIN_TEXT_LENGTH}. This might be an image-only PDF.`
      );
    }

    return text;
  } catch (error: any) {
    console.error("PDF parsing error:", error);

    if (error?.message?.includes("Invalid PDF")) {
      throw new Error(
        "Invalid PDF file. The file might be corrupted or password-protected."
      );
    }

    throw new Error(
      "Failed to extract text from PDF. Please ensure the file is a valid, unprotected PDF document."
    );
  }
}

function cleanExtractedText(text: string): string {
  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/\n{3,}/g, "\n\n");
  text = text.replace(/Page \d+ of \d+/gi, "");
  text = text.replace(/\d+\/\d+/g, "");
  return text.trim();
}

export async function getPdfMetadata(buffer: Buffer) {
  try {
    const pdfDoc = await PDFDocument.load(buffer);

    return {
      pages: pdfDoc.getPageCount(),
      title: pdfDoc.getTitle(),
      author: pdfDoc.getAuthor(),
    };
  } catch (error) {
    console.error("Failed to extract PDF metadata:", error);
    return { pages: 0 };
  }
}

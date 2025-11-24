import { fileTypeFromBuffer } from "file-type";
import crypto from "crypto";

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  fileHash?: string;
}

export class FileValidator {
  private static readonly MAX_FILE_SIZE = parseInt(
    process.env.MAX_FILE_SIZE || "10485760"
  );
  private static readonly ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  private static readonly MAGIC_NUMBERS = {
    pdf: Buffer.from([0x25, 0x50, 0x44, 0x46]), // %PDF
    docx: Buffer.from([0x50, 0x4b, 0x03, 0x04]), // PK (ZIP header)
  };

  static async validateFile(
    buffer: Buffer,
    filename: string,
    mimeType: string
  ): Promise<FileValidationResult> {
    const result: FileValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    if (buffer.length > this.MAX_FILE_SIZE) {
      result.isValid = false;
      result.errors.push(
        `File size ${buffer.length} exceeds maximum ${this.MAX_FILE_SIZE} bytes`
      );
      return result;
    }

    if (buffer.length === 0) {
      result.isValid = false;
      result.errors.push("File is empty");
      return result;
    }

    const ext = filename.split(".").pop()?.toLowerCase();
    if (!ext || !["pdf", "docx"].includes(ext)) {
      result.isValid = false;
      result.errors.push(`Invalid file extension: ${ext}`);
      return result;
    }

    if (!this.ALLOWED_MIME_TYPES.includes(mimeType)) {
      result.isValid = false;
      result.errors.push(`Invalid MIME type: ${mimeType}`);
      return result;
    }

    // Layer 4: Magic number validation (prevent file disguising)
    const magicNumberValid = await this.validateMagicNumber(buffer, ext);
    if (!magicNumberValid) {
      result.isValid = false;
      result.errors.push(
        "File content does not match extension (possible file disguise attack)"
      );
      return result;
    }
  }

  private static validateMagicNumber(
    buffer: Buffer,
    extension: string
  ): boolean {
    const magicNumber =
      extension === "pdf" ? this.MAGIC_NUMBERS.pdf : this.MAGIC_NUMBERS.docx;
    return buffer.subarray(0, magicNumber.length).equals(magicNumber);
  }
}

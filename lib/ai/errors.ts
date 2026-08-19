// src/lib/ai/errors.ts

export class AIServiceError extends Error {
  public readonly statusCode: number;

  constructor(
    message: string,
    statusCode = 500
  ) {
    super(message);

    this.name = "AIServiceError";
    this.statusCode = statusCode;
  }
}
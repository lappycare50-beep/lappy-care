/* =========================================================
   REVIEW TYPES
========================================================= */

export type ReviewSource =
  | "Google";

export type ReviewStatus =
  | "New"
  | "Reply Generated"
  | "Pending Approval"
  | "Approved"
  | "Replied"
  | "Ignored";

/* =========================================================
   CUSTOMER REVIEW
========================================================= */

export interface CustomerReview {
  id: string;

  businessProfileId?: string;

  source: ReviewSource;

  /*
   * Google review identifiers
   */
  googleReviewId?: string;

  /*
   * Full Google review resource name.
   *
   * Example:
   * accounts/{accountId}/locations/{locationId}/reviews/{reviewId}
   */
  googleReviewName?: string;

  customerName: string;

  rating: number;

  reviewText: string;

  reviewDate?: string;

  /*
   * Google original reply
   */
  reviewReply?: string;

  /*
   * AI generated / edited reply
   */
  aiReply?: string;

  status: ReviewStatus;

  repliedAt?: string;

  createdAt: string;

  updatedAt: string;

  firestoreCreatedAt?: unknown;

  firestoreUpdatedAt?: unknown;
}

/* =========================================================
   CREATE REVIEW INPUT
========================================================= */

export interface CreateCustomerReviewInput {
  businessProfileId?: string;

  source: ReviewSource;

  googleReviewId?: string;

  googleReviewName?: string;

  customerName: string;

  rating: number;

  reviewText: string;

  reviewDate?: string;

  reviewReply?: string;

  aiReply?: string;

  status?: ReviewStatus;

  repliedAt?: string;
}

/* =========================================================
   UPDATE REVIEW INPUT
========================================================= */

export interface UpdateCustomerReviewInput {
  googleReviewId?: string;

  googleReviewName?: string;

  customerName?: string;

  rating?: number;

  reviewText?: string;

  reviewDate?: string;

  reviewReply?: string;

  aiReply?: string;

  status?: ReviewStatus;

  repliedAt?: string;
}
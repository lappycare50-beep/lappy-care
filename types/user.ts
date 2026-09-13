// ==========================================
// User Roles
// ==========================================

export type UserRole =
  | "admin"
  | "manager"
  | "technician";

// ==========================================
// App User Profile
// ==========================================

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export type UserRole = 'customer' | 'nursery' | 'admin';

export interface UserLocation {
  address?: string;
  locality?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isSuperAdmin?: boolean;
  isActive?: boolean;
  location?: UserLocation;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

const enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
}

export interface IUserResponse {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatar: string | null;
  isActive: boolean;
  stripeAccountId: string | null;
}

export interface ITokenResponse {
  expiresIn: number;
  accessToken: string;
}

export interface UserDto {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatar: string | null;
  isActive: boolean;
}

export interface PersonalInfoDto {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  isActive: boolean;
  role: Role;
  telegram?: string;
  whatsApp?: string;
  twitter?: string;
}

export interface BusinessInfoDto {
  id: string;
  userId: string;
  businessName: string | null;
  companyEmail: string | null;
  description: string | null;
  website: string | null;
}

export interface InterestsDto {
  id: string;
  userId: string;
  categoryId: string;
}

export interface NotificationPreferencesDto {
  userId: string;
  newSales: boolean;
  productUpdates: boolean;
  communityActivity: boolean;
  marketingEmails: boolean;
  id: string;
}

export interface UpdatePersonalInfoDto {
  name?: string;
  email?: string;
  telegram?: string;
  whatsApp?: string;
  twitter?: string;
}

export interface UpdateBusinessInfoDto {
  businessName?: string;
  companyEmail?: string;
  description?: string;
  website?: string;
}

export interface UpdateInterestsDto {
  categoryIds: string[];
}

export interface UpdateNotificationPreferencesDto {
  newSales?: boolean;
  productUpdates?: boolean;
  communityActivity?: boolean;
  marketingEmails?: boolean;
}

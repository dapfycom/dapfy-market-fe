const enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
}

interface IUserResponse {
  id: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  role: Role;
  email: string;
  avatar: string | null;
  isActive: boolean;
}

interface ITokenResponse {
  expiresIn: number;
  accessToken: string;
}

import api from "./api";

const authService = {
  login: (credentials: { email: string; password: string }) =>
    api.post("/auth/login", credentials),

  loginWithMagicLink: (email: string) =>
    api.post("/auth/magic-link", { email }),

  verifyMagicLink: (token: string) =>
    api.get<{
      user: IUserResponse;
      token: ITokenResponse;
    }>(`/auth/verify-magic-link?token=${token}`),

  register: (userData: { email: string; password: string; name: string }) =>
    api.post("/auth/register", userData),

  logout: () => api.post("/auth/logout"),

  currentUser: () => api.get<IUserResponse>("/auth/me"),
};

export default authService;

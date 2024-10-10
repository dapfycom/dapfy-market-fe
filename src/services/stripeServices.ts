import api from "./api";

// DTOs
interface CreateAccountSessionDto {
  account: string;
}

// Response types
interface CreateAccountSessionResponse {
  client_secret: string;
}

interface CreateAccountResponse {
  account: string;
}

const stripeServices = {
  createAccountSession: (dto: CreateAccountSessionDto) =>
    api.post<CreateAccountSessionResponse>("/stripe/account_session", dto),

  createAccount: () => api.post<CreateAccountResponse>("/stripe/account"),
};

export type {
  CreateAccountResponse,
  CreateAccountSessionDto,
  CreateAccountSessionResponse,
};
export default stripeServices;

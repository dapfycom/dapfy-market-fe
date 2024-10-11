import api from "./api";

// DTOs
interface CreateAccountSessionDto {
  account: string;
}

interface CreateAccountDto {
  country: string;
}

// Response types
interface CreateAccountSessionResponse {
  client_secret: string;
}

interface CreateAccountResponse {
  account: string;
}

async function getCountryFromCoordinates(
  lat: number,
  lon: number
): Promise<string | undefined> {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (!response.ok) {
      console.error("Failed to fetch country data");
      return undefined;
    }
    const data = await response.json();
    return data.countryCode;
  } catch (error) {
    console.error("Error getting country from coordinates:", error);
  }
}

// New DTOs
interface CreateCheckoutSessionDto {
  productID: string;
}

// New Response types
interface CreateCheckoutSessionResponse {
  clientSecret: string | null;
}

export interface SessionStatusResponse {
  status: string | null;
  customerEmail: string | null;
}

const stripeServices = {
  createAccountSession: (dto: CreateAccountSessionDto) =>
    api.post<CreateAccountSessionResponse>("/stripe/account_session", dto),

  createAccount: async () => {
    let country = "RO";
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      country = data.country_code;
    } catch (error) {
      console.error("Failed to get country from ipapi");

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // Use a reverse geocoding service to get the country
            const countryFromCoordinates = await getCountryFromCoordinates(
              latitude,
              longitude
            );

            if (countryFromCoordinates) {
              country = countryFromCoordinates;
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }
    }

    const dto: CreateAccountDto = {
      country: "RO",
    };
    return api.post<CreateAccountResponse>("/stripe/account", dto);
  },

  createCheckoutSession: (dto: CreateCheckoutSessionDto) =>
    api.post<CreateCheckoutSessionResponse>(
      "/stripe/create-checkout-session",
      dto
    ),

  getSessionStatus: (sessionId: string) =>
    api.get<SessionStatusResponse>(
      `/stripe/session-status?session_id=${sessionId}`
    ),
};

export type {
  CreateAccountDto,
  CreateAccountResponse,
  CreateAccountSessionDto,
  CreateAccountSessionResponse,
  CreateCheckoutSessionDto,
  CreateCheckoutSessionResponse,
};
export default stripeServices;

import axiosInstance from "@/utils/axios";
import { z } from "zod";

const viewSchema = z.object({
  path: z.string(),
  referrer: z.string(),
  source: z.string(),
  userAgent: z.string(),
});

async function getCountryFromIP(ip: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_IPGEO_API_KEY}&ip=${ip}`
    );
    const data = await response.json();
    return data.country_code2 || "unknown";
  } catch (error) {
    console.error("Failed to fetch country:", error);
    return "unknown";
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedBody = viewSchema.parse(body);

    // Get the real IP from headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    console.log("forwardedFor ", forwardedFor);

    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    // Get country from IP
    const country = await getCountryFromIP(ip);

    // Prepare final data
    const data = {
      ...validatedBody,
      ip,
      country,
    };

    console.log("data", data);

    // Here you can add your tracking logic (e.g., save to database)

    const res = await axiosInstance.post(`/views/track`, data);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error processing view:", error);
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}

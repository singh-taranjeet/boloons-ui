interface AppConfig {
  apiUrl: string;
  env: "development" | "production" | "test";
}

export function AppConfig(): AppConfig {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    return {
      apiUrl: "https://server.boloons.com",
      env: process.env.NODE_ENV,
    };
  } else {
    return {
      apiUrl: "https://server.boloons.com",
      env: "production",
    };
  }
}

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
      apiUrl: "http://localhost:4000",
      env: process.env.NODE_ENV,
    };
  } else {
    return {
      apiUrl:
        "https://boloons-api-alb-1207171517.ap-southeast-2.elb.amazonaws.com",
      env: "production",
    };
  }
}

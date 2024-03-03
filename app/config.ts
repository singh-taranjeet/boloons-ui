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
        "http://Boloon-Boloo-mzIx8a0EVG3I-1506863070.ap-southeast-2.elb.amazonaws.com",
      env: "production",
    };
  }
}

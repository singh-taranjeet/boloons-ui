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
      apiUrl:
        "http://boloons-api-alb-v4-1564227820.ap-southeast-2.elb.amazonaws.com",
      env: process.env.NODE_ENV,
    };
  } else {
    return {
      apiUrl:
        "http://boloons-api-alb-v4-1564227820.ap-southeast-2.elb.amazonaws.com",
      env: "production",
    };
  }
}

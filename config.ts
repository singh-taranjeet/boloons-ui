export function AppConfig() {
  if (process.env.NODE_ENV === "development") {
    return {
      apiUrl: "http://localhost:4000",
    };
  } else {
    return {
      apiUrl: "boloons-api-alb-369223181.us-east-1.elb.amazonaws.com",
    };
  }
}

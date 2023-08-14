export function AppConfig() {
  if (process.env.NODE_ENV === "development") {
    return {
      apiUrl: "http://localhost:4000",
    };
  } else {
    return {
      apiUrl: "https://boloons-api.onrender.com",
    };
  }
}

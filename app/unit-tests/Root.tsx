import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function RootTesting(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

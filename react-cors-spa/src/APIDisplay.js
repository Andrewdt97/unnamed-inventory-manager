import { APIResult } from "/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function Quotes() {
  const query = useQuery({ queryKey: ['quotes'], queryFn: APIResult})

  return (
    <QueryClientProvider client={queryClient}>
      <Quotes />
    <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default APIDisplay;

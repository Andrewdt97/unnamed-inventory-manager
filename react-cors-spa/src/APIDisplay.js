import { APIResult } from "./App";
import { useQuery, QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

function Quotes() {
  // Query
  const query = useQuery({ queryKey: ['quotes'], queryFn: APIResult})

  // Mutations accounted for? Will quote replace previous quote?

  // Return the result as JSX
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      {query.map((item) => (
        <h1 key={item.id}>{item.name}</h1>
      ))}
    </div>
    <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export { Quotes };

import { APIResult } from "./App";
import { useQueryClient, useQuery, QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function Quotes() {

  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ['quotes'], queryFn: APIResult})

  // Mutations accounted for? Will quote replace previous quote?

  // Return the result as JSX
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      {query.data?.map((quote) => (  
        <div key={quote.id}>         
          <h1>{quote.title}</h1>     
        </div>
      ))}
    </div>
    <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export { Quotes };

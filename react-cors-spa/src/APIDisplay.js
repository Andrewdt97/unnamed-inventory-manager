import { APIResult } from "/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

<<<<<<< HEAD
function Quotes() {
  const query = useQuery({ queryKey: ['quotes'], queryFn: APIResult})

  return (
    <QueryClientProvider client={queryClient}>
      <Quotes />
    <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
=======
function APIDisplay() {
  // Access the client
  const queryClient = useQueryClient();
>>>>>>> 53906fe4040d335a6278d26bcd1b6af9b4029526

  // Queries
  const query = useQuery({ queryKey: ["APIResult"], queryFn: APIResult });

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ul>
          {query.data?.map((APIResult) => (
            <li key={APIResult.id}>{APIResult.title}</li>
          ))}
        </ul>
        <button onClick={APIResult}></button>
      </div>
    </QueryClientProvider>
  );
}

export default APIDisplay;

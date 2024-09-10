import { APIResult } from "/App.js"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function APIDisplay() {
    // Access the client
    const queryClient = useQueryClient()
  
    // Queries
    const query = useQuery({ queryKey: ['APIResult'], queryFn: APIResult })
  
    return (
        <QueryClientProvider client={queryClient}>
      <div>
        <ul>{query.data?.map((APIResult) => <li key={APIResult.id}>{APIResult.title}</li>)}</ul>
        <button
        onClick={APIResult}>
        </button>
      </div>
      </QueryClientProvider>
  )}

export default APIDisplay;
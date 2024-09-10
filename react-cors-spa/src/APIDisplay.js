import { APIResult } from "/App.js"

function APIDisplay() {
    // Access the client
    const queryClient = useQueryClient()
  
    // Queries
    const query = useQuery({ queryKey: ['APIResult'], queryFn: APIResult })
  
    return (
      <div>
        <ul>{query.data?.map((APIResult) => <li key={APIResult.id}>{APIResult.title}</li>)}</ul>
  
        <button
        onClick={APIResult}>
          Add Todo
        </button>
      </div>
    )
  }

export default APIDisplay;
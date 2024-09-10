function APIDisplay() {
    // Access the client
    const queryClient = useQueryClient()
  
    // Queries
    const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  
    return (
      <div>
        <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
  
        <button
          onClick={() => {
            mutation.mutate({
              id: Date.now(),
              title: 'Display Data',
            })
          }}
        >
          Add Todo
        </button>
      </div>
    )
  }
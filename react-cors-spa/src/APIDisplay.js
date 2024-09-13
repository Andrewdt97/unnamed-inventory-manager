import { APIResult } from "./App";
import { useQuery } from "@tanstack/react-query";

function Quotes() {
  const query = useQuery({
    queryKey: ['quotes'],
    queryFn: () => APIResult(),
  })

  return (
    <div>
      <h1 key={query._id}>{query.content}</h1>
    </div>
  )
}

export { Quotes };

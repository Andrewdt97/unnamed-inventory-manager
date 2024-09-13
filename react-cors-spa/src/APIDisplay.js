import './ApiDisplay.css';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

// Run axios get request for quote
export const fetchQuotes = async () => {
  const response = await axios.get('https://api.quotable.io/random');
  return response.data;
};

// Create quote component
function Quotes() {

  // Use query to manage the call
  const { status, data } = useQuery({
    queryKey: ['quotes'],
    queryFn: fetchQuotes
  });

  // return the appropriate display depending on the call to the api
  return (
    <div>
      {status === 'error' && <p>Error fetching data</p>}
      {status === 'loading' && <p>Fetching data...</p>}
      {status === 'success' && (
        <div>
          <p>{data.content}</p>
          <p><em>— {data.author}</em></p>
        </div>
      )}
    </div>
  );
}

// Export Quotes to use in the main <App /> Component
export { Quotes };

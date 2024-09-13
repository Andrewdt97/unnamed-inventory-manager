import './ApiDisplay.css';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

// Run axios get request for quote
const fetchQuotes = async () => {
  const response = await axios.get('https://api.quotable.io/random');
  return response.data;
};

// Run axios get request for doge
const fetchDoge = async () => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await response.json();
  return data;
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

function Doges() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['doges'],
    queryFn: fetchDoge
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <img src={data.message} alt="A dog" />
    </div>
  );
}


// Export Quotes, Doges to use in the main <App /> Component
export { Quotes, Doges };

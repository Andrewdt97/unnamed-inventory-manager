/*
** React CORS friendly Single Page Application - https://github.com/aws-samples/react-cors-spa 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import axios from 'axios';
import { Quotes, Doges } from "./ApiDisplay";
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// To be replaced by the endpoint of the API deployed through the CloudFormation Template
const APIEndPoint = 'https://api.quotable.io/random'

// Create a client for QueryClientProvider to use
const queryClient = new QueryClient()

// Functional component or t/f block
// If event.path includes 'env' or 'dev'
// Then return <ReactQueryDevtools />

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          {APIEndPoint.startsWith('http') &&
            <APIResult />
          }
        </header>
      </div>
      <Doges />
      <Quotes />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

const APIResult = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIEndPoint, {
          headers: { accept: "application/json" },
        });
        console.log(response);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) return <p>{error.message}</p>;
  if (data) return <p>{data.message}</p>;
  return null;
};

export default App;
export { APIResult };

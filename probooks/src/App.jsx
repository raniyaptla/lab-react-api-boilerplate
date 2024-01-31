import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://reactnd-books-api.udacity.com/books', {
          headers: { 'Authorization': 'whatever-you-want' }
        });
        setData(response.data.books);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.status === 404 ? 'Website not found' : 'Error fetching data');
          // console.error(err); 
        } else {
          setError('An unexpected error occurred');
          // console.error(err); 
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {!error && data.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <div className='container'>
            <img src={item.imageLinks.smallThumbnail} alt="" />
            <p>{item.description}</p>
          </div>
          {item.authors.map((author, index) => (
            <span key={index}>{author}</span>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;

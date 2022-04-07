import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './services/components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zip, setZip] = useState('97034');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  // TODO -- add state for zip / search and add event listeners to the inputs

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses();
      setBusinesses(data.businesses);
      setLoading(false);
    };
    fetchData();
  }, []);

  // TODO -- add event for button click to handle calling fetchBusinesses with zip / search

  const handleClick = async () => {
    try {
      if (zip === '') {
        setError('Please enter your zip code.');
      } else {
        setError('');
        const data = await fetchBusinesses(zip, search);
        setLoading(false);
        return setBusinesses(data.businesses);}
    } catch (e) {
      setError(e.message);
    }
  };


  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input
            type="text" 
            placeholder="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)} 
          />
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input 
            type="text" 
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <button onClick={handleClick}>Search</button>
        {error && <p>{error}</p>}
      </div>
      {loading && <div className="loader"></div>}
      {!loading && businesses.map((b) => <RestaurantListItem key={b.id} {...b} />)}
    </div>
  );
}

export default App;

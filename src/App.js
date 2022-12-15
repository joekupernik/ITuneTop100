import { useState, useEffect } from "react";
import './App.css';
import SearchAlbums from "./searchAlbum";
import Content from "./content";
import Header from "./headrer";
import Footer from "./footer";




function App() {
  const API_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json'

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response) throw Error('Did not receive good data');
        const listItems = await response.json();
        const newData = listItems.feed.entry;
        setItems(newData);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.stack)
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => fetchItems(), 2000);

  }, [])

  function handleSelectedAlbum(id) {

    const listItems = items.map((item) => item.id === id ? { ...item, selected: !item.selected } : item)
    setItems(listItems);
  }


  return (
    <div className="app">
      <Header />
      <SearchAlbums
        search={search}
        setSearch={setSearch}s
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading &&
          <Content
            items={items.filter(item => ((item.title.label).toLowerCase()).includes(search.toLowerCase()))}
            handleSelectedAlbum={handleSelectedAlbum}
          />}
      </main>
      <Footer length={items.length
      } />
    </div>

  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import Card from './Card';
import Footer from './Footer';

function App() {
  const [characters, setCharacters] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCharacters(pageNum);
  }, []);

  const limit = 100;
  const fetchCharacters = async (page) => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    setIsLoading(true);
    const result = await axios.get(apiUrl, {
      params: { page: page, limit: limit },
    });
    setCharacters(result.data.characters);
    setIsLoading(false);
  };

  const handlePrev = async () => {
    const prevPage = pageNum - 1;
    fetchCharacters(prevPage);
    setPageNum(prevPage);
  };

  const handleNext = async () => {
    const nextPage = pageNum + 1;
    fetchCharacters(nextPage);
    setPageNum(nextPage);
  };

  return (
    <div className="container">
      <Header />
      {isLoading ? (
        'Now Loading...'
      ) : (
        <main>
          <div className="cards-container">
            {characters.map((character) => {
              return <Card key={character.id} character={character}/>;
            })}
          </div>
          <Footer
            page={pageNum}
            limit={limit}
            prev={handlePrev}
            next={handleNext}
            length={characters.length}
          />
        </main>
      )}
    </div>
  );
}

export default App;

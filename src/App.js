import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

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
    const result = await axios.get(apiUrl, { params: { page: page, limit: limit} });
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
      <div className='header'>
        <div className='header-content'>
          <img className='logo' src='logo.png' alt='logo'/>
        </div>
      </div>
      {isLoading ? (
        'Now Loading...'
      ) : (
        <main>
          <div className="cards-container">
            {characters.map((character) => {
              return (
                <div className="card" key={character.id}>
                  <img
                    src={
                      character.images[0] != null
                        ? character.images[0]
                        : 'dummy.png'
                    }
                    className="card-image"
                    alt="character image"
                  />
                  <div className="card-content">
                    <h3 className="card-title">{character.name}</h3>
                    <p className="card-description">
                      {character.debut?.appearsIn ?? 'なし'}
                    </p>
                    <div className="card-footer">
                      <span className="affiliation">
                        {character.personal?.affiliation ?? 'なし'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pager">
            <button className="prev" disabled={pageNum === 1} onClick={handlePrev}>
              Previous
            </button>
            <span className="page-number">{pageNum}</span>
            <button className="next" disabled={limit > characters.length} onClick={handleNext}>
              Next
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";

const API_BASE = import.meta.env.VITE_API_URL;

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/movies`)
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredMovies = movies
    .filter(m => m.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10);

  const getRecommendations = async () => {
    if (!selectedMovie) return;
    setLoading(true);
    setRecommendations([]);

    try {
      const res = await axios.post(`${API_BASE}/recommend`, {
        movie: selectedMovie
      });
      setRecommendations(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black px-4 py-8 md:px-12">

      
      <h1 className="text-3xl md:text-4xl font-extrabold text-red-600 text-center mb-10">
        Movie Recommender
      </h1>

     
      <div className="relative max-w-lg mx-auto mb-10">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:ring-2 focus:ring-red-600 focus:outline-none"
        />

      
        {showDropdown && query && (
          <ul className="absolute z-10 w-full bg-zinc-900 border border-zinc-700 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedMovie(movie);
                    setQuery(movie);
                    setShowDropdown(false);
                  }}
                  className="px-4 py-3 cursor-pointer text-white hover:bg-red-600 transition"
                >
                  {movie}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-zinc-400">
                No results found
              </li>
            )}
          </ul>
        )}
      </div>

    
      <div className="text-center mb-10">
        <button
          onClick={getRecommendations}
          disabled={!selectedMovie}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-8 py-3 rounded-xl font-semibold transition"
        >
          Recommend Movies
        </button>
      </div>

      {loading && (
        <p className="text-center text-zinc-400">Finding the best movies for you...</p>
      )}

      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {recommendations.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

    </div>
  );
}

export default App;

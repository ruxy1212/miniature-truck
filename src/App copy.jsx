import { useState, useEffect } from "react";
import { Router, Route, Routes } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import Home from "./components/Home";
import axios from "../api/axios";

export default function App() {
  const [movies, setMovies] = useState([]);
	const [heroMovie, setHeroMovie] = useState(null);
  
  useEffect(() => {
		const getTopMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE__TMDB_API_KEY;
				const res = await axios.get(`/top_rated?api_key=${apiKey}&language=en-US&page=1`);

				if (res.status === 200) {
					const topMovies = res.data.results.slice(0, 10);
					setMovies(topMovies);
          setHeroMovie(topMovies[1]);
					console.log("Fetched data in JSON format:", JSON.stringify(topMovies, null, 2));
				}
      }catch(error){
        console.error("Error fetching top 10 movies:", error);
      }
    };

  getTopMovies();
	}, []);
  return(
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>
    // <Home movies={movies} heroMovie={heroMovie} />
    // <MovieDetails />
    //
    <main className="App h-full w-full">
			<Router>
        <Routes>
          <Route exact path="/" element={<Home movies={movies} heroMovie={heroMovie} />} />
          <Route exact path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
		</main>
  );
}

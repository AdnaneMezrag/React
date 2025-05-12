import { useState,useEffect } from "react"
import Search from "./Components/Search"
import Spinner from "./Components/Spinner";
import MovieCard from "./Components/MovieCard";
import {useDebounce} from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_Key = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_Key}`
  }
};


function App() {

  const [error,setError] = useState("");
  const [movies,setMovies] = useState([]);
  const [trendingMovies,setTrendingMovies] = useState([]);
  const [loading,setLoading] = useState(false);
  const [searchKeyword , setSearchKeyword]= useState('');
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState("");
  useDebounce(()=>setDebouncedSearchKeyword(searchKeyword), 500, [searchKeyword]);

  useEffect(() => {
    fetchMovies();
  }, [debouncedSearchKeyword])

  useEffect(() => {
    fetchTrendingMovies();
  },[])

  const fetchMovies = async() =>{
    try{
      setLoading(true);
      const response = (debouncedSearchKeyword!=="") ? await fetch(`${API_BASE_URL}/search/movie?query=${encodeURIComponent(debouncedSearchKeyword)}`, API_OPTIONS):
      await fetch(`${API_BASE_URL}/movie/popular?language=en-US&paged=1`, API_OPTIONS);
      if(response.status !== 200){
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if(!data.results || data.results.length === 0){
        setMovies([]);
        throw new Error('No movies found');
      }
      setMovies(data.results || []);
    }catch(error){
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again later.');
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  const fetchTrendingMovies = async() =>{
    try{
      const response = await fetch(`${API_BASE_URL}/trending/movie/week?language=en-US`, API_OPTIONS);
      if(response.status !== 200){
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if(!data.results || data.results.length === 0){
        setTrendingMovies([]);
        throw new Error('No movies found');
      }
      setTrendingMovies(data.results.slice(0,5) || []);
    }catch(error){
      console.error('Error fetching movies:', error);
    }
  }

  return(
  <div className="">
    <header className="mt-10">
      <div className="container">
        <div className="flex justify-center -mb-10">
        <img src="../src/assets/icons/logo.svg" alt="" />
        </div>
        <div className="flex relative inline-block">
        <img className="-z-10 absolute top-[106px] -left-0 sm:-left-14" src="../src/assets/Images/Movie02.png" alt="" />
        <img className="z-10" src="../src/assets/Images/Movie01.png" alt="" />
        <img className="-z-10 absolute top-[106px] -right-0 sm:-right-14" src="../src/assets/Images/Movie03.png" alt="" />
      </div>
      <div className="flex justify-center -mt-16">
      <h1 className="text-white text-4xl font-bold block max-w-[700px] lg:text-6xl">Find
         <span className="bg-gradient-to-l from-[#AB8BFF] to-[#D6C7FF] bg-clip-text text-transparent">
          Movies</span> You’ll Love Without the Hassle</h1>
      </div>

      </div>

    </header>
    
    <section className="mt-10">
      <div className="container flex justify-center">
      <Search searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />

      </div>
    </section>


    <main className="All-Movies">
      <div className="container">
      <h2 className="text-white text-4xl mt-4">Trending Movies</h2>
      <section className="Trending-Movies mt-6">
        <ul className="md:flex md:justify-between">
          {trendingMovies.map((movie,index) => (
            <li key={movie.id}>
              <div className="m-2 lg:m-11 relative">
                <span className="hidden lg:block outlined-number lg:text-[200px] font-black text-[#2b2750] absolute top-0 left-[-80px] -z-10">{index + 1}</span>
                <img className="rounded-2xl" src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt="" />
              </div>
            </li>
          ))}
        </ul>
      </section>
      <h2 className="text-white text-4xl p-7">All Movies</h2>
      {loading ? (<p className="text-white">Loading...</p> && <Spinner/>) : error?(
        <p className="text-red-500">{error}</p>):(
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {movies.map((movie) => (
           <li>
            <MovieCard id={movie.id} image = {movie.poster_path} title={movie.title} genre={"Action.Movie"} rating={Math.floor(movie.vote_average)}/>
           </li>
          ))}
        </ul>
      )}
      </div>
    </main>

  </div>

)
}

export default App

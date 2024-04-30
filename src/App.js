import { useEffect, useState } from "react";
import StartRating from "./components/starRating/starRating";


// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];




const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);



function Logo() {
  return  <div className="logo">
  <span role="img"></span>
  <h1>Cinema City</h1>
</div>
}
function Search({query, setQuery}){
  return  <input
  className="search"
  type="text"
  placeholder="Search movies..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
}
function ResultsFound( movies) {
  return <p className="num-results">
  Found <strong>{movies.length}</strong> results
</p>
}
function Navigation({children}){
  return  <nav className="nav-bar">
  {children}
  
  
</nav>
}
function SummaryMoviesWatched({watched, avgImdbRating, avgUserRating, avgRuntime}) {
  return <div className="summary">
  <h2>Movies you watched</h2>
  <div>
    <p>
      <span>#️⃣</span>
      <span>{watched.length} movies</span>
    </p>
    <p>
      <span>⭐️</span>
      <span>{avgImdbRating.toFixed(2)}</span>
    </p>
    <p>
      <span>🌟</span>
      <span>{avgUserRating.toFixed(2)}</span>
    </p>
    <p>
      <span>⏳</span>
      <span>{avgRuntime} min</span>
    </p>
  </div>
</div>
}
function WatchedMovie({movie, onDeleteWatched}){
  return (
  <li>
    <img src={movie.poster} alt={`${movie.Title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button className="btn-delete" onClick={()=>onDeleteWatched(movie.imdbID)}>X</button>
    </div>
    

  </li>
  )
}
function ListOfMovies({ onDeleteWatched, watched, selectedId, setSelectedId }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} onDeleteWatched={onDeleteWatched}>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </WatchedMovie>
      ))}
    </ul>
  );
}

function MovieContainer({movieSingleObject, children, setSelectedId, selectedId}) {

  
  return  <li onClick={
  (selectedId===movieSingleObject.imdbID? 
  ()=>setSelectedId(null): 
  ()=>setSelectedId(movieSingleObject.imdbID))}
  key={movieSingleObject.imdbID}
  >
  <img src={movieSingleObject.Poster} alt={`${movieSingleObject.Title} poster`} />
  <h3>{movieSingleObject.Title}</h3>
  {children}

</li>
}

function Box({children}) {
  return <div className="box">
    {children}
    </div>
}
function WatchedBox({ onDeleteWatched, setSelectedId, watched, avgImdbRating, avgUserRating, avgRuntime }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </Button>

      {isOpen && (
        <>
          <SummaryMoviesWatched
            watched={watched}
            avgImdbRating={avgImdbRating}
            avgUserRating={avgUserRating}
            avgRuntime={avgRuntime}
          />
          <ListOfMovies
            onDeleteWatched={onDeleteWatched}
            setSelectedId={setSelectedId} 
            watched={watched}
            avgImdbRating={avgImdbRating}
            avgUserRating={avgUserRating}
            avgRuntime={avgRuntime}
          />
        </>
      )}
    </>
  );
}


function Button({children, onClick}){
  return <button className="btn-toggle" onClick={onClick}>
  {children}
  </button>
  
}
function ListBox({movies, setSelectedId, selectedId}){
  const [isOpen, setIsOpen] = useState(true);
  return  (
  <>
    <Button onClick={() => setIsOpen((open) => !open)}>
  
    {isOpen ? "–" : "+"} </Button>

    {isOpen && (
      
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <MovieContainer selectedId={selectedId} key ={movie.index} setSelectedId={setSelectedId} movieSingleObject = {movie}> 
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          
          </MovieContainer>
        
        ))}
      </ul>
    )}
  </>
  )
}
function Main({children}) {

  return <div className="main">
    {children}

  </div>
  
  
  
  
}


function Loader(){
  return <p className="loader">Loading</p>
}
const key = '81827da1';
function ErrorMessage({message}){
  return <p className="error">
    <span>{message}</span>

  </p>
}
function MovieDetails({watched, onAddWatched, selectedId, setSelectedId, setStarRating, starRating}){
  const [isloading, setIsLoading] = useState(false);
  const isWatched = watched.map(movie=>movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find((movie)=>movie.imdbID===selectedId)?.userRating 

 
  const [movie, setMovie] = useState({})

  const {
  Title: title, 
  Year: year, 
  Poster: poster,
  Runtime: runtime,
  imdbRating,
  Plot: plot,
  Released: released,
  Actors: actors,
  Director: director,
  Genre: genre
  } = movie;
  function handleAdd(){
    const newWatchedMovie = {
      userRating: starRating,
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0])
    }
    onAddWatched(newWatchedMovie)
    setSelectedId(null)
   
  }
  

  useEffect(function(){
    async function getMovieDetails(){
      setIsLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`)
      const data = await res.json();
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetails()
  },[selectedId])

  useEffect(function(){
    document.title = `Title | ${title}`
    return function()  {
       document.title = `Cinema City`
    }
  },[title])




  return <div className="details">
    {isloading? 
    <Loader/>: 
    <>
   
      <header>
      <button onClick={()=>setSelectedId(null)}className="btn-back">&larr;</button>
      <img src={poster} alt={`Poster of the ${movie}`}/>
      <div className="details-overview">
        <h2 className="title"></h2>
        <p> {released} &bull; {runtime} </p>
        <p>{genre}</p>
        <p>{imdbRating} imbd rating</p>
        <p>Directed by {director}</p>
      </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched?
          <>
            <StartRating  setStarRating={setStarRating} starRating={starRating} size={22} maxRating={10} />
            {starRating>0&&  <button className="btn-add" onClick={handleAdd}>+ add to list</button>}
          </>
      
          : <p>You rated this movie with {watchedUserRating}</p> }
        
        </div>
      
        <p> <em> {plot}</em></p>
        <p> Starring {actors}</p>


      </section>
    </>}
  </div>

}
export default  function App(){
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [starRating, setStarRating] = useState();
  console.log(starRating)



 function handleAddMovie(movie){
  setWatched((watched)=> [...watched, movie])
 }
  function handleDeleteWatched(id){
    setWatched(watched=>watched.filter((movie)=>movie.imdbID !==id))
  }
  useEffect(function(){
    async function fetchMovies() {
      try {
        setError('')
        setIsLoading(true)
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`)
  
        if(!res.ok) throw new Error("Something went wrong");
        
        const data = await res.json()
        if(data.response==='false') throw new Error("Movie not found")

        setMovies(data.Search);
        
      }
      catch (err) {
        console.error(err.message)
        setError(err.message)
      }
      finally {
        setIsLoading(false)
      }
   
    }
    fetchMovies()
     
    
  }, [query])
  




  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return  (
    <>
      <Navigation > 
       
        <Logo />
        <Search query={query} setQuery = {setQuery}/>
        <ResultsFound movies={movies}/>
        
      </Navigation>
      <Main>
        <Box>
          {isLoading&&<Loader/>}
          {!isLoading && !error && <ListBox selectedId={selectedId}setSelectedId = {setSelectedId}  movies={movies}/>}
          {error && <ErrorMessage message={error}/>}
        </Box>

        <Box >
          {selectedId? 
          <MovieDetails 
          watched={watched}
          starRating={starRating}
          setStarRating={setStarRating}
          onAddWatched={handleAddMovie} 
          setSelectedId = {setSelectedId}
          selectedId={selectedId}/> 
          :
          <WatchedBox 
          onDeleteWatched = {handleDeleteWatched}
          watched={watched} 
          avgImdbRating={avgImdbRating} 
          avgUserRating={avgUserRating} 
          avgRuntime={avgRuntime}/> 
          
          }
          
      
        </Box>
        

         
     
      </Main>
    </>
  )
  
}

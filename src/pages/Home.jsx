import { useEffect, useState } from 'react'
import Movie from '../components/Movie'

export default function Home(){
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const [shouldFetchMovies, setShouldFetchMovies] = useState(false)
    const [loading, setLoading] = useState(false)
    const [notFound, setNoFound] = useState(null)
    // 
    useEffect(()=>{
        if (shouldFetchMovies) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDE5MmMxNTk5ODRmYjRkZTBmMGIyMzEyN2Y0YzA4OCIsInN1YiI6IjY0NzNhZmM4YTE5OWE2MDEzMzI4OGZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tpyFB3SjmJ4ZyiV3dAiHlMyPcYb39Afm0__SqFguvEk'
                }
            }
              setLoading(true)
              fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options)
                .then(res => res.json())
                .then(data => {
                    setMovies(data.results)
                    if (data.results.length == 0) setNoFound(true)
                    else setNoFound (false)
                    setShouldFetchMovies(false)
                    setLoading(false)
                })
                .catch(() => {throw Error('Error fetching movies')});
        }
    }, [shouldFetchMovies])

    function handleChange(e){
        setSearch(e.target.value)
    }

    function fetchMovies(){
        setShouldFetchMovies(true)
    }

    const moviesToDisplay = movies.filter(movie => movie.overview.length > 0)

    const moviesEl = moviesToDisplay.map(movie => (<Movie key={movie.id} data={movie} />))

    if (loading || notFound) return (
        <div className='movies-section inline-flow'>
            <div className='search-container'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2ZM0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.29583 11.5892 8.49572 10.8907 9.47653L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L9.47653 10.8907C8.49572 11.5892 7.29583 12 6 12C2.68629 12 0 9.31371 0 6Z" fill="#9CA3AF"/>
                </svg>

                <input 
                    placeholder='Search for a movie'
                    name='search' 
                    onChange={handleChange} 
                    value={search} />
                <button className='search-button' onClick={fetchMovies}>Search</button>
            </div>
            
            {loading ? (<p className='loading'>Loading movies...</p>)
            : <p className='loading'>Unable to find what you are looking for.<span className='block'>Please try another search.</span>  </p>}
        </div>
    )

    return (
        <div className='movies-section inline-flow'>
            <div className='search-container'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2ZM0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.29583 11.5892 8.49572 10.8907 9.47653L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L9.47653 10.8907C8.49572 11.5892 7.29583 12 6 12C2.68629 12 0 9.31371 0 6Z" fill="#9CA3AF"/>
                </svg>

                <input 
                    placeholder='Search for a movie'
                    name='search' 
                    onChange={handleChange} 
                    value={search} />
                <button className='search-button' onClick={fetchMovies}>Search</button>
            </div>
            
            <div>
                {movies.length == 0 ? (
                    <div className='initial-state'>
                        <svg width="70" height="62" viewBox="0 0 70 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.75 0C3.91751 0 0 3.9175 0 8.75V52.5C0 57.3325 3.91751 61.25 8.75 61.25H61.25C66.0825 61.25 70 57.3325 70 52.5V8.75C70 3.9175 66.0825 0 61.25 0H8.75ZM21.875 8.75H48.125V26.25H21.875V8.75ZM56.875 43.75V52.5H61.25V43.75H56.875ZM48.125 35H21.875V52.5H48.125V35ZM56.875 35H61.25V26.25H56.875V35ZM61.25 17.5V8.75H56.875V17.5H61.25ZM13.125 8.75V17.5H8.75V8.75H13.125ZM13.125 26.25H8.75V35H13.125V26.25ZM8.75 43.75H13.125V52.5H8.75V43.75Z" fill="#DFDDDD"/>
                        </svg>
                        <h2>Start exploring</h2>
                    </div>
                    
                ) : (<div className='movies-container'> {moviesEl}</div>) }
                
            </div>
        </div>
    )
}

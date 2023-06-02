/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import { Link } from "react-router-dom"
import Movie from "../components/Movie"

export default function Watchlist(){
    const [watchlist, setWatchlist] = useState(()=>{
        return JSON.parse(localStorage.getItem('watchlist')) || []
    })
    
    if (watchlist.length == 0) return (
        <div className='movies-section inline-flow'>  
            <div className='initial-state'>                  
                <h2>Your watchlist is looking a little empty...</h2>
                <Link to='/' className="add-some-movies-links">Let's add some movies </Link>
            </div>
        </div>
    )

    function updateWatchlist(movieId){
        setWatchlist(prevWatchlist => {
            return prevWatchlist.filter(movie => movie.id !== movieId)
        })
    }

    const moviesEl = watchlist.map(movie => (<Movie key={movie.id} data={movie} updateWatchlist={updateWatchlist} />)
    )

    return (
        <div className='movies-section inline-flow'>
            
            <div style={{marginTop: '80px'}}>
                <div className='movies-container'> {moviesEl}</div>  
            </div>
        </div>
    )
}
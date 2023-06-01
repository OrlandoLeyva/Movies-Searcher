// import '/assets/images/image-not-found.png'

import { useState } from "react"

/* eslint-disable react/prop-types */
export default function Movie(props){
    const {data: movieData} = props
    const [isInWatchlist, setIsInWatchlist] = useState(()=>{
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
        return watchlist.some(movie => movie.id == movieData.id)
    })
    const posterUrl = `https://image.tmdb.org/t/p/w185${movieData.poster_path}`

    function handleImageError(e){
        e.target.src = '/assets/images/image-not-found.png'
    }

    function toggleWatchlist(){
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
        if (isInWatchlist) {
            const newWatchlist = watchlist.filter(movie => movie.id != movieData.id)
            localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
            setIsInWatchlist(false)
        } else {
            watchlist.push(movieData)
            localStorage.setItem('watchlist', JSON.stringify(watchlist))
            setIsInWatchlist(true)
        }
    }

    console.log(isInWatchlist)

    return (
        <div className="movie">
            <img 
                src={`${posterUrl}`} 
                alt={`${movieData.title} poster`} onError={handleImageError} 
                className="movie-poster" />
            <div className="movie-info">
                <div className="movie-info-top">
                    <p className="movie-title"> {`${movieData.title}`} </p>
                    <button 
                        onClick={toggleWatchlist}
                        className="watchlist-toggle-button"> 
                            {isInWatchlist ? <p><span className="added-indicator">-</span> <span>Remove</span></p>
                            :  <p><span className="added-indicator">+</span> <span>Watchlist</span></p>   
                        }
                    </button>
                </div>    
                <p className="movie-description">{movieData.overview}</p>
            </div>
        </div>
    )
}
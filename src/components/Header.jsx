// import React from 'react'
import {useLocation, Link} from 'react-router-dom'

export default function Header(){
    const location = useLocation()
    // console.log('header location', location)
    function isHome(){
        return location.pathname == '/'
    }
    const title = isHome() ? 'Find your film' : 'My Watchlist'
    const linkPath = isHome() ? 'watchlist' : '/'
    const linkContent = isHome() ? 'watchlist' : 'Search for movies'
    return (
        <header className='inline-flow'>
            <h1 className='title'>{title}</h1>
            <Link to={linkPath}>{linkContent}</Link>
        </header>
    )
}
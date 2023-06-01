// import React from 'react'
import {
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
// components
import Layout from './components/Layout'

// import './index.css

// '

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='watchlist' element={<Watchlist />} />
  </Route>
))

export default function app(){
  return <RouterProvider router={router} />
}



import React, { useState } from "react";
import { useEffect } from "react";

import "./App.css"
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg"

//1680f359
const API_URL = 'http://omdbapi.com?apikey=1680f359'


const App = () => {
    const [movies,setMovies]=useState([]);
    const [searchTerm,setSearchTerm]= useState('');
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data= await response.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies({searchTerm})
    },[])
    return (
        <div className="app">
            <h1>MovieMiner</h1>
            <div className="search">
                <input placeholder="Search For Movies" value={searchTerm} onChange={(e)=>{
                    setSearchTerm(e.target.value)
                }}/>
                <img src={SearchIcon} alt="search" onClick={()=>searchMovies(searchTerm)}/>
            </div>

            {
                movies.length>0?
                (
                    <div className="container">
                        {
                            movies.map((movie)=>(
                                <MovieCard movie={movie}/>
                            ))
                        }
                    </div>
                ) :
                (
                   <div className="empty" ><h2>No Movies</h2></div>     
                )
            }
            
        </div>
    );
}

export default App;

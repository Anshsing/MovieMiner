import React from "react";
const MovieCard = ({movie}) =>{
    return(
        <div className="movie">
                    <div>
                        <p>{movie.year}</p>
                    </div>
                    <div>
                        <img src={movie.Poster !== "N/A"?movie.Poster:'http://viaplaceholder.com/400'}></img>
                    </div>
                    <div>
                        <span>{movie.Type}</span>
                        <h3>{movie.Title}</h3>
                    </div>
                </div>
    )
}
export default MovieCard;
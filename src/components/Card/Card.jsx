import React from "react";
import {useEffect, useState} from "react";
import "./Card.css";
import {FavoriteIcon} from "../../components/FavoriteIcon/FavoriteIcon";

export const Card = ( {candidate} ) => {

  const [isFavorite, setFavoriteFunction] = useState(false);
  const [isHovered, setHoveredFunction] = useState(false);


  useEffect(() => {
    runOnReload()
  }, [])

  const runOnReload = () => {
    let favorites = window.localStorage.getItem('favorites');
    if (favorites) {
      // check if this candidate is in local storage
      const inStorage = JSON.parse(favorites).some(fav => fav.uuid === candidate.uuid)
      setFavoriteFunction(inStorage); 
      candidate.isFavorite = isFavorite;
    }
  }

  const handleFavoriteClick = (favorite) => {

    let favorites = window.localStorage.getItem('favorites');
    if (!isFavorite) {
      if (!favorites) {
        // add candidate to the empty local storage favorites
        window.localStorage.setItem('favorites', JSON.stringify([favorite]));
      }
      else {
        // add candidate to local storage favorites
        const newFavorites = [...JSON.parse(favorites), favorite] 
        window.localStorage.setItem('favorites', JSON.stringify(newFavorites));
      }
    } else {
      // remove candidate from local storage favorites
      const favoritesAsObjects = JSON.parse(favorites);
      const newFavorites = favoritesAsObjects.filter(fav => fav.uuid != candidate.uuid); 
      window.localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    setFavoriteFunction(!isFavorite)
    candidate.isFavorite = isFavorite
  };

  
  return (
    <div onMouseEnter={() => setHoveredFunction(true)} onMouseLeave={() => setHoveredFunction(false)} id="card">
      <img className="card-picture" src={candidate.picture}/> 
      <div>
        <div className="name-and-preferred">  
          <h1 className="card-name">{`${candidate.firstName} ${candidate.lastName}`}</h1><br/>
          {candidate.isPreferred? <p className="card-preferred">PREFERRED</p> : undefined}
        </div>
      <div className="description">
          <p>{candidate.email}</p>
          <p>{`${candidate.city}, ${candidate.country}`}</p>
        </div>
      </div>
      {(isFavorite || isHovered) && <button className="heart" onClick={() => handleFavoriteClick(candidate)}><FavoriteIcon/></button>} 
    </div>
  );
};

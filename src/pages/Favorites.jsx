import React, { useEffect, useState } from "react";
import "./page.css";
import { Card } from "../components/Card/Card";
import { getPersistentCandidatesData, setPersistentCandidatesData } from "../utils/helper.js";

export const Favorites = () => {
  const [favorites, setFavoritesFunction] = useState([]);
  const noFavoritesMessage = "You don't have any favorite candidates yet";

  useEffect(() => {
    updateFavoritesState();
  }, []);

  const updateFavoritesState = () => {
    const candidates = getPersistentCandidatesData();
    let favorites = Object.values(candidates).flat();
    favorites = favorites.filter(candidate => candidate.isFavorite === true);
    setFavoritesFunction(favorites);
  }

  // on heart click in card do:
  const updateFavorites = (candidate) => {
    const nameFirstLetter = (candidate.firstName).charAt(0);

    candidate.isFavorite = !candidate.isFavorite;
    const candidates = getPersistentCandidatesData();
    const firstLetterCandidates = candidates[nameFirstLetter];
    const newCandidatesArray = firstLetterCandidates.map(flCandidate => flCandidate.uuid == candidate.uuid ? candidate : flCandidate);
    candidates[nameFirstLetter] = newCandidatesArray;
    setPersistentCandidatesData(candidates);
    updateFavoritesState();
  }


  return (
    <div id="page">
      <div className="container"> 
        <div className="page-title">Favorite candidates</div>
        <div className="page-subtitle">Lital Feldman</div>
      </div>
      <div className="candidates-list">
        {
          favorites.length == 0 ? <div className="no-favorites">{noFavoritesMessage}</div> : 
          favorites.map(favorite => <div key={favorite.uuid}> <Card onCardClick={updateFavorites} candidate={favorite}/> </div>) 
        }
      </div>    
    </div>
  );
};

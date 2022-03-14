import React, {useEffect, useState} from "react";
import "../page.css";
import {Card} from "../../components/Card/Card";

export const Favorites = () => {

  const showFavorites = () => {
    let favorites = window.localStorage.getItem('favorites');
    if (favorites) { 
      const parsedFavorites = JSON.parse(favorites);
      if (parsedFavorites.length !== 0) {
        return parsedFavorites.map(favorite => <div key={favorite.uuid}> <Card candidate={favorite}/> </div>)
      }
      else {
        return <div className="no-favorites">You don't have any favorite candidates yet</div>
      }
    }
  }

  return (
    <div id="page">
      <div className="container"> 
        <div className="page-title">Favorite candidates</div>
        <div className="page-subtitle">Lital Feldman</div>
      </div>
      <div className="candidates-list">
        {
          showFavorites() 
        }
      </div>    
    </div>
  );
};

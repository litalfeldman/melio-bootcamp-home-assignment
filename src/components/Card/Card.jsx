import React from "react";
import { useState } from "react";
import "./Card.css";
import { FavoriteIcon } from "../../components/FavoriteIcon/FavoriteIcon";

export const Card = ({ candidate, onCardClick}) => {
  const [isHovered, setHoveredFunction] = useState(false);
  const { firstName, lastName, city, country, isFavorite, isPreferred, email, picture } = candidate; 
  const fullName = `${firstName} ${lastName}`;
  const location = `${city}, ${country}`;
  const preferred = 'PREFERRED';

  return (
    <div 
      onMouseEnter={() => setHoveredFunction(true)} 
      onMouseLeave={() => setHoveredFunction(false)} 
      id="card"
    >
      <img className="card-picture" src={picture}/> 
      <div>
        <div className="name-and-preferred">  
          <h1 className="card-name">{fullName}</h1><br/>
          {isPreferred? <p className="card-preferred">{preferred}</p> : undefined}
        </div>
      <div className="description">
          <p>{email}</p>
          <p>{location}</p>
        </div>
      </div>
      {(isFavorite || isHovered) && 
        <button className="heart" onClick={() => onCardClick(candidate)}>
          <FavoriteIcon/>
        </button>
      } 
    </div>
  );
};

import React, { useState } from "react";
import styles from "../styles/details.module.css";
import FavoritesList from "./FavoritesList";

const RecipeDetails = ({ recipe, onClose }) => {
  const {
    image,
    title,
    readyInMinutes,
    instructions,
    summary,
    extendedIngredients,
    id,
  } = recipe;

  const [isFavorited, setIsFavorited] = useState(false);
  const [message, setMessage] = useState("");

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        const response = await fetch(
          `http://localhost:5000/api/removefavorites/sharo/${id}`,
        );

        if (response.ok) {
          setIsFavorited(false);
          setMessage("This recipe has been removed from favorites");
        } else {
          console.error(
            "Failed to update favorite status:",
            response.statusText,
          );
        }
      } else {
        const response = await fetch(
          `http://localhost:5000/api/addfavorites/sharo/${id}`,
        );

        if (response.ok) {
          setIsFavorited(true);
          setMessage("This recipe is now a favorite");
        } else {
          console.error(
            "Failed to update favorite status:",
            response.statusText,
          );
        }
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className={styles.recipeDetails}>
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
      <button onClick={toggleFavorite} className={styles.favoriteButton}>
        {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <p>{message}</p>
      <h2 className={styles.recipeTitle}>{title}</h2>
      <img src={image} alt={title} className={styles.recipeImage} />
      <p>Ready in {readyInMinutes} minutes</p>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
      <h3>Ingredients</h3>
      <ul className={styles.ingredientsList}>
        {extendedIngredients.map((ingredient, index) => (
          <li key={index} className={styles.ingredientItem}>
            {ingredient.original}
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <div dangerouslySetInnerHTML={{ __html: instructions }} />
    </div>
  );
};

export default RecipeDetails;

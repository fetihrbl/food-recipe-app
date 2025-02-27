import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {
  const APP_ID = "Ride your API ID";
  const APP_KEY = "Ride your API Key";
  const USER_ID = "Ride your yuser ID";  

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect hook to trigger the getRecipes function when query changes
  useEffect(() => {
    getRecipes();
  }, [query]);

  // Function to fetch recipes based on the query
  const getRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`,
        {
          headers: {
            'Edamam-Account-User': USER_ID  // Kullanıcı ID'sini başlık olarak ekliyoruz
          }
        }
      );
      if (!response.ok) {
        throw new Error("There was a problem fetching the recipes.");
      }
      const data = await response.json();
      setRecipes(data.hits);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update the search term as the user types
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  // Submit the search form and update the query
  const getSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") return; // Prevent empty searches
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <h1>Food Recipe</h1>
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="Search something..."
        />
        <button className="search-button" type="submit">
          🔍 Search
        </button>
      </form>

      {/* Display loading status */}
      {loading && <p>⏳ Recipes are loading...</p>}

      {/* Display error message */}
      {error && <p className="error">⚠️ {error}</p>}

      {/* Display recipes or message if no recipes are found */}
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={Math.round(recipe.recipe.calories)}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        ) : (
          !loading && !error && <p>📌 No recipe found, try a different word.</p>
        )}
      </div>
    </div>
  );
}

export default App;

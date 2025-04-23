import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Recipes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/api/recipes");
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
      <ul className="space-y-4">
        {data.map((recipe) => (
          <li key={recipe._id} className="border p-4 rounded">
            <Link to={`/recipe/${recipe._id}`}>
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
              <p className="text-sm text-gray-600">{recipe.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;

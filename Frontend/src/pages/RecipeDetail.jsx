import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_DEV_URL
    : import.meta.env.VITE_API_PROD_URL;

const RecipeDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/api/recipes/${id}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading recipe: {error.message}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p className="mb-2">{data.description}</p>
      <h2 className="font-semibold mt-4">Ingredients:</h2>
      <ul className="list-disc ml-6">
        {data.ingredients.map((ing, idx) => (
          <li key={idx}>
            {ing.name} - {ing.quantity} {ing.unit}
          </li>
        ))}
      </ul>
      <h2 className="font-semibold mt-4">Instructions:</h2>
      <ol className="list-decimal ml-6">
        {data.instructions.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
};
export default RecipeDetail;

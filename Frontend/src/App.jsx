import "@radix-ui/themes/styles.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RecipeDetail from "./pages/RecipeDetail";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import NotFound from "./pages/NotFound";
import Recipes from "./pages/Recipes";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/recipe/create" element={<CreateRecipe />} />
          <Route path="/recipe/:id/edit" element={<EditRecipe />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

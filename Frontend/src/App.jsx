import "@radix-ui/themes/styles.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider, useIsFetching } from "@tanstack/react-query";
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
import Loader from "../components/Loader";

const queryClient = new QueryClient();

function AppRoutes() {

  const isFetching = useIsFetching();
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timeout = setTimeout(() => setRouteLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {(isFetching > 0 || routeLoading) && <Loader />}
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
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}

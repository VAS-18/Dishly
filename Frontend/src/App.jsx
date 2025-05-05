import "@radix-ui/themes/styles.css";
import React, { Suspense, useEffect, useState, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider, useIsFetching } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { Theme } from "@radix-ui/themes";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const RecipeDetail = lazy(() => import("./pages/RecipeDetail"));
const CreateRecipe = lazy(() => import("./pages/CreateRecipe"));
const EditRecipe = lazy(() => import("./pages/EditRecipe"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Recipes = lazy(() => import("./pages/Recipes"));
const Feed = lazy(() => import("./pages/Feed"));
const Profile = lazy(() => import("./pages/Profile"));

const queryClient = new QueryClient();

function AppRoutes() {
  
  const isFetching = useIsFetching();

  return (
    <>
      {(isFetching > 0) && <Loader />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/recipe/create" element={<CreateRecipe />} />
          <Route path="/recipe/:id/edit" element={<EditRecipe />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <Theme theme="dark" disableSystemColorMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppRoutes />
        </Router>
      </QueryClientProvider>
    </Theme>
  );
}

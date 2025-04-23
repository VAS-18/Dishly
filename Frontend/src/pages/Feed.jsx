import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FeedMain from "../../components/FeedMain";
import FeedSidebarLeft from "../../components/FeedSidebarLeft";
import FeedSidebarRight from "../../components/FeedSidebarRight";
import PostBox from "../../components/PostBox";
const getToken = () => localStorage.getItem("accessToken");

const Feed = () => {
  const [activeTab, setActiveTab] = useState("Friends");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/api/posts");
      return data;
    },
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return data;
    },
    enabled: !!getToken(),
  });

  const stories = [
    { name: "Chef Mario", img: "https://source.unsplash.com/100x100/?food,1" },
    {
      name: "Bella's Kitchen",
      img: "https://source.unsplash.com/100x100/?food,2",
    },
    {
      name: "Food Traveler",
      img: "https://source.unsplash.com/100x100/?food,3",
    },
  ];
  const suggested = [
    { name: "Pasta Queen", username: "@pasta_lover" },
    { name: "Baking Pro", username: "@baker_101" },
    { name: "Vegan Chef", username: "@plant_powered" },
  ];
  const categories = [
    { name: "Recipes", color: "bg-yellow-100" },
    { name: "Restaurants", color: "bg-pink-100" },
    { name: "Desserts", color: "bg-orange-100" },
    { name: "Healthy", color: "bg-green-100" },
  ];

  return (
    <div className="min-h-screen flex justify-between p-10">
      {/* Left Sidebar */}
      <div>
      <FeedSidebarLeft user={user} userLoading={userLoading} />
      </div>

      {/* Main Feed */}
      <div className=" flex flex-col h-screen w-1/2">
        <FeedMain
          posts={posts}
          isLoading={isLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          userLoading={userLoading}
        />
      </div>

      {/* Right Sidebar */}
      <FeedSidebarRight
        stories={stories}
        suggested={suggested}
        categories={categories}
      />
      <PostBox user={user} />
    </div>
  );
};

export default Feed;

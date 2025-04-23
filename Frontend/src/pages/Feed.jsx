import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const getToken = () => localStorage.getItem("accessToken");

export default function StyledFeed() {
  const [activeTab, setActiveTab] = useState("Friends");
  const navigate = useNavigate();

  // Fetch posts
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
    { name: "Bella's Kitchen", img: "https://source.unsplash.com/100x100/?food,2" },
    { name: "Food Traveler", img: "https://source.unsplash.com/100x100/?food,3" },
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
    <div className="min-h-screen flex">
      <div className="flex-1 max-w-7xl mx-auto flex h-full gap-8 p-8">
        {/* Left Sidebar */}
        <aside className="w-64 p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-8 h-full">
          <div className="flex flex-col items-center">
            {userLoading ? (
              <div>Loading...</div>
            ) : user ? (
              <>
                <button onClick={()=> navigate("/profile")}>
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="w-20 h-20 rounded-full mb-2 border-4 border-indigo-200"
                />
                </button>
                <div className="font-bold text-lg">{user.username}</div>
                <div className="text-gray-500 text-sm">{user.email}</div>
              </>
            ) : (
              <div className="text-gray-400">Please log in</div>
            )}
          </div>
          <nav className="flex flex-col gap-3">
            <Link
              className="px-4 py-2 bg-orange-100 rounded-lg font-semibold hover:bg-orange-200 transition"
              to="#"
            >
              Food Feed
            </Link>
            <Link className="px-4 py-2 rounded-lg hover:bg-gray-100 transition" to="#">
              Messages
            </Link>
            <Link className="px-4 py-2 rounded-lg hover:bg-gray-100 transition" to="#">
              Foodies
            </Link>
          </nav>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex-1 flex flex-col">
            <h1 className="text-3xl font-bold mb-4">Feed</h1>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              {["Recents", "Friends", "Popular"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition 
                    ${activeTab === tab ? "bg-indigo-500 text-white shadow-lg" : "bg-transparent text-gray-700 hover:bg-gray-100"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Post Input */}
            <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                {userLoading ? (
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                ) : user ? (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                )}
                <input
                  className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 focus:outline-none"
                  placeholder="Share your food adventure..."
                  disabled
                />
              </div>
              <div className="flex justify-end">
                <button className="text-indigo-500 font-semibold mr-4" disabled>
                  Add Photo
                </button>
                <button
                  className="bg-orange-400 text-white px-6 py-2 rounded-full font-semibold shadow disabled:opacity-50"
                  disabled
                >
                  Post
                </button>
              </div>
            </div>

            {/* Posts List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                posts?.map((post, idx) => (
                  <div
                    key={post._id}
                    className={`p-6 rounded-2xl mb-6 shadow-lg transition hover:shadow-2xl 
                      ${idx % 2 === 0 ? "bg-blue-50" : "bg-yellow-50"}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={post.user?.profileImage}
                        alt="profile"
                        className="w-8 h-8 rounded-full border-2 border-white shadow"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">
                          {post.user?.username}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 text-gray-700">{post.caption}</div>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="food"
                        className="w-full rounded-2xl mb-4 object-cover"
                      />
                    )}
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>❤️ {post.likes?.length || 0}</span>
                      <span>💬 {post.comments?.length || 0}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-8 h-full">
          {/* Stories */}
          <div>
            <h2 className="font-bold text-lg mb-4">Food Stories</h2>
            <div className="flex space-x-4">
              {stories.map((story, i) => (
                <div key={i} className="flex flex-col items-center">
                  <img
                    src={story.img}
                    alt={story.name}
                    className="w-16 h-16 rounded-full border-4 border-orange-300 shadow"
                  />
                  <span className="text-xs mt-2 text-gray-700">{story.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <h2 className="font-bold text-lg mb-4">Foodies to Follow</h2>
            <ul className="space-y-3 overflow-y-auto max-h-48">
              {suggested.map((f, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800">{f.name}</div>
                    <div className="text-xs text-gray-500">{f.username}</div>
                  </div>
                  <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium hover:bg-indigo-200">
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="font-bold text-lg mb-4">Food Categories</h2>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 text-center font-semibold text-gray-800 shadow ${cat.color}`}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

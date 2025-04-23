import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }
  return token;
};
const Profile = () => {
  const {
    data: user,
    isLoading: userLoading,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      console.log(data);
      return data;
    },
    enabled: !!getToken(),
  });

  //get user posts

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      console.log(data);
      return data;
    },
    enabled: !!user,
  });

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* Profile Header */}
      <div className="flex items-center gap-8 mb-10">
        {userLoading ? (
          <div className="w-24 h-24 rounded-full bg-gray-200" />
        ) : (
          <img
            src={user?.profileImage}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-200 object-cover"
          />
        )}
        <div>
          <div className="text-2xl font-bold">{user?.username}</div>
          <div className="text-gray-500 mb-2">{user?.email}</div>
          <div className="mb-2">{user?.bio}</div>
          <div className="flex gap-6 text-sm text-gray-700">
            <span>
              <b>{user?.followers?.length || 0}</b> followers
            </span>
            <span>
              <b>{user?.following?.length || 0}</b> following
            </span>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        {postsLoading ? (
          <div>Loading posts...</div>
        ) : posts?.length ? (
          <div className="grid grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">No posts yet.</div>
        )}
      </div>
    </div>
  );
};

export default Profile;

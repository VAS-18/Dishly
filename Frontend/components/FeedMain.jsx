import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Heart } from "lucide-react";

export default function FeedMain({
  posts,
  isLoading,
  activeTab,
  setActiveTab,
  user,
  userLoading,
}) {
  const scrollRef = React.useRef(null);
  return (
    <main className="flex-1 flex flex-col h-screen overflow-y-auto">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-4">Feed</h1>
        <div className="flex space-x-4 mb-6">
          {["Recents", "Friends", "Popular"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition 
                ${
                  activeTab === tab
                    ? "bg-indigo-500 text-white shadow-lg"
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <motion.div
          ref={scrollRef}
          className="flex-1 overflow-y-auto hide-scrollbar scrollbar-none"
          layoutScroll
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            posts?.map((post, idx) => (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
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
                  <div className="flex items-center gap-2 w-8">
                  <Heart/>
                  <span>{post.likes?.length || 0}</span>
                  </div>
                  <span>💬 {post.comments?.length || 0}</span>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </main>
  );
}

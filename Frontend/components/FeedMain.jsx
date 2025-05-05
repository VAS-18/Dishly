import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Heart, MessageCircle, Clock, Loader } from "lucide-react";

export default function FeedMain({
  posts,
  isLoading,
  activeTab,
  setActiveTab,
  user,
  userLoading,
}) {
  
  const getDifficultyStyle = (difficulty) => {
    switch(difficulty) {
      case "Easy":
        return "bg-[#DCFFB7] text-green-800";
      case "Medium":
        return "bg-[#FFBB64] text-orange-800";
      case "Hard":
        return "bg-[#FF6868] text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeStyle = (time) => {
    switch (time) {
      case "> 15 min":
        return "bg-red opacity-75";
      case "> 30 min":
        return "bg-[#FFBB64] opacity-75";
      case " < 1 hr":
        return "bg-[#FF6868] opacity-75";
      default:
        return "bg-gray-100";
    }
  };


  

  const getTime = (time) => {
    switch (time) {
      case "> 15 min":
        return "bg-green text-green"
    }
  }

  console.log("All difficulties:", posts?.map(post => post.difficulty));
  


  
  return (
    <main className="flex-1 flex flex-col h-screen overflow-y-scroll scrollbar-hidden">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-4">Feed</h1>
        <motion.div
          className="flex-1 overflow-y-auto scrollbar-hidden"
          layoutScroll
        >
          {isLoading ? (
            <div><Loader/></div>
          ) : (
            posts?.map((post, idx) => (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 2, delay: idx * 0.1 }}
                className="bg-white rounded-2xl mb-6 border border-gray-200 overflow-hidden scrollbar-none"
              >
            
                <div className="relative">
                  {post.image && post.image.length > 0 && (
                    <img
                      src={post.image[0]} 
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <img
                      src={post.user?.profileImage}
                      alt="profile"
                      className="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover"
                    />
                    <span className="font-semibold text-white drop-shadow-lg">
                      {post.user?.username}
                    </span>
                  </div>
                </div>

                {/* Content section */}
                <div className="p-6">
                  {/* Metadata row */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-20 h-8 rounded-3xl border border-gray-200 opacity-75 text-sm font-semibold text-black shadow-sm flex items-center justify-center ${getDifficultyStyle(post.difficulty)}`}>
                      {post.difficulty || "Easy"}
                    </span>
                    
                    <div className={`w-24 h-8 rounded-3xl border border-gray-200 text-sm font-semibold text-black shadow-sm flex items-center justify-center ${getTimeStyle(post.time)}`}>
                      <span className="flex justify-center text-sm">
    
                        {post.time} ⏰
                      </span>
                    </div>
                    
                    <span className="w-36 h-8 rounded-3xl border border-gray-200 opacity-75 text-sm font-semibold text-black shadow-sm bg-gray-100 flex items-center justify-center">
                      {post.cuisine || "🌎 Fusion"}
                    </span>
                  </div>

                  {/* Title and Caption */}
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.caption}</p>

                  {/* Multiple Images Preview */}
                  {post.image && post.image.length > 1 && (
                    <div className="flex gap-2 mb-4">
                      {post.image.slice(1).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Additional ${index + 1}`}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}

                  {/* Interactions */}
                  <div className="flex items-center gap-4 mt-4 pt-4 ">
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5" />
                      <span>{post.likes?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </main>
  );
}

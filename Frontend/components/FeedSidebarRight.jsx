import React from "react";
import storiesData from "../utils/stories.js";


export default function FeedSidebarRight({ stories, suggested, categories }) {
  return (
    <aside className="p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-8 h-full">
      {/* Stories */}
      <div>
        <h2 className="font-bold text-lg mb-4">Food Stories</h2>
        <div className="flex space-x-4">
          {storiesData.map((story, i) => (
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
  );
}
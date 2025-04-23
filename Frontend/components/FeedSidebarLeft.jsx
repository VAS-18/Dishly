import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FeedSidebarLeft({ user, userLoading }) {
  const navigate = useNavigate();
  return (
    <aside className="w-64 p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-8 h-auto">
      <div className="flex flex-col items-center">
        {userLoading ? (
          <div>Loading...</div>
        ) : user ? (
          <>
            <button onClick={() => navigate("/profile")}>
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
          Home
        </Link>
        <Link className="px-4 py-2 rounded-lg hover:bg-gray-100 transition" to="#">
          Messages
        </Link>
        <Link className="px-4 py-2 rounded-lg hover:bg-gray-100 transition" to="#">
          Foodies
        </Link>
      </nav>
    </aside>
  );
}
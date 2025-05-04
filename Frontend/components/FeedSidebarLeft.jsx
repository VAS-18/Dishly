import React from "react";
import { useNavigate } from "react-router-dom";

export default function FeedSidebarLeft({
  user,
  userLoading,
  setShowFoodies,
  activeTab,
  setActiveTab,
}) {
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      onClick: () => {
        setShowFoodies(false);
        setActiveTab("Home");
      },
      tab: "Home",
    },
    {
      label: "Messages",
      onClick: () => setActiveTab("Messages"),
      tab: "Messages",
    },
    {
      label: "Foodies",
      onClick: () => {
        setShowFoodies(true);
        setActiveTab("Foodies");
      },
      tab: "Foodies",
    },
  ];

  return (
    <aside className="w-64 p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-8">
      <div className="flex flex-col items-center">
        {userLoading ? (
          <div>Loading...</div>
        ) : user ? (
          <>
            <button onClick={() => navigate(`/${user._id}/profile`)}>
              <img
                src={user.profileImage}
                alt="profile"
                className="w-20 h-20 rounded-full mb-2 border-4 border-indigo-200 object-cover"
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
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`px-4 py-2 rounded-lg font-semibold transition text-left ${
              activeTab === item.tab
                ? "bg-sunset text-white shadow"
                : "bg-orange-100 text-gray-800 hover:bg-orange-200"
            }`}
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

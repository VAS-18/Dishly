import React from "react";

export default function Foodies({ user }) {
  if (!user) {
    return <div className="p-8 text-gray-500">Please log in to see your foodies.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <span className="text-3xl font-semibold">Your Foodies</span>
      <div className="flex justify-between gap-x-20 mt-4">
        {/* Followers */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Followers</h3>
          {user.followers && user.followers.length > 0 ? (
            <ul className="space-y-4">
              {user.followers.map((follower) => (
                <li key={follower._id} className="flex items-center gap-3">
                  <img
                    src={follower.profileImage}
                    alt={follower.username}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="font-medium">{follower.username}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400">No followers yet.</div>
          )}
        </div>
        {/* Following */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Following</h3>
          {user.following && user.following.length > 0 ? (
            <ul className="space-y-4">
              {user.following.map((followed) => (
                <li key={followed._id} className="flex items-center gap-3">
                  <img
                    src={followed.profileImage}
                    alt={followed.username}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="font-medium">{followed.username}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400">Not following anyone yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
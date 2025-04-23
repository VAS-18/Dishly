import React from "react";
import { Paperclip, Image, MapPin, Globe, Smile } from "lucide-react";

export default function PostBox({ user }) {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 bg-transparent">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-4 mb-4 flex flex-col gap-2 border">
        <div className="flex items-center gap-3">
          <img
            src={user?.profileImage}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none"
            placeholder="Share something"
            disabled
          />
          <Smile className="text-gray-400 w-6 h-6" />
        </div>
        <div className="flex items-center justify-between mt-2 px-2">
          <div className="flex gap-4 text-gray-500">
            <button><Paperclip className="w-5 h-5" /></button>
            <button><Image className="w-5 h-5" /></button>
            <button><MapPin className="w-5 h-5" /></button>
            <button><Globe className="w-5 h-5" /></button>
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-full font-semibold shadow disabled:opacity-50" disabled>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
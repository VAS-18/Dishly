import React, { useState } from "react";
import { Paperclip, Image, MapPin, Globe, Smile, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostBox({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sticky PostBox */}
      {!open && (
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-10 bg-transparent opacity-50 hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-4 mb-4 flex flex-col gap-2 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="flex items-center gap-3">
              <img
                src={user?.profileImage}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-full bg-gray-200 rounded-xl p-2">
                <span className="inline opacity-45">
                  Share What You Made Today
                </span>
              </div>
              <Smile className="text-gray-400 w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mt-2 px-2">
              <div className="flex gap-4 text-gray-500">
                <button>
                  <Image className="w-5 h-5" />
                </button>
              </div>
              <button
                className="bg-black text-white px-6 py-2 rounded-full font-semibold shadow disabled:opacity-50"
                disabled
              >
                Send
              </button>
            </div>
          </button>
        </div>
      )}

      {/*FRAMERRRRRRRRRRRRRR MODAL*/}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative"
              initial={{ scale: 0.8, opacity: 0, y: 80 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 80 }}
              transition={{ type: "keyframes", stiffness: 300, damping: 30 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                onClick={() => setOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={user?.profileImage}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="font-semibold">{user?.username}</div>
              </div>
              <form className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-300">Title</span>
                  <input
                    type="text"
                    className="w-full bg-gray-100 rounded-xl p-3 outline-none"
                    placeholder="Whats Your Dish called?"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-3">Difficulty</span>
                  <input 
                    type="text"
                    className="w-full bg-gray-100 rounded-xl p-3 outline-none"
                    />
                </div>
                <textarea
                  className="w-full bg-gray-100 rounded-xl p-3 outline-none resize-none"
                  rows={4}
                  placeholder="What's on your mind?"
                />
                <input
                  type="text"
                  className="w-full bg-gray-100 rounded-xl p-3 outline-none"
                  placeholder="Add a location (optional)"
                />
                <div className="flex gap-4 text-gray-500">
                  <button type="button">
                    <Image className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-full font-semibold shadow mt-2"
                >
                  Post
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

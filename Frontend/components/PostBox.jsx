import React, { useEffect, useRef, useState } from "react";
import { Image, Smile, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostBox({ user }) {
  const [open, setOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [time, setTime] = useState("> 15 min");
  const [cuisine, setCuisine] = useState("Italian");

  const [showDifficultyPicker, setShowDifficultyPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showCuisinePicker, setShowCuisinePicker] = useState(false);

  const difficulties = ["Easy", "Medium", "Hard"];
  const Time = ["> 15 min", "> 30 min", " < 1 hr"];
  const cuisines = [
    { name: "Italian", country: "🇮🇹" },
    { name: "Japanese", country: "🇯🇵" },
    { name: "Mexican", country: "🇲🇽" },
    { name: "Chinese", country: "🇨🇳" },
    { name: "Indian", country: "🇮🇳" },
    { name: "French", country: "🇫🇷" },
    { name: "American", country: "🇺🇸" },
    { name: "Greek", country: "🇬🇷" },
    { name: "Spanish", country: "🇪🇸" },
    { name: "Thai", country: "🇹🇭" },
    { name: "Fusion", country: "🌎" },
    { name: "Middle Eastern", country: "🌶️" },
    { name: "Mediterranean", country: "🌊" },
  ];

  const handleDifficulties = (diff) => {
    if (diff === "Easy") {
      return "bg-[#DCFFB7]";
    } else if (diff == "Medium") {
      return "bg-[#FFBB64]";
    } else {
      return "bg-[#FF6868]";
    }
  };

  const handleDifficultyHover = (diff) => {
    if (diff === "Easy") {
      return "bg-[#E3FBC8]";
    } else if (diff === "Medium") {
      return "bg-[#FFD08A]";
    } else {
      return "bg-[#FFA1A1]";
    }
  };

  const handleTime = (t) => {
    if (t === "> 15 min") {
      return "bg-[#DCFFB7]";
    } else if (t === "> 30 min") {
      return "bg-[#FFBB64]";
    } else {
      return "bg-[#FF6868]";
    }
  };

  const handleTimeHover = (t) => {
    if (t === "> 15 min") {
      return "bg-[#E3FBC8]";
    } else if (t === "> 30 min") {
      return "bg-[#FFD08A]";
    } else {
      return "bg-[#FFA1A1]";
    }
  };

  const difficultyPickerRef = useRef(null);
  const timePickerRef = useRef(null);
  const cuisinePickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showDifficultyPicker &&
        difficultyPickerRef.current &&
        !difficultyPickerRef.current.contains(event.target)
      ) {
        setShowDifficultyPicker(false);
      }
      if (
        showTimePicker &&
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target)
      ) {
        setShowTimePicker(false);
      }
      if (
        showCuisinePicker &&
        cuisinePickerRef.current &&
        !cuisinePickerRef.current.contains(event.target)
      ) {
        setShowCuisinePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDifficultyPicker, showTimePicker, showCuisinePicker]);

  return (
    <>
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

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 relative"
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
                  <span className="font-medium text-gray-300">Title:</span>
                  <input
                    type="text"
                    className="w-full h-10 bg-gray-100 rounded-3xl p-3 outline-none"
                    placeholder="Whats Your Dish called?"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-300">
                      Difficulty:
                    </span>
                    <button
                      type="button"
                      className={`${handleDifficulties(
                        difficulty
                      )} w-20 h-8 rounded-3xl border border-gray-200 opacity-75 text-sm font-semibold text-black shadow-sm`}
                      onClick={() => setShowDifficultyPicker((p) => !p)}
                    >
                      {difficulty}
                    </button>
                    <AnimatePresence>
                      {showDifficultyPicker && (
                        <motion.div
                          ref={difficultyPickerRef}
                          initial={{ opacity: 0, y: -10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute mt-26 p-2 rounded-xl shadow-2xl z-50 text-black bg-white"
                        >
                          {difficulties.map((idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setDifficulty(idx);
                                setShowDifficultyPicker(false);
                              }}
                              className={`p-1 mx-2 w-20 rounded-full text-sm ${handleDifficulties(
                                idx
                              )} hover:${handleDifficultyHover(
                                idx
                              )} opacity-75`}
                            >
                              {idx}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-300">Time:</span>
                    <button
                      type="button"
                      className={`${handleTime(
                        time
                      )} w-24 h-8 rounded-3xl border border-gray-200 opacity-75 text-sm font-semibold text-black shadow-sm`}
                      onClick={() => setShowTimePicker((p) => !p)}
                    >
                      <span className="flex justify-center text-sm">
                        {time} ⏰
                      </span>
                    </button>
                    <AnimatePresence>
                      {showTimePicker && (
                        <motion.div
                          ref={timePickerRef}
                          initial={{ opacity: 0, y: -10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute mt-26 p-2 rounded-xl shadow-2xl z-50 text-black bg-white"
                        >
                          {Time.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => {
                                setTime(t);
                                setShowTimePicker(false);
                              }}
                              className={`p-1 mx-2 w-20 rounded-full text-sm ${handleTime(
                                t
                              )} hover:${handleTimeHover(t)} opacity-75`}
                            >
                              {t}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-300">Cuisine:</span>
                    <button
                      type="button"
                      className="w-36 h-8 rounded-3xl border border-gray-200 opacity-75 text-sm font-semibold text-black shadow-sm bg-gray-100"
                      onClick={() => setShowCuisinePicker((p) => !p)}
                    >
                      {cuisine}
                    </button>
                    <AnimatePresence>
                      {showCuisinePicker && (
                        <motion.div
                          ref={cuisinePickerRef}
                          initial={{ opacity: 0, y: -10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute mt-26 p-2 rounded-xl shadow-2xl z-50 text-black bg-white"
                        >
                          {cuisines.map((c) => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => {
                                setCuisine(`${c.country} ${c.name}`);
                                setShowCuisinePicker(false);
                              }}
                              className="p-1 mx-2 w-28 rounded-full text-sm bg-gray-100 hover:bg-gray-200 opacity-75"
                            >
                              {c.country} {c.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-3">
                  <button type="button">
                    <Image className="w-10 h-10" />
                  </button>
                </div>
                <textarea
                  className="w-full bg-gray-100 rounded-3xl p-3"
                  rows={2}
                  placeholder="Something about the dish..."
                />
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

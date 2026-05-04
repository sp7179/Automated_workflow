"use client";

import { motion } from "framer-motion";
import { Play, RotateCcw, Save } from "lucide-react";

export default function Navbar({ onExport, onReset, onRun }) {
  return (
    <motion.div
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-[70px] w-full flex items-center justify-between px-6 
                 bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#020617]
                 border-b border-gray-800 shadow-xl backdrop-blur-md"
    >
      {/* 🔹 LEFT: BRAND */}
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          className="w-10 h-10 rounded-xl 
                     bg-gradient-to-tr from-indigo-500 to-purple-600
                     flex items-center justify-center shadow-lg"
        >
          <span className="font-bold text-white text-sm">HR</span>
        </motion.div>

        <div className="flex flex-col leading-tight">
          <span className="text-white font-semibold text-lg tracking-wide">
            Workflow Designer
          </span>
          <span className="text-gray-400 text-[10px]">
            Visual Process Builder
          </span>
        </div>
      </div>

      {/* 🔹 RIGHT: ACTIONS */}
      <div className="flex items-center gap-3">

        {/* ▶ RUN */}
        <ActionButton
          label="Run"
          icon={<Play size={16} />}
          color="from-green-500 to-emerald-600"
          onClick={onRun}
        />

        {/* 💾 EXPORT */}
        <ActionButton
          label="Export"
          icon={<Save size={16} />}
          color="from-blue-500 to-indigo-600"
          onClick={onExport}
        />

        {/* 🔄 RESET */}
        <ActionButton
          label="Reset"
          icon={<RotateCcw size={16} />}
          color="from-red-500 to-rose-600"
          onClick={onReset}
        />

      </div>
    </motion.div>
  );
}

/* 🔥 REUSABLE BUTTON (CLEAN + ANIMATED) */
function ActionButton({ label, icon, color, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl
        bg-gradient-to-r ${color}
        text-white text-sm font-medium
        shadow-lg hover:shadow-xl
        transition-all duration-300
      `}
    >
      {icon}
      {label}
    </motion.button>
  );
}
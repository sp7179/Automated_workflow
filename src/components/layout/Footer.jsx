"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[40px] bg-[#020617] border-t border-gray-800 text-gray-400 text-xs flex items-center justify-between px-4"
    >
      <span>© 2026 HR Workflow Designer</span>
      <span>Built with React + Tailwind + React Flow</span>
    </motion.div>
  );
}
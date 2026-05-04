"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X } from "lucide-react";
import { useState } from "react";

export default function JsonPreviewModal({ data, onClose }) {
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(data, null, 2);

  // 📋 COPY FUNCTION
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* MODAL */}
        <motion.div
          initial={{ scale: 0.85, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-[700px] max-h-[85vh] bg-gradient-to-br from-[#020617] to-[#0f172a] 
                     border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
            <h2 className="text-white text-lg font-semibold tracking-wide">
              Workflow JSON Preview
            </h2>

            <div className="flex items-center gap-2">
              {/* COPY BUTTON */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 
                           text-white text-xs px-3 py-1.5 rounded-lg"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </motion.button>

              {/* CLOSE */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={onClose}
                className="text-gray-400 hover:text-red-400"
              >
                <X size={18} />
              </motion.button>
            </div>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-auto p-4">
            <pre className="text-xs leading-relaxed text-green-400 whitespace-pre-wrap font-mono">
              {jsonString}
            </pre>
          </div>

          {/* FOOTER */}
          <div className="px-5 py-2 border-t border-gray-800 text-[10px] text-gray-500">
            Generated from current workflow state
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
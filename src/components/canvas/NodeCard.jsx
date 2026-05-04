"use client";

import { motion } from "framer-motion";
import { Handle, Position } from "reactflow";
import {
  PlayCircle,
  FileText,
  CheckCircle,
  Cpu,
  Flag,
} from "lucide-react";

// 🎯 ICON MAP
const ICONS = {
  start: PlayCircle,
  task: FileText,
  approval: CheckCircle,
  automation: Cpu,
  end: Flag,
};

export default function NodeCard({ data, selected }) {
  const Icon = ICONS[data.nodeType] || FileText;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.2 }}

      className={`
        relative px-3 py-2 rounded-xl min-w-[150px]
        border text-white backdrop-blur-md

        ${selected 
          ? "border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.8)]"
          : "border-gray-700"}

        ${data.error 
          ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
          : ""}

        bg-gradient-to-br from-[#1e293b] to-[#020617]
        shadow-lg transition-all duration-300
      `}
    >
      {/* 🔗 INPUT HANDLE */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-indigo-500"
      />

      {/* 🎨 CONTENT */}
      <div className="flex items-center gap-2">

        {/* ICON */}
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <Icon size={16} className="text-indigo-400" />
        </div>

        {/* TEXT */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {data.label}
          </span>
          <span className="text-[10px] text-gray-400 uppercase">
            {data.nodeType}
          </span>
        </div>
      </div>

      {/* 🔥 ACTIVE GLOW RING */}
      {selected && (
        <motion.div
          layoutId="glow"
          className="absolute inset-0 rounded-xl border border-indigo-400 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* 🔗 OUTPUT HANDLE */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-indigo-500"
      />
    </motion.div>
  );
}
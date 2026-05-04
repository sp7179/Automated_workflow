"use client";

import { motion } from "framer-motion";
import {
  PlayCircle,
  FileText,
  CheckCircle,
  Cpu,
  Flag,
} from "lucide-react";

// 🎯 NODE DEFINITIONS (CORE)
const NODE_TYPES = [
  {
    type: "start",
    label: "Start",
    icon: PlayCircle,
    color: "from-green-400 to-emerald-600",
  },
  {
    type: "task",
    label: "Task",
    icon: FileText,
    color: "from-blue-400 to-indigo-600",
  },
  {
    type: "approval",
    label: "Approval",
    icon: CheckCircle,
    color: "from-yellow-400 to-orange-500",
  },
  {
    type: "automation",
    label: "Automation",
    icon: Cpu,
    color: "from-purple-400 to-pink-600",
  },
  {
    type: "end",
    label: "End",
    icon: Flag,
    color: "from-red-400 to-rose-600",
  },
];

export default function Sidebar() {
  // 🎯 DRAG START (IMPORTANT FOR CANVAS)
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-[240px] h-full bg-[#0f172a] text-white flex flex-col border-r border-gray-800 shadow-xl">

      {/* HEADER */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold tracking-wide">
          Workflow Nodes
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Drag & drop to canvas
        </p>
      </div>

      {/* NODE LIST */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">

        {NODE_TYPES.map((node, index) => {
          const Icon = node.icon;

          return (
            <motion.div
              key={node.type}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}

              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}

              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: -5,
              }}
              whileTap={{ scale: 0.95 }}

              className={`cursor-grab active:cursor-grabbing 
                bg-gradient-to-r ${node.color} 
                rounded-xl p-3 shadow-lg 
                flex items-center gap-3
                transition-all duration-300`}
            >
              {/* ICON */}
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                <Icon size={18} />
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-sm font-semibold">
                  {node.label}
                </h3>
                <p className="text-xs text-white/70">
                  {node.type} node
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER INFO */}
      <div className="p-3 border-t border-gray-800 text-xs text-gray-400">
        Drag nodes to build workflow
      </div>
    </div>
  );
}
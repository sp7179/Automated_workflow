"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, AlertTriangle, CheckCircle } from "lucide-react";

export default function SimulationPanel({ nodes, edges }) {
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(null);

  // 🎯 VALIDATION
  const validateWorkflow = () => {
    if (!nodes.length) return "No nodes present";

    const startNode = nodes.find((n) => n.data.nodeType === "start");
    if (!startNode) return "Start node missing";

    if (edges.length === 0) return "No connections found";

    return null;
  };

  // 🎯 SIMULATION ENGINE
  const runSimulation = async () => {
    setError(null);

    const validationError = validateWorkflow();
    if (validationError) {
      setError(validationError);
      return;
    }

    setRunning(true);
    setLogs([]);

    // 🔥 SORT FLOW (simple linear traversal)
    const visited = new Set();
    const result = [];

    let current = nodes.find((n) => n.data.nodeType === "start");

    while (current) {
      if (visited.has(current.id)) break;

      visited.add(current.id);

      result.push({
        id: current.id,
        label: current.data.label,
        type: current.data.nodeType,
      });

      const nextEdge = edges.find((e) => e.source === current.id);
      if (!nextEdge) break;

      current = nodes.find((n) => n.id === nextEdge.target);
    }

    // 🎬 STEP-BY-STEP EXECUTION
    for (let i = 0; i < result.length; i++) {
      await new Promise((res) => setTimeout(res, 600));

      setLogs((prev) => [
        ...prev,
        `Step ${i + 1}: ${result[i].label}`,
      ]);
    }

    setRunning(false);
  };

  return (
    <div className="h-[140px] bg-[#020617] border-t border-gray-800 text-white flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Simulation</h3>
        </div>

        {/* RUN BUTTON */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={runSimulation}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-sm"
        >
          <Play size={14} />
          Run
        </motion.button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 py-2 text-xs">

        {/* ERROR */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <AlertTriangle size={14} />
            {error}
          </div>
        )}

        {/* LOGS */}
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-green-400 mb-1"
            >
              <CheckCircle size={12} />
              {log}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* RUNNING */}
        {running && (
          <div className="text-blue-400 animate-pulse">
            Running workflow...
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NodeFormPanel({ selectedNode, updateNode }) {
  const [formData, setFormData] = useState({});

  // 🎯 LOAD NODE DATA
  useEffect(() => {
    if (selectedNode) {
      setFormData(selectedNode.data || {});
    }
  }, [selectedNode]);

  // 🎯 HANDLE INPUT CHANGE
  const handleChange = (key, value) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);

    // 🔥 LIVE UPDATE TO CANVAS
    updateNode(selectedNode.id, updated);
  };

  if (!selectedNode) {
    return (
      <div className="w-[300px] h-full bg-[#020617] text-gray-400 flex items-center justify-center border-l border-gray-800">
        Select a node to edit
      </div>
    );
  }

  const type = selectedNode.data?.nodeType;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-[300px] h-full bg-[#020617] text-white border-l border-gray-800 p-4 flex flex-col gap-4 overflow-y-auto"
    >
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold">
          {type?.toUpperCase()} CONFIG
        </h2>
        <p className="text-xs text-gray-400">
          Configure node settings
        </p>
      </div>

      {/* COMMON FIELD */}
      <Input
        label="Title"
        value={formData.label || ""}
        onChange={(v) => handleChange("label", v)}
      />

      {/* 🎯 TYPE BASED FIELDS */}

      {type === "task" && (
        <>
          <Input
            label="Description"
            value={formData.description || ""}
            onChange={(v) => handleChange("description", v)}
          />
          <Input
            label="Assignee"
            value={formData.assignee || ""}
            onChange={(v) => handleChange("assignee", v)}
          />
          <Input
            label="Due Date"
            value={formData.dueDate || ""}
            onChange={(v) => handleChange("dueDate", v)}
          />
        </>
      )}

      {type === "approval" && (
        <>
          <Input
            label="Approver Role"
            value={formData.role || ""}
            onChange={(v) => handleChange("role", v)}
          />
          <Input
            label="Threshold"
            value={formData.threshold || ""}
            onChange={(v) => handleChange("threshold", v)}
          />
        </>
      )}

      {type === "automation" && (
        <>
          <Input
            label="Action"
            value={formData.action || ""}
            onChange={(v) => handleChange("action", v)}
          />
          <Input
            label="Params"
            value={formData.params || ""}
            onChange={(v) => handleChange("params", v)}
          />
        </>
      )}

      {type === "end" && (
        <Input
          label="End Message"
          value={formData.message || ""}
          onChange={(v) => handleChange("message", v)}
        />
      )}

      {/* FOOTER */}
      <div className="text-xs text-gray-500 mt-auto">
        Live updates enabled
      </div>
    </motion.div>
  );
}

/* 🔥 REUSABLE INPUT COMPONENT */
function Input({ label, value, onChange }) {
  return (
    <motion.div
      className="flex flex-col gap-1"
      whileFocus={{ scale: 1.02 }}
    >
      <label className="text-xs text-gray-400">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 
                   text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   transition-all"
      />
    </motion.div>
  );
}
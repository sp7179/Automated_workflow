"use client";

import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";

// ✅ CUSTOM NODE UI
import NodeCard from "./NodeCard";

const nodeTypes = {
  default: NodeCard,
};

let id = 0;
const getId = () => `node_${id++}`;

export default function WorkflowCanvas({
  nodes,
  setNodes,
  edges,
  setEdges,
  setSelectedNode,
}) {
  // 🔗 CONNECT NODES
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: {
              stroke: "#6366f1",
              strokeWidth: 2,
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  // 🖱 SELECT NODE
  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  // ❌ DELETE NODE (KEYBOARD SUPPORT)
  const onNodesDelete = useCallback(
    (deletedNodes) => {
      const deletedIds = deletedNodes.map((n) => n.id);

      // remove edges connected to deleted nodes
      setEdges((eds) =>
        eds.filter(
          (e) =>
            !deletedIds.includes(e.source) &&
            !deletedIds.includes(e.target)
        )
      );
    },
    [setEdges]
  );

  // 🧲 DROP NODE
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = event.currentTarget.getBoundingClientRect();

      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      const newNode = {
        id: getId(),
        type: "default",
        position,
        data: {
          label: `${type.toUpperCase()} NODE`,
          nodeType: type,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // 🧠 ENABLE DROP
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <motion.div
      className="w-full h-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={(changes) =>
          setNodes((nds) => applyNodeChanges(changes, nds))
        }
        onEdgesChange={(changes) =>
          setEdges((eds) => applyEdgeChanges(changes, eds))
        }
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onDrop={onDrop}
        onDragOver={onDragOver}

        // 🔥 NEW ADDITIONS
        onNodesDelete={onNodesDelete}
        deleteKeyCode={["Backspace", "Delete"]}

        fitView
      >
        {/* GRID */}
        <Background gap={20} size={1} color="#334155" />

        {/* CONTROLS */}
        <Controls />

        {/* MINIMAP */}
        <MiniMap
          nodeColor={() => "#6366f1"}
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
      </ReactFlow>
    </motion.div>
  );
}
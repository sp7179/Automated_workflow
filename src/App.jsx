"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// 🔹 COMPONENTS
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import WorkflowCanvas from "./components/canvas/WorkflowCanvas";
import NodeFormPanel from "./components/panels/NodeFormPanel";
import SimulationPanel from "./components/panels/SimulationPanel";
import Footer from "./components/layout/Footer";
import JsonPreviewModal from "./components/panels/JsonPreviewModal";

// 🔹 UTILS
import { serializeWorkflow } from "./utils/serializer";
import { validateWorkflow } from "./utils/validator";

// 🔹 MOCK API
import { simulateWorkflowAPI } from "./data/mockData";

export default function App() {
  // 🔥 GLOBAL STATE
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const [jsonData, setJsonData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [simulationLogs, setSimulationLogs] = useState([]);

  // 🔄 UPDATE NODE (FORM → CANVAS)
  const updateNode = (id, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            }
          : node
      )
    );
  };

  // ▶ RUN SIMULATION
  const handleRun = async () => {
    const validation = validateWorkflow(nodes, edges);

    // 🔴 APPLY NODE ERRORS
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          error: validation.nodeErrors[node.id] || null,
        },
      }))
    );

    if (!validation.valid) {
      setSimulationLogs(validation.errors);
      return;
    }

    const workflow = serializeWorkflow(nodes, edges);

    const result = await simulateWorkflowAPI(workflow);

    setSimulationLogs(
      result.steps.map((s) => `Step ${s.step}: ${s.label}`)
    );
  };

  // 💾 EXPORT JSON
  const handleExport = () => {
    const workflow = serializeWorkflow(nodes, edges);
    setJsonData(workflow);
    setShowModal(true);
  };

  // 🔄 RESET WORKFLOW
  const handleReset = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setSimulationLogs([]);
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-white">

      {/* 🔝 NAVBAR */}
      <Navbar
        onRun={handleRun}
        onExport={handleExport}
        onReset={handleReset}
      />

      {/* 🧱 MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* 📦 SIDEBAR */}
        <Sidebar />

        {/* 🧠 CANVAS */}
        <div className="flex-1">
          <WorkflowCanvas
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            setSelectedNode={setSelectedNode}
          />
        </div>

        {/* ⚙️ NODE FORM PANEL */}
        <NodeFormPanel
          selectedNode={selectedNode}
          updateNode={updateNode}
        />
      </div>

      {/* ▶ SIMULATION PANEL */}
      <SimulationPanel
        nodes={nodes}
        edges={edges}
        logs={simulationLogs}
      />

      {/* 🔻 FOOTER */}
      <Footer />

      {/* 📊 JSON MODAL */}
      {showModal && (
        <JsonPreviewModal
          data={jsonData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
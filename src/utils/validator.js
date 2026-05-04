/**
 * 🔥 WORKFLOW VALIDATOR (PRO LEVEL)
 * Returns structured validation result:
 * - global errors
 * - node-level errors
 * - warnings
 */

export const validateWorkflow = (nodes = [], edges = []) => {
  const errors = [];
  const nodeErrors = {};
  const warnings = [];

  if (!nodes.length) {
    return {
      valid: false,
      errors: ["No nodes present"],
      nodeErrors: {},
      warnings: [],
    };
  }

  // 🔹 START NODE CHECK
  const startNodes = nodes.filter(
    (n) => n.data?.nodeType === "start"
  );

  if (startNodes.length === 0) {
    errors.push("Start node is missing");
  }

  if (startNodes.length > 1) {
    errors.push("Multiple Start nodes detected");
  }

  // 🔹 END NODE CHECK (OPTIONAL BUT GOOD)
  const endNodes = nodes.filter(
    (n) => n.data?.nodeType === "end"
  );

  if (endNodes.length === 0) {
    warnings.push("No End node found");
  }

  // 🔹 CONNECTION CHECK
  if (!edges.length) {
    errors.push("No connections between nodes");
  }

  // 🔹 DISCONNECTED NODES
  nodes.forEach((node) => {
    const hasConnection =
      edges.some((e) => e.source === node.id) ||
      edges.some((e) => e.target === node.id);

    if (!hasConnection) {
      nodeErrors[node.id] = "Disconnected node";
    }
  });

  // 🔹 LOOP DETECTION (BASIC)
  const visited = new Set();

  const detectCycle = (nodeId) => {
    if (visited.has(nodeId)) return true;
    visited.add(nodeId);

    const nextEdges = edges.filter((e) => e.source === nodeId);
    for (let edge of nextEdges) {
      if (detectCycle(edge.target)) return true;
    }

    visited.delete(nodeId);
    return false;
  };

  const start = startNodes[0];
  if (start && detectCycle(start.id)) {
    errors.push("Cycle detected in workflow");
  }

  // 🔹 RETURN STRUCTURED RESULT
  return {
    valid: errors.length === 0,
    errors,
    nodeErrors,
    warnings,
  };
};
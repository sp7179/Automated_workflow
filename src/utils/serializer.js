/**
 * 🔥 WORKFLOW SERIALIZER
 * Converts React Flow graph → structured JSON
 * Used for:
 * - Export
 * - Simulation
 * - Debugging
 */

export const serializeWorkflow = (nodes = [], edges = []) => {
  if (!nodes.length) {
    return {
      meta: { status: "empty" },
      nodes: [],
      edges: [],
      flow: [],
    };
  }

  // 🔹 NODE MAP (fast lookup)
  const nodeMap = new Map();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  // 🔹 BUILD CLEAN NODE DATA
  const serializedNodes = nodes.map((node) => ({
    id: node.id,
    type: node.data?.nodeType || "unknown",
    label: node.data?.label || "",
    config: {
      ...node.data,
    },
  }));

  // 🔹 EDGE DATA
  const serializedEdges = edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
  }));

  // 🔹 FIND START NODE
  const startNode = nodes.find(
    (n) => n.data?.nodeType === "start"
  );

  // 🔹 BUILD EXECUTION FLOW (LINEAR TRAVERSAL)
  const flow = [];
  const visited = new Set();

  let current = startNode;

  while (current && !visited.has(current.id)) {
    visited.add(current.id);

    flow.push({
      id: current.id,
      label: current.data?.label,
      type: current.data?.nodeType,
    });

    const nextEdge = edges.find((e) => e.source === current.id);
    if (!nextEdge) break;

    current = nodeMap.get(nextEdge.target);
  }

  // 🔹 META INFO (VERY IMPORTANT FOR HR)
  const meta = {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    hasStart: !!startNode,
    generatedAt: new Date().toISOString(),
  };

  return {
    meta,
    nodes: serializedNodes,
    edges: serializedEdges,
    flow,
  };
};
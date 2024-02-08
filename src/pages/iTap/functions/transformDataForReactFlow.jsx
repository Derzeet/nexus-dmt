import { MarkerType } from "reactflow";

const transformDataForReactFlow = (responseData) => {
  let idCounter = 10000; // Start an ID counter for new edge-nodes to avoid ID conflicts

  // Transform nodes
  const transformedNodes = responseData.nodes.map((node) => {
    let nodeType = 'person';
    if (node.properties.FIO) {
      nodeType = 'person';
    } else if (node.properties.Type === 'ЮЛ') {
      nodeType = 'company';
    } else if (node.properties.PKA) {
      nodeType = 'address';
    }

    return {
      id: node.id.toString(),
      type: 'quadric',
      data: {...node.properties, type: nodeType},
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
  });

  // Initialize arrays to store the new edge-nodes and connecting edges
  const edgeNodes = [];
  const connectingEdges = [];

  // Transform edges into edge-nodes and connecting edges
  responseData.edges.forEach((edge) => {
    const edgeNodeId = `edge-node-${idCounter++}`; // Unique ID for the edge-node

    // Create an edge-node for each edge
    edgeNodes.push({
      id: edgeNodeId,
      type: 'edgeNode', // This can be a custom node type designed to look like an edge
      data: { ...edge.properties, label: edge.label, type: 'edge' },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    });

    // Create connecting edges: source to edge-node
    connectingEdges.push({
      id: `e-${edge.from}-${edgeNodeId}`,
      source: edge.from.toString(),
      target: edgeNodeId,
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    });

    // Create connecting edges: edge-node to target
    connectingEdges.push({
      id: `e-${edgeNodeId}-${edge.to}`,
      source: edgeNodeId,
      target: edge.to.toString(),
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    });
  });

  // Combine original nodes with edge-nodes
  const combinedNodes = [...transformedNodes, ...edgeNodes];
  // Use the new connecting edges instead of the original edges
  const combinedEdges = [...connectingEdges];

  return { initialNodes: combinedNodes, initialEdges: combinedEdges };
};

export default transformDataForReactFlow;

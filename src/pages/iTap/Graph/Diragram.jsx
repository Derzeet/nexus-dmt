import { useEffect, useCallback } from "react";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'reactflow';

import {nodes as initialNodes, edges as initialEdges} from '../samles/initial-elements'
import CustomNode from "../samles/CustomNode";
import quadricNode from "../components/CustomNodes/quadricNode";

import 'reactflow/dist/style.css';
import '../samles/overview.css'

import assignGridPositions from "../functions/AssignGridPositions";


const nodeTypes = {
    person: quadricNode,
    custom: CustomNode,
  };
  
  const minimapStyle = {
    height: 120,
  };
  
const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
  

function N4JDiagram() {
    const [nodes, setNodes, onNodesChange] = useNodesState(assignGridPositions(initialNodes, 300, 400, 50, 50));
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    // we are using a bit of a shortcut here to adjust the edge type
    // this could also be done with a custom edge for example
    const edgesWithUpdatedTypes = edges.map((edge) => {
        if (edge.sourceHandle) {
        const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
        edge.type = edgeType;
        }

        return edge;
    });

    return (
        <ReactFlow
            nodes={nodes}
            edges={edgesWithUpdatedTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            fitView
            attributionPosition="top-right"
            nodeTypes={nodeTypes}
        >
            <MiniMap style={minimapStyle} zoomable pannable />
            {/* <Controls /> */}
            {/* <Background color="#aaa" gap={16} /> */}
        </ReactFlow>
    );
}

export default N4JDiagram;
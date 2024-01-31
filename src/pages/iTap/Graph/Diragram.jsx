import { useEffect, useCallback, useRef, useState } from "react";
import ReactFlow, {
    addEdge,
    updateEdge,  
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'reactflow';

import {nodes as initialNodes, edges as initialEdges} from '../samles/initial-elements'
import CustomNode from "../samles/CustomNode";
import quadricNode from "../components/CustomNodes/quadricNode";
import companyNode from "../components/CustomNodes/companyNode";

import SetEdgeLabelModal from "../components/EdgeLabelSetterModal/setEdgeLabelModal";


import 'reactflow/dist/style.css';
import '../samles/overview.css'

import assignGridPositions from "../functions/AssignGridPositions";


const nodeTypes = {
    company: companyNode,
    person: quadricNode,
    custom: CustomNode,
  };
  
  const minimapStyle = {
    height: 120,
  };
  
const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
  

function N4JDiagram() {

    const edgeUpdateSuccessful = useRef(true);

    const [nodes, setNodes, onNodesChange] = useNodesState(assignGridPositions(initialNodes, 300, 400, 50, 50));
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
           

    //For connection modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingConnection, setPendingConnection] = useState(null);

    // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onConnect = useCallback((params) => {
        // Open the modal and save the connection params for later use
        setIsModalOpen(true);
        setPendingConnection(params);
    }, []);
    
    const handleModalSubmit = (label) => {
        // Create the edge with the label and add it
        const newEdge = { ...pendingConnection, label,  type: 'smoothstep' };
        setEdges((eds) => addEdge(newEdge, eds));
        
        // Close the modal
        setIsModalOpen(false);
    };


    // we are using a bit of a shortcut here to adjust the edge type
    // this could also be done with a custom edge for example
    const edgesWithUpdatedTypes = edges.map((edge) => {
        if (edge.sourceHandle && !edge.type) {
            const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
            edge.type = edgeType;
        }

        return edge;
    });

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeUpdateSuccessful.current = true;
    }, []);

    return (
        <>
            {isModalOpen && (
                <SetEdgeLabelModal
                    onSubmit={handleModalSubmit}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <ReactFlow
                nodes={nodes}
                edges={edgesWithUpdatedTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
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
        </>
    );
}

export default N4JDiagram;

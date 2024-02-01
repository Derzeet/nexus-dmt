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
import QuadricNode from "../components/CustomNodes/QuadricNode";
import SetEdgeLabelModal from "../components/EdgeLabelSetterModal/setEdgeLabelModal";

import CustomEdge from "../components/CustomEdges/CustomEdge";

import 'reactflow/dist/style.css';
import '../samles/overview.css'

import assignGridPositions from "../functions/AssignGridPositions";
import generateUniqueId from "../functions/createUniqueIdGenerator";

const nodeTypes = {
    quadric: QuadricNode,
    custom: CustomNode,
};

const edgeTypes = {
    quadric: CustomEdge
}

const minimapStyle = {
    height: 120,
};
  
const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
  

function N4JDiagram() {

    const edgeUpdateSuccessful = useRef(true);

    const [nodes, setNodes, onNodesChange] = useNodesState(assignGridPositions(initialNodes, 300, 400, 50, 50));
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [zoomOnScroll, setZoomOnScroll] = useState(true);


    const countEdgesBetweenNodes = (source, target, edgesArray) => {
        return edgesArray.filter((e) => 
        (e.source === source && e.target === target) || (e.source === target && e.target === source)
        ).length;
    };
    
    useEffect(() => {
        // Map through your initial edges to set the correct type
        const edgesWithTypes = initialEdges.map((edge) => {
        const count = countEdgesBetweenNodes(edge.source, edge.target, initialEdges);
    
        // If there's more than one edge between the nodes, use 'quadric', otherwise 'smoothstep'
        const edgeType = count > 1 ? 'quadric' : 'smoothstep';
    
        return {
            ...edge,
            type: edgeType,
            // You can adjust the curvature and style based on the edge type here if needed
            data: { ...edge.data, curvature: edgeType === 'quadric' ? 0.5 : 0 },
        };
        });
    
        setEdges(edgesWithTypes);
    }, []);
    

    //Delete node
    const onDeleteNode = useCallback((nodeId) => {
        setNodes((nds) => nds.filter((n) => n.id !== nodeId));
        setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    }, [setNodes, setEdges]);
    
    //Create Node
    const createNodeAndConnect = (sourceNodeId, newLabel, newColor) => {
        const newNodeId = generateUniqueId(); // Generate a unique ID for the new node
        const newNode = {
            id: newNodeId,
            type: "quadric", // or any custom type you have
            data: { type: 'created', Name: newLabel, color: newColor},
            position: { x: 100, y: 100 } // Set the position as required
        };
    
        const newEdge = {
            id: `e${sourceNodeId}-${newNodeId}`,
            source: sourceNodeId,
            target: newNodeId,
            data: { curvature: 3 + 12 },
            type: "smoothstep", // or any other type
            // additional edge properties as needed
        };
    
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat(newEdge));
    };
    
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
                nodes={nodes.map(node => ({ 
                    ...node, 
                    data: { ...node.data, 
                        onDeleteNode, 
                        createNodeAndConnect,
                        setZoomOnScroll } 
                }))}
                edges={edgesWithUpdatedTypes.map((edge, index) => {
                    const offset = index * 2; // Adjust offset based on the number of edges
                    return {
                      ...edge,
                    //   offset: offset,
                    //   style: { strokeWidth: 1 },
                    //   data: { curvature: 0.9 + offset },
                    };
                  })}
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
                edgeTypes={edgeTypes}
                zoomOnScroll={zoomOnScroll}

                >
                <MiniMap style={minimapStyle} zoomable pannable />
                {/* <Controls /> */}
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </>
    );
}

export default N4JDiagram;
